"use client"
import {
   StatsRow,
   TicketCard,
   CurrentlyServingList,
} from "./_components/Index"
import { useCustomerQueue } from "./_hooks/useCustomQueue"

export default function DashBoard() {
   const {
      queues,
      userTicket,
      peopleAhead,
      estWaitSecs,
      currentlyServing,
      queueStatus,
      confirmed,
      setConfirmed,
      loading,
      removeTicket
   } = useCustomerQueue()

   const ticket = userTicket ?? null

   return (
      <div className="bg-[var(--primary-background)] p-15">
         <main className="w-[90vw] mx-auto">
         <div className="grid gap-10">
            <div className="flex flex-col gap-10">
               <StatsRow
                  peopleAhead={peopleAhead}
                  estWaitSecs={estWaitSecs}
                  queueStatus={queueStatus}
                  currentlyServing={currentlyServing}
                  userTicketNo={ticket?.ticket_no ?? null}
                  loading={loading}
               />
               <TicketCard
                  ticketNo={ticket?.ticket_no ?? 0}
                  service={ticket?.service ?? "N/A"}
                  currentlyServing={currentlyServing}
                  confirmed={confirmed}
                  onConfirm={() => setConfirmed(true)}
                  onLeave={removeTicket}
                  loading={loading}
               />
               <CurrentlyServingList
                  allTickets={queues}
                  loading={loading}
               />
            </div>
         </div>
         </main>
      </div>
   )
}