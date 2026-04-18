// components/PatientProfile.tsx
'use client'

import { Phone, Mail, Calendar, Venus, IdCard, BadgeCheck } from 'lucide-react'
import { Pencil } from 'lucide-react'

const patient = {
    name: 'John Doe',
    patientId: 'PC9281-6813',
    verified: true,
    avatar: 'https://i.pravatar.cc/150?img=68',
    phone: '(+63) 9959 314 004',
    email: 'JohnDoe123@gmail.com',
    birthday: 'March 23, 2003',
    gender: 'Male',
}

export default function PatientProfile() {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm">
        {/* Avatar + Name */}
        <div className="flex items-center gap-5 mb-8 ">
            <img
            src={patient.avatar}
            alt={patient.name}
            className="w-20 h-20 rounded-full object-cover ring-2 ring-gray-100"
            />
            <div>
                <div className="flex items-center gap-2.5">
                    <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
                    {patient.verified && (
                    <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        <BadgeCheck size={13} />
                        Verified Account
                    </span>
                    )}
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-400">
                    <IdCard size={14} />
                    Patient ID: {patient.patientId}
                </div>
            </div>
            {/* <button className="flex items-start justify-start gap-2 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white text-sm font-semibold px-5 py-2.5 rounded-xl ml-auto transition-all"> */}
            <button className="ml-auto self-start bg-blue-500 hover:bg-blue-600 active:scale-95 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer">
                <Pencil size={15} />
                Edit Profile
            </button>
        </div>

        {/* Section Label */}
        <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <IdCard size={16} className="text-blue-500" />
            </div>
            <h3 className="text-base font-bold text-gray-800">Personal Details</h3>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-6">
            {[
            { label: 'Phone Number', value: patient.phone, icon: <Phone size={15} className="text-gray-400" /> },
            { label: 'Email Address', value: patient.email, icon: <Mail size={15} className="text-gray-400" /> },
            { label: 'Birthday', value: patient.birthday, icon: <Calendar size={15} className="text-gray-400" /> },
            { label: 'Gender', value: patient.gender, icon: <Venus size={15} className="text-gray-400" /> },
            ].map(({ label, value, icon }) => (
            <div key={label}>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">{label}</p>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                {icon}
                {value}
                </div>
            </div>
            ))}
        </div>
        </div>
    )
}