import { useState, useMemo, useEffect } from 'react'
import { createClient } from '@/src/lib/supabase/client'
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

type QueueRow = {
id: string
ticket_no: number
name: string | null
user_id: string | null
service: string | null
status: string
created_at: string
called_at: string | null
served_at: string | null
}

type TicketInfo = { ticket_no: number; service: string }

export function useCustomerQueue() {
const router = useRouter()
const supabase = useMemo(() => createClient(), [])

const [currentlyServing, setCurrentlyServing] = useState<number | null>(null)
const [waitingCount, setWaitingCount]         = useState(0)
const [ticket, setTicket]                     = useState<TicketInfo | null>(null)
const [position, setPosition]                 = useState(0)
const [confirmed, setConfirmed]               = useState(false)
const [loading, setLoading]                   = useState(true)

useEffect(() => {
   const fetchUserAndQueue = async () => {
      try {
      const [
         { data: { user } },
         { data: queueState }
      ] = await Promise.all([
         supabase.auth.getUser(),
         supabase
            .from('queue')
            .select('ticket_no, status')
            .in('status', ['serving', 'waiting'])
            .order('ticket_no', { ascending: true }),
      ])

      if (queueState) {
         const serving = queueState.find((r) => r.status === 'serving')
         if (serving) setCurrentlyServing(serving.ticket_no)
         setWaitingCount(queueState.filter((r) => r.status === 'waiting').length)
      }

      const { data: existing } = await supabase
         .from('queue')
         .select('ticket_no, service, status')
         .eq('user_id', user.id)
         .in('status', ['waiting', 'serving'])
         .single()

      if (existing) {
         setTicket({ ticket_no: existing.ticket_no, service: existing.service ?? '' })
         const { count } = await supabase
            .from('queue')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'waiting')
            .lt('ticket_no', existing.ticket_no)
         setPosition((count ?? 0) + 1)
      }
      } finally {
      setLoading(false)
      }
   }

   void fetchUserAndQueue()
}, [supabase, router])

useEffect(() => {
   if (!ticket) return
   const channel = supabase
      .channel('customer-tracker')
      .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'queue' },
      (payload: RealtimePostgresChangesPayload<QueueRow>) => {
         if (!payload.new || !('status' in payload.new)) return
         const updated = payload.new
         if (updated.status === 'serving') {
            setCurrentlyServing(updated.ticket_no)
            if (updated.ticket_no < ticket.ticket_no) {
            setPosition((prev) => Math.max(0, prev - 1))
            }
         }
         if (updated.status === 'waiting') {
            setWaitingCount((prev) => prev + 1)
         }
      }
      )
      .subscribe()
   return () => { void supabase.removeChannel(channel) }
}, [supabase, ticket])

const queueStatus = waitingCount <= 3 ? 'Moving Fast' : waitingCount <= 8 ? 'Moderate' : 'Busy'

   return {
      ticket, setTicket,
      position,
      currentlyServing,
      queueStatus,
      confirmed, setConfirmed,
      loading,
   }
}