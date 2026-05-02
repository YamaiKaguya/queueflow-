import { Clock, Users, Zap, Accessibility, Mail, User } from "lucide-react"

type Service = {
    label: string
    open: boolean
    ahead: number
    average: number  // in seconds
}

type Props = {
    selected: Service | undefined
    name: string
    onNameChange: (v: string) => void
    email: string
    onEmailChange: (v: string) => void
    priority: boolean
    onPriorityChange: (v: boolean) => void
    onJoin: () => void
    loading: boolean
    error: string | null
}

function formatWait(totalSecs: number): string {
    if (totalSecs === 0) return '0s'
    if (totalSecs < 60) return `${totalSecs}s`
    const mins = Math.ceil(totalSecs / 60)
    return `${mins}m`
}

function formatAvg(secs: number): string {
    if (secs < 60) return `${secs}s`
    const mins = Math.ceil(secs / 60)
    return `${mins}m`
}

export function DetailsPanel({
    selected, name, onNameChange, email, onEmailChange,
    priority, onPriorityChange, onJoin, loading, error
}: Props) {

    if (!selected) {
        return (
            <div className="h-full bg-white rounded-2xl shadow-sm flex flex-col items-center justify-center py-16 px-6 text-center border border-dashed border-gray-200">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
                    <Users size={22} className="text-gray-400" />
                </div>
                <p className="text-sm font-semibold text-gray-500">No department selected</p>
                <p className="text-xs text-gray-400 mt-1">Pick a service from the list to get started</p>
            </div>
        )
    }

    const etaSecs = selected.ahead * selected.average

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                if (!name.trim() || !email.trim()) return
                onJoin()
            }}
            className="bg-white rounded-xl shadow-sm flex flex-col overflow-hidden"
        >
            {/* HEADER */}
            <div className="bg-blue-500 px-6 py-6">
                <p className="text-xs font-bold text-blue-100 tracking-widest uppercase mb-1">
                    Department
                </p>
                <h3 className="text-lg font-extrabold text-white">
                    {selected.label.toUpperCase()}
                </h3>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-3 px-6 py-5">
                <div className="bg-gray-50 rounded-xl py-3 text-center">
                    <div className="flex items-center justify-center mb-1">
                        <Users size={13} className="text-gray-400" />
                    </div>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Queue</p>
                    <p className="text-base font-extrabold text-slate-800 mt-0.5">{selected.ahead}</p>
                </div>
                <div className="bg-blue-50 rounded-xl py-3 text-center">
                    <div className="flex items-center justify-center mb-1">
                        <Clock size={13} className="text-blue-400" />
                    </div>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">ETA</p>
                    <p className="text-base font-extrabold text-blue-600 mt-0.5">
                        {selected.ahead === 0 ? 'Now' : formatWait(etaSecs)}
                    </p>
                </div>
                <div className="bg-gray-50 rounded-xl py-3 text-center">
                    <div className="flex items-center justify-center mb-1">
                        <Zap size={13} className="text-gray-400" />
                    </div>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Avg</p>
                    <p className="text-base font-extrabold text-slate-800 mt-0.5">
                        {formatAvg(selected.average)}
                    </p>
                </div>
            </div>

            {/* INPUTS */}
            <div className="px-6 space-y-3">
                <div className="relative">
                    <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Nickname"
                        value={name}
                        onChange={(e) => onNameChange(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-1 focus:ring-blue-300 focus:outline-none"
                    />
                </div>
                <div className="relative">
                    <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="email"
                        placeholder="Email Address"
                        pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$"
                        value={email}
                        onChange={(e) => onEmailChange(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-1 focus:ring-blue-300 focus:outline-none"
                    />
                </div>
            </div>

            {/* PRIORITY */}
            <div className="px-6 mt-4">
                <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                    priority ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'
                }`}>
                    <input
                        id="priority"
                        type="checkbox"
                        checked={priority}
                        onChange={(e) => onPriorityChange(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-gray-300 cursor-pointer accent-blue-500"
                    />
                    <div>
                        <div className="flex items-center gap-1.5">
                            <Accessibility size={14} className="text-blue-500" />
                            <p className="text-sm font-semibold text-gray-700">Request Priority</p>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                            For elderly, pregnant, or persons with disabilities
                        </p>
                    </div>
                </label>
            </div>

            {/* ACTION */}
            <div className="px-6 py-5 mt-auto space-y-3">
                {error && <p className="text-xs text-red-500">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3.5 rounded-xl text-sm font-bold disabled:opacity-40 cursor-pointer transition-colors"
                >
                    {loading ? 'Joining...' : 'Join Queue'}
                </button>
            </div>
        </form>
    )
}