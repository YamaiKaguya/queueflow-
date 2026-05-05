'use client'

import { ReactNode } from 'react'
import {
   Users,
   User,
   CheckCircle2,
   Activity,
   Pencil,
   Trash2,
   FileText,
   ChevronRight,
   Shield,
   Lock
} from 'lucide-react'

/* ================= TYPES ================= */

type CardProps = {
   icon: ReactNode
   title: string
   desc: string
}

type StepProps = {
   number: string
   title: string
   desc: string
}

/* ================= COMPONENTS ================= */

function FeatureCard({ icon, title, desc }: CardProps) {
   return (
      <div
         className="
         p-8 bg-white rounded-2xl border border-gray-100
         shadow-sm flex flex-col gap-4 
         transition-all duration-300 ease-out
         hover:-translate-y-1 hover:shadow-lg
         "
      >
         <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-50 text-blue-500">
            {icon}
         </span>

         {/* TITLE */}
         <h3 className="text-gray-900 text-xl font-bold leading-tight">
            {title}
         </h3>

         {/* DESCRIPTION */}
         <p className="text-gray-500 text-base leading-relaxed">
            {desc}
         </p>
      </div>
   )
}

function SectionHeading({ number, title }: { number: string, title: string }) {
   return (
      <div className="flex flex-col items-center text-center mb-8">
         <span className="text-blue-500 font-semibold text-xs mb-4 bg-blue-50 px-4 py-1 rounded-full uppercase tracking-wide">
            Section {number}
         </span>
         <h2 className="text-5xl font-bold text-gray-900 tracking-tight">
            {title}
         </h2>
      </div>
   )
}

function Step({ number, title, desc }: StepProps) {
   return (
      <div
         className="
         p-6 bg-white rounded-2xl border border-gray-100 shadow-sm
         transition-all duration-300 ease-out
         hover:-translate-y-1 hover:shadow-lg
         "
      >
         <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-8 flex items-center justify-center text-sm font-bold bg-blue-500 text-white rounded-full">
               {number}
            </span>
            <h3 className="text-xl font-bold text-gray-900">
               {title}
            </h3>
         </div>

         <p className="text-gray-500 text-base leading-relaxed">
            {desc}
         </p>
      </div>
   )
}

/* ================= PAGE ================= */

