'use client'

import { useState } from 'react'
import { createClient } from '@/src/lib/supabase/client'

const SERVICES = [
   {
      id: 'GENERAL',
      label: 'General',
      waitTime: '~10 min',
      congestion: 'LOW' as const,
      open: true,
      ahead: 4,
   },
   {
      id: 'DENTAL',
      label: 'Dental',
      waitTime: '~15 min',
      congestion: 'MEDIUM' as const,
      open: true,
      ahead: 9,
   },
   {
      id: 'PHARMACY',
      label: 'Pharmacy',
      waitTime: '~5 min',
      congestion: 'LOW' as const,
      open: true,
      ahead: 2,
   },
   {
      id: 'LABORATORY',
      label: 'Laboratory',
      waitTime: '~25 min',
      congestion: 'HIGH' as const,
      open: true,
      ahead: 17,
   },
   {
      id: 'RADIOLOGY',
      label: 'Radiology',
      waitTime: null,
      congestion: 'LOW' as const,
      open: false,
      ahead: 0,
   },
   {
      id: 'BILLING',
      label: 'Billing',
      waitTime: '~20 min',
      congestion: 'MEDIUM' as const,
      open: true,
      ahead: 11,
   },
]

type Congestion = 'LOW' | 'MEDIUM' | 'HIGH'

type QueueTicket = {
   ticket_no: number
   service: string
   position: number
}

