'use client'
import { useState } from 'react'
import { Mail, Smartphone, Lock, LogOut, ChevronRight, User } from 'lucide-react'

import { useSettings } from './_hooks/useSettings'
import { SettingRow, ChangePasswordPanel } from './_components/Index'

export default function SettingsPage() {
   const [emailReminders, setEmailReminders] = useState(true)
   const [smsAlert, setSmsAlert] = useState(false)
   const [passwordOpen, setPasswordOpen] = useState(false)

   const {
      changingPassword,
      signingOut,
      error,
      success,
      lastPasswordChange,
      changePassword,
      signOut,
      clearMessages,
   } = useSettings()

   return (
      <div className="min-h-screen bg-[#F5F5F3]">
         <div className="max-w-3xl mx-auto px-8 py-12 flex flex-col gap-12">

               {/* Header */}
               <div>
                  <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
                  <p className="text-base text-gray-400 mt-2">
                     Manage your personal preferences, and account security
                  </p>
               </div>

               {/* Notification */}
               <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1.5">Notification</h2>
                  <p className="text-sm text-gray-400 mb-5">
                     Control how and when we reach out to you regarding queue status
                  </p>
                  <div className="bg-white border border-gray-100 rounded-2xl divide-y divide-gray-100">
                     <SettingRow
                           icon={<Mail size={22} className="text-gray-500" />}
                           label="Email Reminders"
                           desc="Appointment details and receipt summaries"
                           enabled={emailReminders}
                           onToggle={() => setEmailReminders(!emailReminders)}
                     />
                     <SettingRow
                           icon={<Smartphone size={22} className="text-gray-500" />}
                           label="SMS Alert"
                           desc="Real-time queue notifications and delay alerts"
                           enabled={smsAlert}
                           onToggle={() => setSmsAlert(!smsAlert)}
                     />
                  </div>
               </div>

               {/* Security */}
               <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1.5">Security</h2>
                  <p className="text-sm text-gray-400 mb-5">
                     Manage your password and authentication methods
                  </p>
                  <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                     <button
                           onClick={() => {
                              setPasswordOpen(!passwordOpen)
                              clearMessages()
                           }}
                           className="w-full flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition-colors cursor-pointer"
                     >
                           <div className="flex items-center gap-5">
                              <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
                                 <Lock size={22} className="text-gray-500" />
                              </div>
                              <div className="text-left">
                                 <p className="text-base font-semibold text-gray-800">Change Password</p>
                                 <p className="text-sm text-gray-400 mt-0.5">
                                       {lastPasswordChange ?? 'No changes yet'}
                                 </p>
                              </div>
                           </div>
                           <ChevronRight
                              size={20}
                              className={`text-gray-400 transition-transform duration-300 ${passwordOpen ? 'rotate-90' : ''}`}
                           />
                     </button>

                     <div className={`transition-all duration-300 ease-in-out overflow-hidden ${passwordOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'}`}>
                           <ChangePasswordPanel
                              onClose={() => {
                                 setPasswordOpen(false)
                                 clearMessages()
                              }}
                              onSave={changePassword}
                              loading={changingPassword}
                              error={error}
                              success={success}
                           />
                     </div>
                  </div>
               </div>

               {/* Session */}
               <div className="flex items-center justify-between py-5 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                     <User size={18} className="text-gray-400" />
                     <div>
                           <p className="text-base font-semibold text-gray-800">Session management</p>
                           <p className="text-sm text-gray-400 mt-0.5">Logged in as John Doe</p>
                     </div>
                  </div>
                  <button
                     onClick={signOut}
                     disabled={signingOut}
                     className="flex items-center gap-2 bg-red-400 hover:bg-red-500 active:scale-95 text-white text-sm font-semibold px-6 py-3 rounded-xl cursor-pointer transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                     <LogOut size={16} />
                     {signingOut ? 'Signing out...' : 'Sign Out'}
                  </button>
               </div>

         </div>
      </div>
   )
}