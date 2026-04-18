import { useState, useMemo, useEffect } from 'react'
import { createClient } from '@/src/lib/supabase/client'
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

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
   ticket_no: number; 
   service: string 
}

export function useCustomerQueue() {
   const router = useRouter()
   const supabase = useMemo(() => createClient(), [])

   const [currentlyServing, setCurrentlyServing] = useState<number | null>(null)
   const [waitingCount, setWaitingCount]         = useState(0)
   const [userTicket, setUserTicket]             = useState<TicketInfo | null>(null)
   const [position, setPosition]                 = useState(0)
   const [confirmed, setConfirmed]               = useState(false)
   const [loading, setLoading]                   = useState(true)
   const [queues, setQueues]                     = useState<QueueRow[]>([])

   // !LEAVE QUEUE
   const removeTicket = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) return

      const { error } = await supabase
         .from('queue')
         .delete()
         .eq('user_id', user.id)
         .in('status', ['waiting', 'serving'])

      if (error) {
         console.error('Failed to delete ticket:', error.message)
         return
      }

      setUserTicket(null)
      setPosition(0)
      setQueues(prev =>
         prev.filter(t => t.user_id !== user.id)
      )
   }

   useEffect(() => {
      const fetchUserAndQueue = async () => {
         try {
            // FETCH USER AND QUEUE STATE IN PARALLEL
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

            // SERVING AND WAITING COUNT
            if (queueState) {
               const serving = queueState?.find((r: QueueRow) => r.status === 'serving')

               if (serving) setCurrentlyServing(serving.ticket_no)

               setWaitingCount(
                  queueState?.filter((r: QueueRow) => r.status === 'waiting').length ?? 0
               )
               
            }

            // CURRENT USER TICKET
            const { data: existing } = await supabase
               .from('queue')
               .select('ticket_no, service, status')
               .eq('user_id', user.id)
               .in('status', ['waiting', 'serving'])
               .single()

            // IF HAS ACTIVE TICKET, SET IT AND CALCULATE POSITION
            if (existing) {
               setUserTicket({ ticket_no: existing.ticket_no, service: existing.service ?? '' })

               const { count } = await supabase
               .from('queue')
               .select('*', { count: 'exact', head: true })
               .eq('status', 'waiting')
               .lt('ticket_no', existing.ticket_no)

               setPosition((count ?? 0) + 1)

               // GET ALL SERVING AND WAITING TICKETS THAT IS EQUAL TO CURRENT USER SERVICE
               const { data: allTickets } = await supabase
               .from('queue')
               .select('*')
               .eq('service', existing.service)
               .in('status', ['waiting', 'serving'])
               .order('ticket_no', { ascending: true })

               if (allTickets) {
                  setQueues(allTickets)
               }
            } 
         } finally {
            setLoading(false)
         }
      }

      void fetchUserAndQueue()
   }, [supabase, router])

   // OBSERVER
   useEffect(() => {
      if (!userTicket) return

      const channel = supabase
         .channel('customer-tracker')
         .on(
         'postgres_changes',
         { 
            event: '*', 
            schema: 'public', 
            table: 'queue', 
            filter: `service=eq.${userTicket.service}` 
         },
         (payload: RealtimePostgresChangesPayload<QueueRow>) => {
            if (!payload.new || !('status' in payload.new)) return

            const updated = payload.new  

            setQueues((prev) => {
               const index = prev.findIndex(t => t.id === updated.id)

               if (!['waiting', 'serving'].includes(updated.status)) {
                  return prev.filter(t => t.id !== updated.id)
               }

               if (index === -1) return [...prev, updated]

               const copy = [...prev]
               copy[index] = { ...copy[index], ...updated }
               return copy
            })

            if (updated.status === 'serving') {
               setCurrentlyServing(updated.ticket_no)
               if (updated.ticket_no < userTicket.ticket_no) {
                  setPosition((prev) => Math.max(0, prev - 1))
               }
         }
            // !UPDATE WAIT COUNT
            if (updated.status === 'waiting') {
               setWaitingCount((prev) => prev + 1)
            }
         }
         )
         .subscribe()
      return () => { void supabase.removeChannel(channel) }
   }, [supabase, userTicket])

   const queueStatus = waitingCount <= 3 ? 'Moving Fast' : waitingCount <= 8 ? 'Moderate' : 'Busy'

   return {
      queues,
      userTicket,
      position,
      currentlyServing,
      queueStatus,
      confirmed, setConfirmed,
      loading,
      removeTicket
   }
}