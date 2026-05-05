'use client'
import { useStaffQueue } from './_hooks/useStaff'
import { useState } from "react"
import {
   Sidebar,
   WaitingQueue,
   ServingPanel,
   RegistrationCard
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
   } = useStaffQueue()

   const [selectedId, setSelectedId] = useState<string | null>(null)

   const selectedService = services.find((s) => s.id === selectedId) ?? null
   const normalizedSelected = selectedService?.label.toLowerCase().trim()

   const filteredWaiting = selectedService
      ? waiting.filter(t => t.service?.toLowerCase().trim() === normalizedSelected)
      : []

   const filteredServing = selectedService
      ? serving.filter(t => t.service?.toLowerCase().trim() === normalizedSelected)
      : []

   const filteredHasNext = filteredWaiting.length > 0

   return (
      <main className="flex gap-4 p-12 items-start">
         <Sidebar
            services={services}
            selectedId={selectedId}
            onSelect={(id) => setSelectedId((prev) => (prev === id ? null : id))}
         />
         <div className="flex-1 space-y-6">
            <div className="grid grid-cols-3 grid-row-1 gap-6">
               <ServingPanel
                  filteredServing={filteredServing}
                  filteredWaiting={filteredWaiting}
                  filteredHasNext={filteredHasNext}
                  actionLoading={actionLoading}
                  callNext={() => callNext(selectedService?.label)}
                  updateStatus={updateStatus}
               />
               <RegistrationCard
                  selectedService={selectedService}
               />
            </div>
            <WaitingQueue waiting={filteredWaiting} />
         </div>
      </main>
   )
}