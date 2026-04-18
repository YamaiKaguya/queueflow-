// app/profile/page.tsx
'use client'

import PatientProfile from '@/src/features/profile/_components/Profile'
import VisitHistory from '@/src/features/profile/_components/History'


export default function ProfilePage() {
   return (
      <div className="min-h-screen bg-[#F5F5F3] px-8 py-12">
         <div className="max-w-4xl mx-auto space-y-6">

         {/* Page Header */}
         <div className="flex items-start justify-between">
            <div>
               <h1 className="text-4xl font-bold text-gray-900">Patient Profile</h1>
               <p className="text-base text-gray-400 mt-1.5">Manage your personal information, preferences, and account security</p>
            </div>

         </div>

         <PatientProfile />
         <VisitHistory />

         </div>
      </div>
   )
}