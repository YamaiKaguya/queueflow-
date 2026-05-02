'use client'
import { Toggle } from './Toggle'

type SettingRowProps = {
    icon: React.ReactNode
    label: string
    desc: string
    enabled: boolean
    onToggle: () => void
}

export function SettingRow({ icon, label, desc, enabled, onToggle }: SettingRowProps) {
    return (
        <div className="flex items-center justify-between px-6 py-5">
            <div className="flex items-center gap-5">
                <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
                    {icon}
                </div>
                <div>
                    <p className="text-base font-semibold text-gray-800">{label}</p>
                    <p className="text-sm text-gray-400 mt-0.5">{desc}</p>
                </div>
            </div>
            <Toggle enabled={enabled} onChange={onToggle} />
        </div>
    )
}