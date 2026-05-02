'use client'

import { useState } from 'react'
import {
   ChevronLeft,
   ChevronRight,
   Accessibility,
   Users,
} from "lucide-react"

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

type Props = {
   allTickets: QueueRow[]
   loading?: boolean
}


function SkeletonRow() {
   return (
      <div className="flex items-center gap-4 py-4 px-5 rounded-2xl border border-gray-100 animate-pulse">
         <div className="w-10 h-10 bg-gray-200 rounded-xl shrink-0" />
         <div className="flex-1 space-y-2">
            <div className="h-3.5 w-32 bg-gray-200 rounded" />
            <div className="h-3 w-20 bg-gray-100 rounded" />
         </div>
         <div className="h-6 w-16 bg-gray-200 rounded-full" />
      </div>
   )
}

/* ── Serving Row (NO LOADER ICON) ───────── */

function ServingRow({ ticket }: { ticket: QueueRow }) {
   const prefix = ticket.service?.charAt(0).toUpperCase() ?? '?'
   const formatted = `${prefix} – ${String(ticket.ticket_no).padStart(3, '0')}`

   return (
      <div className="flex items-center gap-4 py-4 px-5 rounded-2xl bg-blue-50 border border-blue-200">

         <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-blue-700 truncate">
               {formatted}
            </p>
            <p className="text-xs text-blue-400 mt-0.5 truncate">
               {ticket.name ? ticket.name.toUpperCase() : 'Anonymous'}
            </p>
         </div>

         <div className="flex items-center gap-2 shrink-0">
            {ticket.priority && (
               <span className="flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full">
                  <Accessibility size={13} />
                  Priority
               </span>
            )}
            <span className="text-xs font-semibold text-white bg-blue-500 px-2.5 py-1 rounded-full">
               Now Serving
            </span>
         </div>
      </div>
   )
}

/* ── Waiting Row ────────────────────────── */

function WaitingRow({ ticket, position }: { ticket: QueueRow; position: number }) {
   const prefix = ticket.service?.charAt(0).toUpperCase() ?? '?'
   const formatted = `${prefix} – ${String(ticket.ticket_no).padStart(3, '0')}`

   return (
      <div className="flex items-center gap-4 py-4 px-5 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-colors">

         <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-800 truncate">
               {formatted}
            </p>
            <p className="text-xs text-gray-400 mt-0.5 truncate">
               {ticket.name ? ticket.name.toUpperCase() : 'Anonymous'}
            </p>
         </div>

         <div className="flex items-center gap-2 shrink-0">
            {ticket.priority && (
               <span className="flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                  <Accessibility size={13} />
                  Priority
               </span>
            )}
            <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-full">
               Waiting
            </span>
         </div>
      </div>
   )
}

/* ── Main Component ─────────────────────── */

export function CurrentlyServingList({ allTickets, loading }: Props) {
   const [page, setPage] = useState(0)
   const PAGE_SIZE = 5

   const serving = allTickets.filter((t) => t.status === 'serving')
   const waiting = allTickets.filter((t) => t.status === 'waiting')

   const start = page * PAGE_SIZE
   const end = start + PAGE_SIZE
   const paginatedWaiting = waiting.slice(start, end)

   const hasNext = end < waiting.length
   const hasPrev = page > 0
   const isEmpty = serving.length === 0 && waiting.length === 0

   return (
      <div className="bg-white rounded-lg p-8 shadow-sm flex flex-col gap-6">

         {/* HEADER */}
         <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">
               <Users size={26} className="text-blue-500" />

               <div>
                  <h2 className="text-lg font-bold text-slate-800">
                     Queue List
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                     {isEmpty
                        ? 'No active queues'
                        : `${serving.length} serving · ${waiting.length} waiting`}
                  </p>
               </div>
            </div>

            <div className="flex items-center gap-1.5">
               <span className="w-2 h-2 rounded-full bg-green-500" />
               <span className="text-xs text-gray-500 font-medium">Live</span>
            </div>

         </div>

         {/* BODY */}
         {loading ? (
            <div className="flex flex-col gap-2">
               {[...Array(5)].map((_, i) => (
                  <SkeletonRow key={i} />
               ))}
            </div>
         ) : isEmpty ? (
            <div className="flex flex-col items-center justify-center py-14 border border-dashed border-gray-200 rounded-2xl">
               <Users size={22} className="text-gray-400 mb-2" />
               <p className="text-sm font-semibold text-gray-500">
                  No queues at the moment
               </p>
               <p className="text-xs text-gray-400 mt-1">
                  Everything is currently idle
               </p>
            </div>
         ) : (
            <div className="flex flex-col gap-2">

               {/* SERVING */}
               {serving.length > 0 && (
                  <div className="flex flex-col gap-2 mb-2">
                     {serving.map((t) => (
                        <ServingRow key={t.id} ticket={t} />
                     ))}
                  </div>
               )}

               {/* DIVIDER */}
               {serving.length > 0 && waiting.length > 0 && (
                  <div className="flex items-center gap-3 my-1">
                     <div className="flex-1 h-px bg-gray-100" />
                     <span className="text-xs text-gray-400 font-medium">
                        Up Next
                     </span>
                     <div className="flex-1 h-px bg-gray-100" />
                  </div>
               )}

               {/* WAITING */}
               {paginatedWaiting.length > 0 && (
                  <div className="flex flex-col gap-2">
                     {paginatedWaiting.map((t, i) => (
                        <WaitingRow
                           key={t.id}
                           ticket={t}
                           position={start + i + 1}
                        />
                     ))}
                  </div>
               )}

            </div>
         )}

         {/* PAGINATION */}
         {!loading && waiting.length > PAGE_SIZE && (
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">

               <p className="text-xs text-gray-400">
                  Showing {start + 1}–{Math.min(end, waiting.length)} of {waiting.length}
               </p>

               <div className="flex gap-2">

                  <button
                     title='confirm'
                     onClick={() => setPage((p) => p - 1)}
                     disabled={!hasPrev}
                     className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                     <ChevronLeft size={16} />
                  </button>

                  <button
                     title='leave'
                     onClick={() => setPage((p) => p + 1)}
                     disabled={!hasNext}
                     className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                     <ChevronRight size={16} />
                  </button>

               </div>
            </div>
         )}
      </div>
   )
}