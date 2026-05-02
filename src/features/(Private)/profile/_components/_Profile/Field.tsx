'use client'

import { SkeletonBox } from './Skeleton'

type FieldType = 'text' | 'select' | 'date'

type ProfileFieldProps = {
    icon: React.ReactNode
    label: string
    value: string
    editing: boolean
    loading: boolean
    type?: FieldType
    options?: string[]
    onChange: (value: string) => void
}

export function ProfileField({
    icon,
    label,
    value,
    editing,
    loading,
    type = 'text',
    options = [],
    onChange,
}: ProfileFieldProps) {
    return (
        <div className="flex items-start gap-3 px-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 h-[76px]">

            <div className="text-blue-500 mt-1 shrink-0">
                {icon}
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-center">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
                    {label}
                </p>

                <div className="mt-1 h-6 flex items-center">
                    {loading ? (
                        <SkeletonBox className="h-4 w-28" />
                    ) : editing ? (
                        type === 'select' ? (
                            <select
                                title='info'
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1 text-sm h-6"
                            >
                                <option value="">Select</option>
                                {options.map((o) => (
                                    <option key={o} value={o}>{o}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                title='info'
                                value={value}
                                type={type}
                                onChange={(e) => onChange(e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1 text-sm h-6"
                            />
                        )
                    ) : (
                        <p className="text-sm font-semibold text-gray-800 truncate">
                            {value || '—'}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}