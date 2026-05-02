import { Clock, Users } from "lucide-react"

type Service = {
    id: string
    label: string
    average: number
    open: boolean
    ahead: number
}

type Props = {
    service: Service
    isSelected: boolean
    onSelect: (id: string) => void
}

function formatWait(totalSecs: number | null): string {
    if (totalSecs === null || totalSecs === 0) return 'N/A'
    if (totalSecs < 60) return `~${totalSecs}s`
    const mins = Math.ceil(totalSecs / 60)
    return `~${mins} min${mins === 1 ? '' : 's'}`
}

export function ServiceCard({ service: s, isSelected, onSelect }: Props) {
    const isDisabled = !s.open
    const totalSecs = s.ahead && s.average ? s.ahead * s.average : null

    return (
        <button
            onClick={() => !isDisabled && onSelect(s.id)}
            disabled={isDisabled}
            className={`p-6 rounded-xl border transition-all text-left w-full
            ${isDisabled
                ? 'opacity-50 bg-gray-50 cursor-not-allowed border-gray-100'
                : isSelected
                    ? 'border-blue-300 bg-blue-50 shadow-sm cursor-pointer'
                    : 'bg-white border-gray-200 hover:border-blue-200 hover:shadow-sm cursor-pointer'
            }`}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-3.5">
                        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${s.open ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <h3 className="font-semibold text-gray-800 text-base truncate">
                            {s.label}
                        </h3>
                    </div>
                    {s.open && (
                        <div className="flex items-center gap-5">
                            <span className="flex items-center gap-1.5 text-sm text-gray-500">
                                <Users size={14} className="text-gray-400" />
                                {s.ahead} People
                            </span>
                            <span className="flex items-center gap-1.5 text-sm text-gray-500">
                                <Clock size={14} className="text-gray-400" />
                                {formatWait(totalSecs)}
                            </span>
                        </div>
                    )}
                    {!s.open && (
                        <div className="flex items-center gap-5 ">
                            <p className="text-sm text-gray-400 font-medium">Currently closed</p>
                        </div>
                        
                    )}
                </div>
            </div>
        </button>
    )
}