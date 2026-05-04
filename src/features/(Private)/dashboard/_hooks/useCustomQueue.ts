'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { createClient } from '@/src/lib/supabase/client'
import { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js'

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
   const [estWaitSecs, setEstWaitSecs]           = useState<number | null>(null) 
   const [confirmed, setConfirmed]               = useState(false)
   const [loading, setLoading]                   = useState(true)
   const [queues, setQueues]                     = useState<QueueRow[]>([])

   // !REFRESH FUNCTION
   const refreshQueue = useCallback(async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: existing } = await supabase
         .from('queue')
         .select('ticket_no, service')
         .eq('user_id', user.id)
         .in('status', ['waiting', 'serving'])
         .maybeSingle()

      if (!existing) {
         setUserTicket(null)
         setQueues([])
         setWaitingCount(0)
         setCurrentlyServing(null)
         setPeopleAhead(null)
         setEstWaitSecs(null)
         return
      }

      // TICKET
      setUserTicket({
         ticket_no: existing.ticket_no,
         service: existing.service
      })

      /* POSITION */
      const { count } = await supabase
         .from('queue')
         .select('*', { count: 'exact', head: true })
         .eq('service', existing.service)
         .eq('status', 'waiting')
         .lt('ticket_no', existing.ticket_no)

      /* CURRENTLY SERVING */
      const { data: servingRow } = await supabase
         .from('queue')
         .select('ticket_no')
         .eq('service', existing.service)
         .eq('status', 'serving')
         .maybeSingle()

      setCurrentlyServing(servingRow?.ticket_no ?? null)

      const totalAhead = count + (servingRow ? 1 : 0)
      setPeopleAhead(totalAhead)

      // ESTIMATES
      const { data: estimate } = await supabase
         .from('queue_estimates')
         .select('estimated_wait_seconds, waiting_count, avg_service_seconds')
         .eq('service', existing.service)
         .single()

      if (estimate) {
         // 0 IF FIRST IN LINE
         if (totalAhead === 0) {
            setEstWaitSecs(0)
         } else {
            // *PEOPLE AHEAD × AVERAGE SERVICE TIME
            const avgServiceTime = estimate.avg_service_seconds ?? 0
            const calculatedWait = Math.round(totalAhead * avgServiceTime)
            setEstWaitSecs(calculatedWait)
         }
         setWaitingCount(estimate.waiting_count ?? 0)
      }
      
      // FULL QUEUE LIST
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

   // !CHANNEL
   useEffect(() => {
      let channel: RealtimeChannel | null = null
      let isMounted = true

      const setupRealtime = async () => {
         const { data: { user } } = await supabase.auth.getUser()
         if (!user || !isMounted) return

         channel = supabase
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
               }
            )
            .subscribe()
      }

      void setupRealtime()

      return () => {
         isMounted = false
         if (channel) supabase.removeChannel(channel)
      }
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

   // !STATUS
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