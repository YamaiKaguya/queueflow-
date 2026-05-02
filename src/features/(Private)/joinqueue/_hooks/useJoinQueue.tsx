'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/src/lib/supabase/client'

type QueueTicket = { 
   ticket_no: number
   service: string
   position: number 
}

export function useJoinQueue() {
   const supabase = createClient()

   const [service, setService]   = useState('')
   const [ticket, setTicket]     = useState<QueueTicket | null>(null)
   const [loading, setLoading]   = useState(false)
   const [error, setError]       = useState<string | null>(null)
   const [priority, setPriority] = useState(false)
   const [name, setName]         = useState('')
   const [email, setEmail]       = useState('')
   const [type, setType]       = useState('')

   // !WATCHER
   useEffect(() => {
      if (!ticket) return
      const channel = supabase
         .channel('user-queue-live')
         .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'queue' },
            async () => {
               const { count } = await supabase
                  .from('queue')
                  .select('*', { count: 'exact', head: true })
                  .in('status', ['waiting', 'serving']) 
                  .eq('service', ticket.service)
                  .lt('ticket_no', ticket.ticket_no)

               setTicket(prev =>
                  prev
                     ? { ...prev, position: (count ?? 0) + 1 }
                     : prev
               )
            }
         )
         .subscribe()

      return () => {
         supabase.removeChannel(channel)
      }
   }, [ticket, supabase])

   const joinQueue = async () => {
      setLoading(true)
      setError(null)

      try {
         const { data: { user } } = await supabase.auth.getUser()
         if (!user) throw new Error('User not authenticated')

         // !ACTIVE TICKET
         const { data: existingTicket, error: ticketError } = await supabase
            .from('queue')
            .select('id')
            .eq('user_id', user.id)
            .in('status', ['waiting','serving'])
            .limit(1)
            .maybeSingle()

         if (ticketError) throw ticketError

         if (existingTicket) {
            setError('You already have an active ticket.')
            return
         }

         // !INSERT QUEUE
         const { data, error: insertError } = await supabase
            .from('queue')
            .insert({
               name,
               service,
               status: 'waiting',
               user_id: user.id,
               priority,
               email,
               type: 'Online'
            })
            .select('ticket_no, service')
            .single()

         if (insertError) throw insertError

         // !INSERT NOTIFICATION
         const { error: notifError } = await supabase
            .from('notifications')
            .insert({
               user_id: user.id,
               message: `You joined the ${data.service} queue.`,
            })

         if (notifError) {
            console.error('Notification failed:', notifError)
         }

         // !GET POSITION
         const { count, error: countError } = await supabase
            .from('queue')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'waiting')
            .eq('service', data.service)
            .lt('ticket_no', data.ticket_no)

         if (countError) throw countError

         // !SELECT TICKET
         setTicket({
            ticket_no: data.ticket_no,
            service: data.service,
            position: (count ?? 0) + 1,
         })

      } catch (err) {
         console.error(err)
         setError('Something went wrong. Please try again.')
      } finally {
         setLoading(false)
      }
   }

   return { 
      ticket, 
      loading, 
      error, 
      service, setService, 
      priority, setPriority, 
      type, setType,
      name, setName, 
      email, setEmail, 
      joinQueue
   }
}