const congestionConfig: Record<Congestion, { label: string; bg: string; text: string; dot: string }> = {
   LOW:    { label: 'LOW',    bg: 'bg-green-100',  text: 'text-green-700',  dot: 'bg-green-500'  },
   MEDIUM: { label: 'MED',   bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
   HIGH:   { label: 'HIGH',  bg: 'bg-red-100',    text: 'text-red-700',    dot: 'bg-red-500'    },
}

export default function JoinQueue() {
const [service, setService] = useState('')
const [ticket, setTicket] = useState<QueueTicket | null>(null)
const [loading, setLoading] = useState(false)
const [error, setError] = useState<string | null>(null)
const supabase = createClient()
const [priority, setPriority] = useState(false)

const selectedService = SERVICES.find((s) => s.id === service)

const joinQueue = async () => {
   if (!service) { setError('Please select a service.'); return }
   if (!selectedService?.open) { setError('This service is currently closed.'); return }
   setLoading(true)
   setError(null)
   try {
      const { data: { user } } = await supabase.auth.getUser()
      const { data, error: insertError } = await supabase
      .from('queue')
      .insert({ service, status: 'waiting', user_id: user.id })
      .select('ticket_no, service')
      .single()
      if (insertError) throw insertError

      const { count, error: countError } = await supabase
      .from('queue')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'waiting')
      .lt('ticket_no', data.ticket_no)
      if (countError) throw countError

      setTicket({ ticket_no: data.ticket_no, service: data.service, position: (count ?? 0) + 1 })
   } catch (err) {
      setError('Something went wrong. Please try again.')
      console.error(err)
   } finally {
      setLoading(false)
   }
}

if (ticket) {
   return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white rounded-2xl shadow-lg p-14 w-full max-w-lg space-y-8 text-center">
         <h1 className="text-3xl font-bold text-gray-800">Your Ticket</h1>
         <div className="bg-blue-50 rounded-2xl p-10 space-y-4">
            <p className="text-7xl font-black text-blue-600">#{ticket.ticket_no}</p>
            <p className="text-lg font-medium text-gray-600">{ticket.service}</p>
            <p className="text-sm text-gray-500">Queue position: <span className="font-semibold">{ticket.position}</span></p>
         </div>
         <button
            onClick={() => { setTicket(null); setService('') }}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 rounded-xl transition-all"
         >
            Join Another Queue
         </button>
      </div>
      </main>
   )
}

   return (
   <div className="w-full min-h-screen bg-gray-50 px-10 py-12">
      <main className="max-w-7xl mx-auto space-y-8">

         {/* HEADER */}
         <header>
         <h1 className="text-4xl font-bold text-gray-900">Join Queue</h1>
         <p className="text-gray-500 mt-2">
            Select a department and register your details to get an instant token
         </p>
         </header>

         {/* SEARCH + FILTER */}
         <div className="flex items-center gap-3">
         <input
            placeholder="Search departments, specialists, or counters..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none"
         />
         <button className="px-4 py-3 rounded-xl border bg-white text-sm">
            Filters
         </button>
         </div>

         {/* MAIN GRID */}
         <div className="grid grid-cols-3 gap-6">

         {/* LEFT: DEPARTMENTS */}
         <div className="col-span-2 space-y-4">
            <div className="flex justify-between items-center">
               <h2 className="font-semibold text-gray-800">
               Available Departments
               </h2>
               <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
               {SERVICES.filter(s => s.open).length} Active
               </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
               {SERVICES.map((s) => {
               const cong = congestionConfig[s.congestion]
               const isSelected = service === s.id
               const isDisabled = !s.open

               return (
                  <button
                     key={s.id}
                     onClick={() => !isDisabled && setService(s.id)}
                     disabled={isDisabled}
                     className={`
                     p-5 rounded-2xl border transition-all text-left
                     ${isDisabled
                        ? 'opacity-50 bg-gray-100 cursor-not-allowed'
                        : isSelected
                           ? 'border-blue-500 bg-blue-50 shadow-sm'
                           : 'bg-white border-gray-200 hover:border-blue-300'
                     }
                     `}
                  >
                     {/* TOP */}
                     <div className="flex justify-between items-start mb-3">
                     <h3 className="font-semibold text-gray-800 text-sm">
                        {s.label}
                     </h3>

                     <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${cong.bg} ${cong.text}`}>
                        {cong.label}
                     </span>
                     </div>

                     {/* STATUS */}
                     <p className="text-xs text-gray-500 mb-2">
                     {s.open ? 'Open' : 'Closed'}
                     </p>

                     {/* STATS */}
                     {s.open && (
                     <div className="text-xs text-gray-500 space-y-1">
                        <p>Wait Time: <span className="font-medium text-gray-700">{s.waitTime}</span></p>
                        <p>Ahead: <span className="font-medium text-gray-700">{s.ahead}</span></p>
                     </div>
                     )}
                  </button>
               )
               })}
            </div>
         </div>

         {/* RIGHT: DETAILS PANEL */}
         <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">

            {!selectedService ? (
               <p className="text-sm text-gray-500">
               Select a department to view details
               </p>
            ) : (
               <>
               {/* HEADER */}
               <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                     {selectedService.label}
                  </h3>
                  <p className="text-xs text-gray-500">Department Live Overview</p>
               </div>

               {/* STATS */}
               <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-gray-100 rounded-xl py-3">
                     <p className="text-xs text-gray-500">Queue</p>
                     <p className="font-semibold">{selectedService.ahead}</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl py-3">
                     <p className="text-xs text-gray-500">ETA</p>
                     <p className="font-semibold text-blue-600">{selectedService.waitTime}</p>
                  </div>
                  <div className="bg-gray-100 rounded-xl py-3">
                     <p className="text-xs text-gray-500">Avg</p>
                     <p className="font-semibold">15m</p>
                  </div>
               </div>

               {/* FORM */}
               <div className="space-y-3">
                  <input
                     placeholder="Full Name"
                     className="w-full px-3 py-2 rounded-lg border text-sm"
                  />
                  <input
                     placeholder="Email Address"
                     className="w-full px-3 py-2 rounded-lg border text-sm"
                  />
               </div>

               <div className="flex items-start gap-3">
                  <input
                     id="priority"
                     type="checkbox"
                     checked={priority}
                     onChange={(e) => setPriority(e.target.checked)}
                     className="mt-1 w-4 h-4 rounded border-gray-300"
                  />

                  <div className="flex flex-col">
                     <label
                        htmlFor="priority"
                        className="text-sm font-medium text-gray-700 cursor-pointer"
                     >
                        Request Priority
                     </label>
                     <span className="text-xs text-gray-500">
                        For elderly, pregnant, or persons with disabilities
                     </span>
                  </div>
               </div>


               {/* ERROR */}
               {error && (
                  <p className="text-sm text-red-500">{error}</p>
               )}

               {/* BUTTON */}
               <button
                  onClick={joinQueue}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-semibold disabled:opacity-40"
               >
                  {loading ? 'Joining...' : 'Join Queue'}
               </button>
               </>
            )}
         </div>
         </div>
      </main>
   </div>
)}