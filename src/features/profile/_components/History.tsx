// components/VisitHistory.tsx
'use client'
import { History } from 'lucide-react'

type Status = 'Completed' | 'Canceled' | 'No-show' | 'Pending'

interface Visit {
    id: number
    department: string
    visitDate: string
    entryType: 'Online' | 'Walk-in'
    status: Status
}

const visits: Visit[] = [
    { id: 1, department: 'Dental',     visitDate: 'Mar 23, 2026', entryType: 'Online',  status: 'Completed' },
    { id: 2, department: 'X-Ray',      visitDate: 'Mar 23, 2026', entryType: 'Online',  status: 'Canceled'  },
    { id: 3, department: 'Laboratory', visitDate: 'Mar 23, 2026', entryType: 'Online',  status: 'No-show'   },
    { id: 4, department: 'Cardiology', visitDate: 'Feb 10, 2026', entryType: 'Walk-in', status: 'Completed' },
]

const statusConfig: Record<Status, { dot: string; text: string; bg: string }> = {
    Completed: { dot: 'bg-green-400',  text: 'text-green-600',  bg: 'bg-green-50'  },
    Canceled:  { dot: 'bg-red-400',    text: 'text-red-500',    bg: 'bg-red-50'    },
    'No-show': { dot: 'bg-yellow-400', text: 'text-yellow-600', bg: 'bg-yellow-50' },
    Pending:   { dot: 'bg-blue-400',   text: 'text-blue-500',   bg: 'bg-blue-50'   },
}

function StatusBadge({ status }: { status: Status }) {
    const cfg = statusConfig[status]
    return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${cfg.text} ${cfg.bg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {status}
        </span>
    )
}

export default function VisitHistory() {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2.5 px-6 py-5 border-b border-gray-100">
                <History size={15} className="text-blue-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700">
                    Recent Visit History
                </h3>
            </div>

            {/* Table */}
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-gray-100">
                        {['Department', 'Visit Date', 'Entry Type', 'Status'].map((col) => (
                            <th key={col} className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {visits.map((v, i) => (
                        <tr
                            key={v.id}
                            className={`hover:bg-gray-50 transition-colors ${i !== visits.length - 1 ? 'border-b border-gray-100' : ''}`}
                        >
                            <td className="px-6 py-4 font-bold text-gray-800 uppercase tracking-wide text-xs">
                                {v.department}
                            </td>
                            <td className="px-6 py-4 text-gray-500 text-xs">{v.visitDate}</td>
                            <td className="px-6 py-4">
                                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                                    v.entryType === 'Online'
                                        ? 'bg-blue-50 text-blue-500'
                                        : 'bg-gray-100 text-gray-500'
                                }`}>
                                    {v.entryType}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <StatusBadge status={v.status} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Footer */}
            <div className="px-6 py-3.5 border-t border-gray-100">
                <p className="text-xs text-gray-400">{visits.length} records found</p>
            </div>
        </div>
    )
}