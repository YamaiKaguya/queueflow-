'use client'

import { useState, useMemo } from 'react'
import { Search, Scan } from 'lucide-react'

import { useJoinQueue } from '@/src/features/(Private)/joinqueue/_hooks/useJoinQueue'
import { useServices } from '@/src/features/(Private)/joinqueue/_hooks/useServices'
import { ServiceCard } from '@/src/features/(Private)/joinqueue/_components/Services'
import { DetailsPanel } from '@/src/features/(Private)/joinqueue/_components/DetailedCard'
import { TicketConfirmed } from '@/src/features/(Private)/joinqueue/_components/Ticket'

export default function JoinQueue() {
   const {
      service,
      setService,
      ticket,
      loading,
      error,
      name,
      setName,
      email,
      setEmail,
      priority,
      setPriority,
      joinQueue,
   } = useJoinQueue()

   const { services, loadingServices } = useServices()

   const [query, setQuery] = useState('')

   const filteredServices = useMemo(() => {
      const q = query.trim().toLowerCase()

      if (!q) return services

      return services.filter((s) =>
         s.label?.toLowerCase().includes(q)
      )
   }, [query, services])

   const selectedService =
      filteredServices.find((s) => s.id === service)

   if (ticket) return <TicketConfirmed {...ticket} />

   return (
      <div className="flex-1 bg-gray-50 py-12">
         <main className="w-[90vw] mx-auto space-y-8">
            <div className="grid grid-cols-3 gap-6">

               {/* LEFT */}
               <div className="col-span-2 flex flex-col gap-5">
                  <div className="flex justify-between items-center">

                     <div>
                        <h2 className="text-2xl font-bold text-gray-600">
                           {query
                              ? `Results for "${query}"`
                              : 'Available Departments'}
                        </h2>
                        <p className="text-sm text-gray-400">
                           Select a department to continue
                        </p>
                     </div>

                     <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                        {filteredServices.filter((s) => s.open).length} Active
                     </span>
                  </div>
                  <div
                     className="
                        flex flex-col gap-2 h-130
                        overflow-y-auto pr-3
                        scrollbar-thin
                        scrollbar-thumb-gray-200
                        scrollbar-track-transparent
                        hover:scrollbar-thumb-gray-300
                     "
                  >
                     {loadingServices ? (
                        [...Array(6)].map((_, i) => (
                           <div
                              key={i}
                              className="p-6 rounded-xl border border-gray-200 bg-white animate-pulse"
                           >
                              <div className="flex items-start justify-between gap-3">
                                 <div className="flex-1 min-w-0">
                                    {/* HEADER */}
                                    <div className="flex items-center gap-2.5 mb-3.5">
                                       <div className="w-2.5 h-2.5 rounded-full bg-gray-200 shrink-0" />
                                       <div className="h-5 w-40 bg-gray-200 rounded" />
                                    </div>

                                    {/* META */}
                                    <div className="flex items-center gap-5">
                                       <div className="flex items-center gap-1.5">
                                          <div className="w-4 h-4 rounded bg-gray-200" />
                                          <div className="h-4 w-20 bg-gray-200 rounded" />
                                       </div>
                                       <div className="flex items-center gap-1.5">
                                          <div className="w-4 h-4 rounded bg-gray-200" />
                                          <div className="h-4 w-24 bg-gray-200 rounded" />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))
                     ) : filteredServices.length > 0 ? (
                        filteredServices.map((s) => (
                           <ServiceCard
                              key={s.id}
                              service={s}
                              isSelected={service === s.id}
                              onSelect={setService}
                           />
                        ))
                     ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                           <p className="text-lg font-medium">
                              No services found
                           </p>
                           <p className="text-sm mt-1">
                              Try a different keyword
                           </p>
                        </div>
                     )}
                  </div>
               </div>

               {/* RIGHT */}
               <div className="flex flex-col gap-5">
                  <div className="relative">
                     <Search
                        size={22}
                        className="absolute left-4 top-3 text-gray-400"
                     />
                     <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) =>
                           e.key === 'Escape' && setQuery('')
                        }
                        placeholder="Search departments..."
                        className="w-full pl-11 pr-4 py-2.5 text-lg rounded-full border border-gray-200 bg-white outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
                     />
                  </div>
                  <DetailsPanel
                     selected={selectedService}
                     name={name}
                     onNameChange={setName}
                     email={email}
                     onEmailChange={setEmail}
                     priority={priority}
                     onPriorityChange={setPriority}
                     onJoin={() => joinQueue()}
                     loading={loading}
                     error={error}
                  />
               </div>
            </div>
         </main>
      </div>
   )
}