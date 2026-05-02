'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { createClient } from '@/src/lib/supabase/client'
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js'

type QueueRow = {
   id: string
   ticket_no: number
   name: string | null
   service: string | null
   status: string
   created_at: string
   called_at: string | null
   served_at: string | null
   user_id: string | null
   priority: boolean
}

type TicketInfo = {
   ticket_no: number
   service: string
}

export function useCustomerQueue() {
   const supabase = useMemo(() => createClient(), [])

   const [currentlyServing, setCurrentlyServing] = useState<number | null>(null)
   const [waitingCount, setWaitingCount]         = useState(0)
   const [userTicket, setUserTicket]             = useState<TicketInfo | null>(null)
   const [peopleAhead, setPeopleAhead]           = useState<number | null>(null)
   const [estWaitSecs, setEstWaitSecs]           = useState<number | null>(null) // ← renamed
   const [confirmed, setConfirmed]               = useState(false)
   const [loading, setLoading]                   = useState(true)
   const [queues, setQueues]                     = useState<QueueRow[]>([])

   /* ─────────────────────────────────────────────
      REFRESH
   ───────────────────────────────────────────── */
   const refreshQueue = useCallback(async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // GETS USER TICKET
      const { data: existing } = await supabase
         .from('queue')
         .select('ticket_no, service')
         .eq('user_id', user.id)
         .in('status', ['waiting', 'serving'])
         .maybeSingle()

      // IF NOT
      if (!existing) {
         setUserTicket(null)
         setQueues([])
         setWaitingCount(0)
         setCurrentlyServing(null)
         setPeopleAhead(null)
         setEstWaitSecs(null)
         return
      }

      setUserTicket({
         ticket_no: existing.ticket_no,
         service: existing.service ?? ''
      })

      /* 1. USER POSITION */
      const { count } = await supabase
         .from('queue')
         .select('*', { count: 'exact', head: true })
         .eq('service', existing.service)
         .eq('status', 'waiting')
         .lt('ticket_no', existing.ticket_no)

      const ahead = count ?? 0
      
      /* 3. CURRENTLY SERVING */
      const { data: servingRow } = await supabase
         .from('queue')
         .select('ticket_no')
         .eq('service', existing.service)
         .eq('status', 'serving')
         .maybeSingle()

      setCurrentlyServing(servingRow?.ticket_no ?? null)

      // Add 1 if someone is being served
      const totalAhead = ahead + (servingRow ? 1 : 0)
      setPeopleAhead(totalAhead)

      // !ESTIMATES
      const { data: estimate } = await supabase
         .from('queue_estimates')
         .select('estimated_wait_seconds, waiting_count, avg_service_seconds')
         .eq('service', existing.service)
         .single()

      if (estimate) {
         // If user is first in line, wait time is 0
         if (totalAhead === 0) {
            setEstWaitSecs(0)
         } else {
            // Calculate wait time based on people ahead × average service time
            const avgServiceTime = estimate.avg_service_seconds ?? 0
            const calculatedWait = Math.round(totalAhead * avgServiceTime)
            setEstWaitSecs(calculatedWait)
         }
         setWaitingCount(estimate.waiting_count ?? 0)
      }
      
      // !FULL QUEUE LIST
      const { data: queueState } = await supabase
         .from('queue')
         .select('*')
         .eq('service', existing.service)
         .in('status', ['waiting', 'serving'])
         .order('ticket_no', { ascending: true })

      if (queueState) setQueues(queueState)

   }, [supabase])

   // !INITIAL LOAD
   useEffect(() => {
      const init = async () => {
         try { 
            await refreshQueue() 
         }
         finally { 
            setLoading(false) 
         }
      }
      void init()
   }, [refreshQueue])

   // !REALTIME
   useEffect(() => {
      const channel = supabase
         .channel('queue-realtime')
         .on(
         'postgres_changes',
         { event: '*', schema: 'public', table: 'queue' },
         async (payload: RealtimePostgresChangesPayload<QueueRow>) => {
            const newRow = payload.new as QueueRow | null
            const oldRow = payload.old as QueueRow | null
            const target = newRow ?? oldRow
            if (!target) return

            await refreshQueue()

            setQueues((prev) => {
               if (payload.eventType === 'DELETE') {
               return prev.filter(t => t.id !== target.id)
               }
               const index = prev.findIndex(t => t.id === target.id)
               if (index === -1) return [...prev, target]
               const copy = [...prev]
               copy[index] = { ...copy[index], ...target }
               return copy
            })
         }
         )
         .subscribe()

      return () => { void supabase.removeChannel(channel) }
   }, [supabase, refreshQueue])

   // !REMOVE TICKET
   const removeTicket = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase
         .from('queue')
         .delete()
         .eq('user_id', user.id)
         .in('status', ['waiting', 'serving'])

      if (error) { console.error(error.message); return }

      setUserTicket(null)
      setQueues([])
      setWaitingCount(0)
      setCurrentlyServing(null)
      setPeopleAhead(null)
      setEstWaitSecs(null)
   }

   // !DERIVED
   const queueStatus =
      waitingCount <= 3 ? 'Moving Fast'
      : waitingCount <= 8 ? 'Moderate'
      : 'Busy'

   return {
      queues,
      userTicket,
      peopleAhead,
      estWaitSecs,      
      currentlyServing,
      queueStatus,
      confirmed,
      setConfirmed,
      loading,
      removeTicket,
   }
}