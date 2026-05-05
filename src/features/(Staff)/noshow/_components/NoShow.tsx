'use client'

import { useState } from 'react'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'

type NoShowTicket = {
  id: string
  ticket_no: number
  name: string
  service: string | null
  type: 'Online' | 'WalkIn'
  called_at: string | null
}

type Service = {
  id: string
  label: string
}

type Props = {
  tickets: NoShowTicket[]
  services: Service[]
  selectedId: string | null
}

const ROWS_PER_PAGE = 10

export function NoShowPanel({
  tickets,
  services,
  selectedId,
}: Props) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const selectedService = services.find((s) => s.id === selectedId) ?? null

  const filtered = tickets.filter((t) => {
    const matchesService = selectedService
      ? t.service?.toLowerCase().trim() === selectedService.label.toLowerCase().trim()
      : false
    const matchesQuery = query.trim()
      ? t.name.toLowerCase().includes(query.toLowerCase()) ||
        String(t.ticket_no).includes(query)
      : true
    return matchesService && matchesQuery
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE))
  const paginated = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE)

  const formatTicketNo = (t: NoShowTicket) => {
    const prefix = t.service ? t.service.charAt(0).toUpperCase() : '?'
    return `${prefix}-${String(t.ticket_no).padStart(3, '0')}`
  }

  const formatTime = (called_at: string | null) => {
    if (!called_at) return '—'
    return new Date(called_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex-1 flex flex-col gap-6">

      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div className='p-5'>
          <h1 className="text-3xl font-bold text-gray-900">
            {selectedService ? `${selectedService.label} Department` : 'All Departments'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor and manage patients who missed their call times
          </p>
        </div>

        {/* STAT CARD */}
        <div className="flex gap-3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-4 text-center min-w-[130px]">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              No-Show Count
            </p>
            <p className="text-4xl font-bold text-blue-500">{filtered.length}</p>
          </div>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">

        {/* SEARCH */}
        <div className="flex justify-end px-6 py-4 border-b border-gray-100">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1) }}
              placeholder="Search"
              className="pl-8 pr-4 py-1.5 text-sm border border-gray-200 rounded-full outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100 transition-all w-48"
            />
          </div>
        </div>

        {/* TABLE */}
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {['Number', 'Patient Name', 'Department', 'Entry Type', 'Time Called'].map((h) => (
                <th
                  key={h}
                  className="text-left px-6 py-3.5 text-xs font-bold text-blue-500 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-16 text-sm text-gray-300">
                  {selectedService ? 'No no-show records found' : 'Select a department to view no-show records'}
                </td>
              </tr>
            ) : (
              paginated.map((t, i) => (
                <tr
                  key={t.id}
                  className={`border-b border-gray-100 transition-colors hover:bg-gray-50/60 ${
                    i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                  }`}
                >
                  <td className="px-6 py-4 text-sm text-gray-600">{formatTicketNo(t)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{t.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 uppercase">{t.service ?? '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 uppercase">{t.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{formatTime(t.called_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-100">
          <button
            title="previous"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:border-blue-300 hover:text-blue-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={14} />
          </button>
          <span className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-500 text-white text-xs font-bold">
            {page}
          </span>
          <button
            title="next"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:border-blue-300 hover:text-blue-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}