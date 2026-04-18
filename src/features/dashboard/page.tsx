"use client"

import {
   StatsRow,
   TicketCard,
   LatestNews,
   FacilityHours,
   HelpCard,
   CurrentlyServingList,
   StatsRowSkeleton,
   TicketCardSkeleton,
   CurrentlyServingListSkeleton,
} from "./_components/Index";

import { useCustomerQueue } from './_hooks/useCustomQueue'

export default function DashBoard() {
   const {queues, userTicket, position, currentlyServing, queueStatus, confirmed, setConfirmed, loading, removeTicket } = useCustomerQueue()

   const ticket = userTicket! 

   return (
      <div className="bg-[var(--primary-background)] p-15">
         <main className="w-[90vw] mx-auto">

            <div className="grid grid-cols-[1fr_340px] gap-10">
               <div className='flex flex-col gap-10'>
                  {loading ? <StatsRowSkeleton /> : (
                     <StatsRow
                        peopleAhead={Math.max(0, position - 1)}
                        estWaitMins={position === 1 ? 0 : position * 3}
                        queueStatus={queueStatus}
                     />
                  )}
                  {loading ? <TicketCardSkeleton /> : (
                     <TicketCard
                        ticketNo={userTicket?.ticket_no ?? 0}
                        service={ticket?.service ?? "N/A"}
                        currentlyServing={currentlyServing}
                        confirmed={confirmed}
                        onConfirm={() => setConfirmed(true)}
                        onLeave={removeTicket}
                     />
                  )}
                  {loading ? <CurrentlyServingListSkeleton /> : (
                     <CurrentlyServingList allTickets={queues} />
                  )}
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