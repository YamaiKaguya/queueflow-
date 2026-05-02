import { CheckCircle2, Clock, LogOut } from 'lucide-react'

type Props = {
   ticketNo: number
   service: string
   currentlyServing: number | null
   confirmed: boolean
   onConfirm: () => void
   onLeave: () => void
   loading?: boolean
}

export function TicketCard({ ticketNo, service, currentlyServing, confirmed, onConfirm, onLeave, loading }: Props) {
   const prefix = service.charAt(0).toUpperCase()
   const formatted = (n: number) => `${prefix} – ${String(n).padStart(3, '0')}`
   const progressPct = currentlyServing
      ? Math.min(100, Math.round((currentlyServing / ticketNo) * 100))
      : 0

   return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">

         {/* !HEADER */}
         <div className="bg-blue-500 px-9 pt-8 pb-12 relative">
               <div className="flex items-center justify-between mb-6">
                  <p className="text-xs font-bold text-blue-100 tracking-widest uppercase">
                     Your Queue Number
                  </p>
                  <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
                     ticketNo !== 0
                           ? 'bg-green-400/20 text-green-200'
                           : 'bg-red-400/20 text-red-200'
                  }`}>
                     <span className={`w-1.5 h-1.5 rounded-full ${ticketNo !== 0 ? 'bg-green-400' : 'bg-red-400'}`} />
                     {ticketNo !== 0 ? 'Active' : 'Inactive'}
                  </span>
               </div>

               {/* TICKET NUMBER */}
               <div className="flex items-end justify-between">
                  {loading ? (
                     <div className="h-16 w-56 bg-white/20 rounded-2xl animate-pulse" />
                  ) : (
                     <p className="text-6xl font-extrabold text-white -tracking-[1px]">
                           {formatted(ticketNo)}
                     </p>
                  )}
               </div>
         </div>

         {/* PROGRESS — overlaps header */}
         <div className="mx-8 my-8 bg-white rounded-2xl">
               <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                     <Clock size={13} />
                     Estimated Arrival
                  </p>
                  {loading ? (
                     <div className="h-3 w-10 bg-gray-200 rounded animate-pulse" />
                  ) : (
                     <p className="text-xs font-bold text-blue-500">{progressPct}%</p>
                  )}
               </div>
               <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  {loading ? (
                     <div className="h-full w-1/3 bg-gray-200 rounded-full animate-pulse" />
                  ) : (
                     <div
                           className="h-full bg-blue-500 rounded-full transition-all duration-700 ease-in-out"
                           style={{ width: `${progressPct}%` }}
                     />
                  )}
               </div>
         </div>

         {/* CONFIRM ROW */}
         <div className="px-9 py-7 flex justify-between items-center gap-4">
            <div className="flex items-start gap-3">
               <div className={`mt-0.5 shrink-0 ${confirmed ? 'text-green-500' : 'text-gray-300'}`}>
                  <CheckCircle2 size={20} />
               </div>
               <div>
                  <p className="text-sm font-bold text-slate-800">
                     {confirmed ? 'Arrival Confirmed' : 'Confirm Your Arrival'}
                  </p>
                  {loading ? (
                     <div className="h-3 w-48 bg-gray-200 rounded animate-pulse mt-1.5" />
                  ) : (
                     <p className="text-xs text-slate-400 mt-0.5">
                        {confirmed
                           ? 'You are confirmed. Please wait to be called.'
                           : ticketNo === 0
                           ? 'No active ticket. Join a queue to get started.'
                           : 'Tap confirm when you are within the facility.'}
                     </p>
                  )}
               </div>
            </div>

            <div className="flex gap-2 flex-shrink-0">
               {!confirmed && (
                  <button
                     onClick={onConfirm}
                     disabled={loading || ticketNo === 0}
                     className="text-sm font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-2.5 px-5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                     Confirm
                  </button>
               )}
               <button
                  onClick={onLeave}
                  disabled={loading || ticketNo === 0}
                  className="flex items-center gap-1.5 text-sm font-medium text-red-400 hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer px-2"
               >
                  <LogOut size={15} />
                  Leave
               </button>
            </div>
         </div>
      </div>
   )
}