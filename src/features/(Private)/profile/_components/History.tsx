'use client'

import { LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react'
import { useQueueHistory } from '../_hooks/useHistory'
import type { QueueHistory } from '../_hooks/useHistory'

// ── STATUS STYLE ─────────────────
type Status = QueueHistory['status']

const statusDot: Record<Status, string> = {
    Completed: 'bg-green-500',
    Canceled: 'bg-red-500',
    'No-show': 'bg-yellow-500',
    Pending: 'bg-blue-500',
}

const statusText: Record<Status, string> = {
    Completed: 'text-green-600',
    Canceled: 'text-red-500',
    'No-show': 'text-yellow-600',
    Pending: 'text-blue-500',
}

type PaginationProps = {
    page: number
    pageLoading: boolean
    hasMore: boolean
    nextPage: () => void
    prevPage: () => void
}

// ── SKELETON ─────────────────
function SkeletonRow() {
    return (
        <tr className="animate-pulse">
            <td className="py-5 px-6"><div className="h-4 w-24 bg-gray-200 rounded" /></td>
            <td className="py-5 px-6"><div className="h-4 w-20 bg-gray-200 rounded" /></td>
            <td className="py-5 px-6"><div className="h-4 w-16 bg-gray-200 rounded" /></td>
            <td className="py-5 px-6"><div className="h-4 w-20 bg-gray-200 rounded" /></td>
        </tr>
    )
}

// ── STATUS BADGE ─────────────────
function StatusBadge({ status }: { status: Status }) {
    return (
        <span className={`flex items-center gap-1.5 font-medium text-sm uppercase ${statusText[status]}`}>
            <span className={`w-2 h-2 rounded-full shrink-0 ${statusDot[status]}`} />
            {status}
        </span>
    )
}

// ── VISIT ROW ─────────────────
function VisitRow({ visit }: { visit: QueueHistory }) {
    return (
        <tr className="border-t border-gray-100">
            <td className="py-5 px-6 text-base text-gray-700">{visit.service}</td>
            <td className="py-5 px-6 text-base text-gray-700">
                {new Date(visit.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                })}
            </td>
            <td className="py-5 px-6 text-base text-gray-700 uppercase">{visit.type}</td>
            <td className="py-5 px-6"><StatusBadge status={visit.status} /></td>
        </tr>
    )
}

// ── PAGINATION ─────────────────
function Pagination({ page, pageLoading, hasMore, nextPage, prevPage }: PaginationProps) {
    return (
        <div className="flex items-center justify-center pt-5 border-t border-gray-100">
            <div className="flex items-center gap-10">
                <button
                    onClick={prevPage}
                    disabled={page === 0 || pageLoading}
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 
                    px-4 py-2 rounded-xl border border-gray-200
                    hover:bg-gray-50 active:scale-95 transition
                    disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                    <ChevronLeft size={16} />
                    Previous
                </button>

                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Page</span>
                    <span className="px-3 py-1 rounded-lg bg-gray-100 text-sm font-semibold text-gray-700">
                        {page + 1}
                    </span>
                </div>

                <button
                    onClick={nextPage}
                    disabled={!hasMore || pageLoading}
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 
                    px-4 py-2 rounded-xl border border-gray-200
                    hover:bg-gray-50 active:scale-95 transition
                    disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                    Next
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    )
}

// ── MAIN ─────────────────
export default function VisitHistory() {
    const {
        data: visits,
        loading,
        pageLoading,
        error,
        page,
        hasMore,
        nextPage,
        prevPage,
    } = useQueueHistory()

    const showSkeleton = loading || pageLoading

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6">

            {/* HEADER */}
            <div className="flex items-center gap-2 mb-5">
                <div className="p-1.5 bg-blue-50 rounded-lg">
                    <LayoutGrid size={18} className="text-blue-500" />
                </div>
                <h3 className="text-base font-semibold text-gray-800">Recent Visit History</h3>
            </div>

            {/* TABLE */}
            <div className="w-full overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-left text-xs font-semibold text-blue-400 uppercase tracking-wide px-6 pb-4">Department</th>
                            <th className="text-left text-xs font-semibold text-blue-400 uppercase tracking-wide px-6 pb-4">Visit Date</th>
                            <th className="text-left text-xs font-semibold text-blue-400 uppercase tracking-wide px-6 pb-4">Entry Type</th>
                            <th className="text-left text-xs font-semibold text-blue-400 uppercase tracking-wide px-6 pb-4">Status</th>
                        </tr>
                        <tr><td colSpan={4}><div className="border-t-2 border-blue-400 mb-1" /></td></tr>
                    </thead>
                    <tbody>
                        {error ? (
                            <tr><td colSpan={4} className="text-sm text-red-500 py-4 px-6">{error}</td></tr>
                        ) : showSkeleton ? (
                            Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                        ) : visits.length === 0 ? (
                            <tr><td colSpan={4} className="text-sm text-gray-400 text-center py-10">No records found</td></tr>
                        ) : (
                            visits.map((v) => <VisitRow key={v.ticket_no} visit={v} />)
                        )}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION */}
            <Pagination
                page={page}
                pageLoading={pageLoading}
                hasMore={hasMore}
                nextPage={nextPage}
                prevPage={prevPage}
            />
        </div>
    )
}