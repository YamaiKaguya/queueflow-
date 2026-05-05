'use client'

import { useRegistration } from '../_hooks/useRegistration'

type Props = {
  selectedService: { id: string; label: string } | null
}

export default function RegistrationCard({ selectedService }: Props) {
  const {
    name, setName,
    priority, setPriority,
    loading,
    error,
    ticket,
    register,
    reset,
  } = useRegistration()

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {selectedService ? `${selectedService.label} Registration` : 'Registration'}
      </h3>

      {ticket ? (
        <div className="flex flex-col py-4 h-full justify-between">
          <div className="flex flex-col text-center space-y-3">
            <p className="text-sm text-gray-400">Ticket generated</p>
            <p className="text-4xl font-extrabold text-blue-500">{ticket.ticket_no}</p>
            <p className="text-sm text-gray-500">{ticket.service}</p>
          </div>
          <button
            onClick={reset}
            className="w-full border border-gray-200 text-gray-600 hover:bg-gray-50 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
          >
            New Registration
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <input
            placeholder="Enter Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={priority}
              onChange={(e) => setPriority(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 accent-blue-500 cursor-pointer"
            />
            Priority
          </label>

          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}

          <button
            onClick={() => register(selectedService?.id ?? '', selectedService?.label ?? '')}
            disabled={loading || !name || !selectedService}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
          >
            {loading
              ? 'Generating...'
              : `Generate ${selectedService?.label.charAt(0).toUpperCase() ?? '?'}-Number`
            }
          </button>
        </div>
      )}
    </div>
  )
}