'use client'
import { useRouter } from "next/navigation"
import { CheckCircle2, LayoutDashboard } from "lucide-react"

type Props = {
    ticket_no: number
    service: string
    position: number
}

export function TicketConfirmed({ ticket_no, service, position }: Props) {
    const router = useRouter()
    const prefix = service.charAt(0).toUpperCase()
    const formatted = `${prefix} – ${String(ticket_no).padStart(3, '0')}`

    return (
        <main className="flex-1 flex items-center justify-center bg-gray-50 py-12">
            <div className="bg-white rounded-[24px] shadow-sm w-full max-w-md overflow-hidden">

                {/* HEADER */}
                <div className="bg-blue-500 px-10 py-10 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 size={28} className="text-white" />
                    </div>
                    <p className="text-xs font-bold text-blue-100 tracking-widest uppercase mb-1">
                        Ticket Confirmed
                    </p>
                    <p className="text-5xl font-extrabold text-white tracking-tight mt-3">
                        {formatted}
                    </p>
                    <p className="text-sm text-blue-200 mt-2">{service}</p>
                </div>

                {/* DETAILS */}
                <div className="px-8 py-7 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 rounded-2xl px-5 py-4 text-center">
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Position</p>
                            <p className="text-2xl font-extrabold text-slate-800 mt-1">#{position}</p>
                        </div>
                        <div className="bg-blue-50 rounded-2xl px-5 py-4 text-center">
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Department</p>
                            <p className="text-sm font-bold text-blue-600 mt-1 truncate">{service}</p>
                        </div>
                    </div>

                    <p className="text-xs text-center text-gray-400">
                        Please stay nearby. You will be called when it&apos;s your turn.
                    </p>

                    <button
                        onClick={() => router.push("/dashboard")}
                        className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3.5 rounded-xl transition-all cursor-pointer"
                    >
                        <LayoutDashboard size={17} />
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </main>
    )
}