'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from "lucide-react"

type QueueItem = {
   ticketNo: number
   name: string
   isPriority: boolean
   isServing: boolean
}

const currentServing: QueueItem[] = [
   { ticketNo: 145, name: 'John Doe', isPriority: true, isServing: true },
   { ticketNo: 434, name: 'Maria Santos', isPriority: false, isServing: false },
   { ticketNo: 234, name: 'Alex Cruz', isPriority: true, isServing: false },
   { ticketNo: 355, name: 'Kim Lee', isPriority: false, isServing: false },
   { ticketNo: 356, name: 'Kim Tee', isPriority: false, isServing: false },
   { ticketNo: 234, name: 'Kim Tee', isPriority: false, isServing: false },
   { ticketNo: 342, name: 'Kim Tee', isPriority: false, isServing: false },
   { ticketNo: 366, name: 'Kim Tee', isPriority: false, isServing: false },
   { ticketNo: 376, name: 'Kim Tee', isPriority: false, isServing: false },
   { ticketNo: 378, name: 'Kim Tee', isPriority: false, isServing: false },
]

const PAGE_SIZE = 5

export function CurrentlyServingList() {
   const [page, setPage] = useState(0)

   const start = page * PAGE_SIZE
   const end = start + PAGE_SIZE
   const paginatedData = currentServing.slice(start, end)

   const hasNext = end < currentServing.length
   const hasPrev = page > 0

   return (
      <div className="bg-white rounded-[20px] p-9 shadow-sm flex flex-col">
         <h2 className="text-xl font-bold text-slate-600 tracking-wide mb-4">
            CURRENTLY SERVING
         </h2>

         <div className="flex flex-col gap-1">
            {paginatedData.map((c) => (
               <div
                  key={c.ticketNo}
                  className={`flex items-center justify-between py-4 px-6 border-b border-gray-200 rounded-lg last:border-b-0 transition ${
                     c.isServing
                        ? "bg-blue-50 border border-blue-300 text-blue-700 font-semibold"
                        : ""
                  }`}
               >
                  <div>
                     <p className="font-medium">
                        #{c.ticketNo} — {c.name}
                     </p>
                  </div>

                  <span
                     className={
                        c.isPriority
                           ? "text-orange-400 font-semibold"
                           : "text-blue-600"
                     }
                  >
                     {c.isPriority ? "Priority" : "Regular"}
                  </span>
               </div>
            ))}
         </div>

         {/* PREVIOUS NEXT */}
         <div className="mx-auto mt-4 gap-2 flex">
            <button
               title='Previous'
               onClick={() => setPage((p) => p - 1)}
               disabled={!hasPrev}
               className="px-4 py-2 rounded-lg bg-gray-100 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
               <ChevronLeft size={18} />
            </button>

            <button
               title='Next'
               onClick={() => setPage((p) => p + 1)}
               disabled={!hasNext}
               className="px-4 py-2 rounded-lg bg-blue-500 text-white disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
               <ChevronRight size={18} />
            </button>
         </div>
      </div>
   )
}