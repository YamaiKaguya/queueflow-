"use client"

import { StatsRow }  from './_components/StatsRow'
import { TicketCard }  from './_components/TicketCard'
import { LatestNews }  from './_components/LatestNews'
import { FacilityHours }  from './_components/FacilityHours'
import { HelpCard } from './_components/HelpCard'
import { CurrentlyServingList } from './_components/QueueList'


import { QueueSkeleton } from './_components/_subcomponents/QueueSkeleton'
import { useCustomerQueue } from './_hooks/useCustomQueue'


import { useRouter } from 'next/navigation'
   
export default function DashBoard() {
   const { ticket, setTicket, position, currentlyServing, queueStatus, confirmed, setConfirmed, loading } = useCustomerQueue()

   const router = useRouter()

   if (loading) return <QueueSkeleton />

   if (!ticket)    return (
      <div className="min-h-[calc(100vh-74px)]  bg-[var(--primary-background)] flex items-center justify-center p-6">
         <div className="flex flex-col items-center justify-center gap-6 text-center max-w-md w-full">
         <p className="text-xl text-gray-500">You have no active ticket.</p>
         <button
            onClick={() => router.push('/joinqueue')}
            className="px-6 py-3 bg-[var(--primary-color-dark)] text-white rounded-lg font-medium hover:opacity-90 transition"
         >
            Join the Queue
         </button>
         </div>
      </div>
   )

   return (
      <div className="bg-[var(--primary-background)] p-15">
         <main className="w-[90vw] mx-auto">

            <div className="grid grid-cols-[1fr_340px] gap-10">
               <div className='flex flex-col gap-10'>
                  <StatsRow
                     peopleAhead={Math.max(0, position - 1)}
                     estWaitMins={position * 3}
                     queueStatus={queueStatus}
                  />
                  <TicketCard
                     ticketNo={ticket.ticket_no}
                     service={ticket.service}
                     currentlyServing={currentlyServing}
                     position={position}
                     confirmed={confirmed}
                     onConfirm={() => setConfirmed(true)}
                     onLeave={() => {
                        setTicket(null)
                        setConfirmed(false)
                     }}
                  />
                  <CurrentlyServingList/>
               </div>

               <div className="flex flex-col gap-10">
                  <LatestNews />
                  <FacilityHours />
                  <HelpCard />
               </div>
            </div>
         </main>
      </div>
   )
}