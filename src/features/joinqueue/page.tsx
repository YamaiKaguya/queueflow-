'use client'

import { useState, useMemo } from 'react'
import { useJoinQueue } from '@/src/features/joinqueue/_hooks/useJoinQueue'
import { useServices } from '@/src/features/joinqueue/_hooks/useServices'
import { ServiceCard } from '@/src/features/joinqueue/_components/Services'
import { DetailsPanel } from '@/src/features/joinqueue/_components/DetailedCard'
import { TicketConfirmed } from '@/src/features/joinqueue/_components/Ticket'

export default function JoinQueue() {
   const { service, setService, ticket, loading, error, name, setName, email, setEmail, priority, setPriority, joinQueue } = useJoinQueue()
   const { services, loadingServices } = useServices()
   const [ query, setQuery ] = useState('')

   const filteredServices = useMemo(() => {
      const q = query.trim().toLowerCase()
      if (!q) return services

      return services.filter((s) =>
         s.label?.toLowerCase().includes(q)
      )
   }, [query, services])

   const selectedService = filteredServices.find((s) => s.id === service)

   if (ticket) return <TicketConfirmed {...ticket}/>

   return (
      <div className="flex-1 bg-gray-50 py-12">
         <main className="w-[90vw] mx-auto space-y-8">
               <div className="flex items-center gap-3">
                  <input
                     value={query}
                     onChange={(e) => setQuery(e.target.value)}
                     onKeyDown={(e) => e.key === 'Escape' && setQuery('')}
                     placeholder="Search services..."
                     className="flex-1 px-5 py-3 text-base rounded-full border border-gray-200 bg-white outline-none"
                  />
                  <button
                     onClick={() => setQuery('')}
                     className="
                     text-base
                     bg-blue-500 text-white px-5 py-3 border border-gray-200
                     rounded-full cursor-pointer 
                     hover:bg-blue-700 transition-all transition-duration-300
                     "
                  >
                     {query ? 'Clear' : 'Search'}
                  </button>
               </div>

               <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-2 flex flex-col gap-5">
                     <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-800">
                           {query ? `Results for "${query}"` : 'Available Departments'}
                        </h2>
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                           {filteredServices.filter((s) => s.open).length} Active
                        </span>
                     </div>
                     <div className="
                     grid
                     gap-2
                     h-115
                     overflow-y-auto
                     pr-3 
                     scrollbar-thin 
                     scrollbar-thumb-gray-200 
                     scrollbar-track-transparent
                     hover:scrollbar-thumb-gray-300
                     ">
                     {loadingServices
                        ? [...Array(6)].map((_, i) => (
                           <div key={i} className="h-37 bg-gray-200 rounded-2xl animate-pulse" />
                        ))
                        : filteredServices.length > 0
                           ? filteredServices.map((s) => (
                              <ServiceCard
                                 key={s.id}
                                 service={s}
                                 isSelected={service === s.id}
                                 onSelect={setService}
                              />
                           ))
                           : (
                              <div className="col-span-2 flex flex-col items-center justify-center py-16 text-gray-400">
                                 <p className="text-lg font-medium">No services found</p>
                                 <p className="text-sm mt-1">Try a different keyword</p>
                              </div>
                           )
                     }
                     </div>
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
         </main>
      </div>
   )
}