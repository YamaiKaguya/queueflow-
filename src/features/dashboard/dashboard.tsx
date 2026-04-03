'use client'

import {
LiveBadge,
StatsRow,
TicketCard,
NewsFeed,
FacilityHours,
HelpCard,
} from '@/src/features/dashboard/_components/_barrel/barrel'
import { QueueSkeleton } from './_components/queueskeleton'
import { NoTicket } from './_components/noticket'
import { useCustomerQueue } from './_hooks/usecustomerqueue'

export default function DashBoard() {
const {
   ticket, setTicket,
   position,
   currentlyServing,
   queueStatus,
   confirmed, setConfirmed,
   loading,
} = useCustomerQueue()

if (loading) return <QueueSkeleton />
if (!ticket) return <NoTicket />

   return (
      <div className="bg-[var(--primary-background)] p-20">
         <main className="w-[90vw] mx-auto">
            <header className="flex justify-between items-start mb-12">
               <div>
                  <h1 className="text-5xl font-bold">Virtual Queue</h1>
                  <p className="text-base mt-4">Reserve and track your spot in line, hassle-free.</p>
               </div>
               <LiveBadge />
            </header>

            <StatsRow
               peopleAhead={Math.max(0, position - 1)}
               estWaitMins={position * 3}
               queueStatus={queueStatus}
            />

            <div className="grid grid-cols-[1fr_340px] gap-10">
               <TicketCard
                  ticketNo={ticket.ticket_no}
                  service={ticket.service}
                  currentlyServing={currentlyServing}
                  position={position}
                  confirmed={confirmed}
                  onConfirm={() => setConfirmed(true)}
                  onLeave={() => { setTicket(null); setConfirmed(false) }}
               />
               <div className="flex flex-col gap-10">
                  <NewsFeed />
                  <FacilityHours />
                  <HelpCard />
               </div>
            </div>
         </main>
      </div>
   )
}