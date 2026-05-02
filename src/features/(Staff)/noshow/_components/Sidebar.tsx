'use client'

import React from 'react'
import { Activity, Heart, Smile, Stethoscope, Microscope, ReceiptText } from 'lucide-react'

const SERVICE_ICONS: Record<string, React.ElementType> = {
  Billing: ReceiptText,
  Cardiology: Heart,
  Dental: Smile,
  General: Stethoscope,
  Laboratory: Microscope,
}

const FallbackIcon = Activity

type ServiceRow = {
  id: string
  label: string
  open: boolean
  ahead: number
  average: number
}

type Props = {
  services: ServiceRow[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export default function Sidebar({ services, selectedId, onSelect }: Props) {
  return (
    <aside className="w-72 bg-white border border-gray-100 rounded-2xl shadow-sm self-start sticky top-6">
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900">Departments</h2>
      </div>
      <div className="p-2 space-y-1">
        {services.map((svc) => {
          const Icon = SERVICE_ICONS[svc.label] ?? FallbackIcon
          const isActive = selectedId === svc.id

          return (
            <button
              key={svc.id}
              onClick={() => onSelect(svc.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2 rounded-xl transition cursor-pointer
                ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}
              `}
            >
              <Icon size={18} className={isActive ? 'text-blue-600' : 'text-gray-400'} />
              <span className="text-base font-medium">{svc.label}</span>
            </button>
          )
        })}
      </div>
    </aside>
  )
}