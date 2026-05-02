'use client'

import { useQueueContext } from '../dashboard/_context/QueueContext'
import React, { useState } from "react"

import {
   Sidebar,
   WaitingQueue,
   ServingPanel,
} from "./_components/Index"

export default function StaffDashboard() {
   const {
      loading,
      actionLoading,
      serving,
      waiting,
      callNext,
      updateStatus,
      services,
      hasServing
   } = useQueueContext()

      const [selectedId, setSelectedId] = useState<string | null>(null)

   const selectedService = services.find((s) => s.id === selectedId) ?? null



   const normalizedSelected = selectedService?.label.toLowerCase().trim()

   const filteredWaiting = selectedService
      ? waiting.filter(t => t.service?.toLowerCase().trim() === normalizedSelected)
      : waiting

   const filteredServing = selectedService
      ? serving.filter(t => t.service?.toLowerCase().trim() === normalizedSelected)
      : serving

   const filteredHasNext = filteredWaiting.length > 0

   if (loading) {
      return (
         <main className="min-h-screen bg-gray-50 flex items-center justify-center">
               <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
                  
                  <p className="text-gray-500 font-medium">
                     Loading queue system...
                  </p>

                  <p className="text-xs text-gray-400">
                     Preparing dashboard data
                  </p>
               </div>
         </main>
      )
   }

   return (
      <main className="flex gap-4 p-12 items-start">
         <Sidebar
            services={services}
            selectedId={selectedId}
            onSelect={(id) => setSelectedId((prev) => (prev === id ? null : id))}
         />

         <div className="flex-1 flex flex-col gap-6 rounded-lg">
            <ServingPanel
               filteredServing={filteredServing}
               filteredWaiting={filteredWaiting}
               filteredHasNext={filteredHasNext}
               actionLoading={actionLoading}
               callNext={callNext}
               updateStatus={updateStatus}
               hasServing={hasServing}
            />

            <WaitingQueue waiting={filteredWaiting} />
         </div>
      </main>
   )
}