export default function PrivacyPolicy() {
   return (
      <div className="min-h-screen bg-[#f5f5f3] text-slate-800 font-sans">

         {/* HERO */}
         <section className="pt-32 pb-24 px-6 text-center bg-gradient-to-b from-blue-50 to-[#f5f5f3] border-b border-gray-100">
            <div className="max-w-4xl mx-auto">
               <p className="text-xs tracking-widest text-blue-500 font-semibold mb-4 uppercase">
                  Legal Documentation
               </p>

               <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 tracking-tight">
                  Privacy <span className="text-blue-500">Policy</span>
               </h1>

               <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-8">
                  How QueueFlow+ collects, uses, protects, and shares information across
                  our healthcare queue management platform.
               </p>

               <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                  <Activity size={16} className="text-blue-500" />
                  <span>Last updated: March 27, 2026</span>
               </div>
            </div>
         </section>

         {/* CONTENT */}
         <div className="max-w-[85vw] mx-auto py-24 space-y-40">

            {/* INTRO */}
            <div className="max-w-3xl mx-auto text-center">
               <p className="text-2xl md:text-3xl text-slate-500 leading-relaxed italic">
                  "At QueueFlow, we value the privacy and security of the information
                  entrusted to us. We apply hospital-grade security to everything we do."
               </p>
            </div>

            {/* SECTION 1 */}
            <section>
               <SectionHeading number="01" title="Information We Collect" />
               <div className="grid md:grid-cols-2 gap-6">
                  <FeatureCard
                     icon={<User size={24} />}
                     title="Patient Information"
                     desc="We may collect personal and visit-related information needed to manage queueing and service operations, such as name, contact details, date of birth, and other identifiers required by the facility."
                  />
                  <FeatureCard
                     icon={<Users size={24} />}
                     title="Staff Information"
                     desc="We may collect staff details such as name, role, department, and system activity logs to support authentication, accountability, and secure platform access."
                  />
               </div>
            </section>

            {/* SECTION 2 */}
            <section className="bg-white rounded-[2.5rem] p-12 md:p-20 border border-gray-100 shadow-sm">
               <SectionHeading number="02" title="How We Use Data" />

               <p className="text-gray-500 text-base text-center mb-10 max-w-3xl mx-auto leading-relaxed">
                  Information collected through QueueFlow+ is used only for legitimate operational purposes.
               </p>

               <div className="grid md:grid-cols-2 gap-y-6 gap-x-12 max-w-4xl mx-auto">
                  {[
                     'Managing real-time service flow',
                     'Generating secure audit records',
                     'Maintaining internal security and compliance requirements',
                     'Supporting facility staff operations',
                     'Improving system performance',
                  ].map((item) => (
                     <div
                        key={item}
                        className="
                        flex items-center gap-4 bg-[#f5f5f3] p-5 rounded-2xl
                        transition-all duration-300 ease-out
                        hover:-translate-y-1 hover:shadow-md
                        "
                     >
                        <div className="bg-blue-500 rounded-full p-1">
                           <CheckCircle2 className="text-white" size={14} />
                        </div>
                        <p className="font-bold text-gray-700 text-base">
                           {item}
                        </p>
                     </div>
                  ))}
               </div>
            </section>

            {/* SECTION 3 */}
            <section>
               <SectionHeading number="03" title="Data Retention" />
               <p className="text-gray-500 text-base text-center mb-10 max-w-3xl mx-auto leading-relaxed">
                  QueueFlow+ retains data only for as long as necessary to support queue management, reporting, and administrative operations.
               </p>

               <div className="grid md:grid-cols-3 gap-6">
                  <Step number="1" title="Active Use" desc="Information is available during ongoing operations such as patient queuing, service processing, and staff coordination." />
                  <Step number="2" title="Secure Storage" desc="Data that is no longer actively used is retained in a protected environment for reporting, audit, or administrative reference." />
                  <Step number="3" title="Data Cleanup" desc="Once data is no longer required, it is securely removed or anonymized in accordance with institutional policies." />
               </div>
            </section>

            {/* SECTION 4 */}
            <section>
               <SectionHeading number="04" title="User Rights" />
               <div className="grid md:grid-cols-3 gap-6">
                  <FeatureCard icon={<FileText size={20} />} title="Access" desc="Request a summary of personal or queue-related data stored within the system." />
                  <FeatureCard icon={<Pencil size={20} />} title="Rectify" desc="Update or correct inaccurate or outdated details." />
                  <FeatureCard icon={<Trash2 size={20} />} title="Delete" desc="Request deletion of personal data." />
               </div>
            </section>

            {/* SECTION 5 */}
            <section>
               <SectionHeading number="05" title="Data Protection and Security" />
               <p className="text-gray-500 text-base text-center mb-10 max-w-3xl mx-auto leading-relaxed">
                  QueueFlow+ applies safeguards to protect data from unauthorized access, disclosure, alteration, or loss.
               </p>

               <div className="grid md:grid-cols-2 gap-6">
                  <FeatureCard
                     icon={<Shield size={20} />}
                     title="Access Controls"
                     desc="Only authorized personnel can view or modify sensitive data within the system."
                  />

                  <FeatureCard
                     icon={<Lock size={20} />}
                     title="Encryption"
                     desc="Data is encrypted during transmission and storage."
                  />
               </div>
            </section>

         </div>

         {/* CTA */}
         <section className="bg-blue-500 py-32 px-6 text-center">
            <div className="max-w-2xl mx-auto">
               <h2 className="text-5xl font-bold text-white mb-8 tracking-tight">
                  Have questions about your data?
               </h2>

               <p className="text-blue-100 mb-10 text-lg">
                  Our privacy team is available to help you understand your rights.
               </p>

               <button className="bg-white text-blue-500 px-12 py-5 rounded-2xl font-bold uppercase text-sm tracking-widest flex items-center gap-2 mx-auto transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                  Contact Support
                  <ChevronRight size={18} />
               </button>
            </div>
         </section>

      </div>
   )
}