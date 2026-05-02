'use client'

import { useEffect } from 'react'
import PatientProfile from '@/src/features/(Private)/profile/_components/Profile'
import VisitHistory from '@/src/features/(Private)/profile/_components/History'
import { useProfile } from './_hooks/useProfile'



export default function ProfilePage() {

   return (
      <div className="min-h-screen bg-[#F5F5F3] px-8 py-12">
         <div className="max-w-4xl mx-auto space-y-6">

            <div>
               <h1 className="text-4xl font-bold text-gray-900">My Profile</h1>
               <p className="text-base text-gray-400 mt-1.5">
                  Manage your personal information, and view history
               </p>
            </div>
            <PatientProfile/>
            <VisitHistory />
         </div>
      </div>
   )
}