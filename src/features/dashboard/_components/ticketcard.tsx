type Props = {
   ticketNo: number
   service: string
   currentlyServing: number | null
   position: number
   confirmed: boolean
   onConfirm: () => void
   onLeave: () => void
}

export function TicketCard({
   ticketNo,
   service,
   currentlyServing,
   position,
   confirmed,
   onConfirm,
   onLeave,
   }: Props) {
   const prefix = service.charAt(0).toUpperCase()
   const formatted = (n: number) => `${prefix} – ${String(n).padStart(3, '0')}`
   const progressPct = currentlyServing
      ? Math.min(100, Math.round((currentlyServing / ticketNo) * 100))
      : 0

   return (
      <div className="bg-white rounded-[20px] p-9 shadow-sm">
         {/* Ticket numbers */}
         <div className="flex gap-8 items-center">
         <div className="flex-1">
            <p className="text-[13px] font-bold text-slate-400 tracking-wide mb-2">
               YOUR QUEUE NUMBER:
            </p>
            <p className="text-[56px] font-extrabold text-blue-500 -tracking-[1px] m-0">
               {formatted(ticketNo)}
            </p>
         </div>

         <div className="w-px h-20 bg-gray-200" />

         <div className="flex-1">
            <p className="text-[13px] font-bold text-slate-400 tracking-wide mb-2">
               CURRENTLY SERVING:
            </p>
            <p className="text-[56px] font-extrabold text-blue-500 -tracking-[1px] m-0">
               {currentlyServing ? formatted(currentlyServing) : '—'}
            </p>
         </div>
         </div>

         {/* Progress bar */}
         <div className="mt-7">
         <p className="text-[13px] font-semibold text-slate-700 mb-2">
            Estimated Arrival
         </p>
         <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
               className="h-full bg-blue-500 rounded-full transition-all duration-600 ease-in-out"
               style={{ width: `${progressPct}%` }}
            />
         </div>
         </div>

         {/* Confirm row */}
         <div className="mt-7 pt-6 border-t border-gray-100 flex justify-between items-center gap-4">
         <div>
            <p className="text-[15px] font-bold text-slate-900 mb-1">
               {confirmed ? '✓ Arrival Confirmed' : 'Next Step: Confirm Arrival'}
            </p>
            <p className="text-[13px] text-slate-400">
               {confirmed
               ? 'You are confirmed. Please wait to be called.'
               : 'Please tap the button when you are within facility.'}
            </p>
         </div>

         <div className="flex gap-3 flex-shrink-0">
            {!confirmed && (
               <button
               onClick={onConfirm}
               className="bg-blue-500 text-white rounded-[10px] py-2.5 px-5 text-[14px] font-semibold whitespace-nowrap"
               >
               Confirm Arrival
               </button>
            )}
            <button
               onClick={onLeave}
               className="bg-none text-blue-500 border-none text-[14px] font-medium whitespace-nowrap"
            >
               {confirmed ? 'Leave Queue' : 'Step Back'}
            </button>
         </div>
         </div>
      </div>
   )
}