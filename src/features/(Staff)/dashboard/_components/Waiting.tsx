import React from "react"
import { User, AlertTriangle } from "lucide-react"
import { QueueRow } from "../_hooks/useStaff"

type Props = {
    waiting: QueueRow[]
}

export default function WaitingQueue({ waiting }: Props) {
    const priorityTickets = waiting.filter(t => t.priority)
    const regularTickets = waiting.filter(t => !t.priority)

    return (
        <section className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

                {/* HEADER */}
                <div className="flex items-end justify-between px-6 py-5 border-b border-gray-100">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Waiting Queue
                        </h2>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                            <span>
                                {waiting.length} ticket{waiting.length !== 1 ? "s" : ""}
                            </span>
                            {priorityTickets.length > 0 && (
                                <>
                                    <span className="h-3 w-px bg-gray-200" />
                                    <span className="text-blue-500 font-medium flex items-center gap-1">
                                        <AlertTriangle className="w-3 h-3" />
                                        {priorityTickets.length} priority
                                    </span>
                                </>
                            )}
                            <span className="h-3 w-px bg-gray-200" />
                            <span className="text-green-500 font-medium">Live updates</span>
                        </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
                        Active Queue
                    </div>
                </div>

                {/* TABLE HEADER */}
                <div className="grid grid-cols-12 px-6 py-3 bg-gray-50 text-[11px] uppercase tracking-widest text-gray-500">
                    <span className="col-span-2">Queue</span>
                    <span className="col-span-4">Patient</span>
                    <span className="col-span-3">Type</span>
                    <span className="col-span-3 text-right">Time</span>
                </div>

                {/* BODY */}
                <div className="divide-y divide-gray-100">
                    {waiting.length === 0 ? (
                        <div className="p-10 text-center">
                            <p className="text-sm font-medium text-gray-500">No tickets in queue</p>
                            <p className="text-xs text-gray-400 mt-1">Waiting list is currently empty</p>
                        </div>
                    ) : (
                        <>
                            {/* PRIORITY TICKETS */}
                            {priorityTickets.map((ticket) => (
                                <div
                                    key={ticket.id}
                                    className="grid grid-cols-12 px-6 py-4 items-center bg-blue-50 border-l-4 border-blue-400 hover:bg-blue-100/60 transition"
                                >
                                    {/* QUEUE NO */}
                                    <div className="col-span-2 font-bold text-blue-600 flex items-center gap-1.5">
                                        {ticket.ticket_no}
                                        <AlertTriangle className="w-3.5 h-3.5 text-blue-500" />
                                    </div>

                                    {/* PATIENT */}
                                    <div className="col-span-4 flex items-center gap-2 text-gray-900 font-medium">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <span className="truncate">{ticket.name ?? "Anonymous"}</span>
                                    </div>

                                    {/* TYPE */}
                                    <div className="col-span-3 flex items-center gap-2">
                                        <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                                            {ticket.type}
                                        </span>
                                        <span className="inline-flex px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-200 text-blue-800">
                                            Priority
                                        </span>
                                    </div>

                                    {/* TIME */}
                                    <div className="col-span-3 text-right text-sm text-gray-500">
                                        {new Date(ticket.created_at).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </div>
                                </div>
                            ))}

                            {/* PRIORITY DIVIDER */}
                            {priorityTickets.length > 0 && regularTickets.length > 0 && (
                                <div className="px-6 py-2 bg-gray-50 text-[11px] uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                    <span className="h-px flex-1 bg-gray-200" />
                                    <span>Regular</span>
                                    <span className="h-px flex-1 bg-gray-200" />
                                </div>
                            )}

                            {/* REGULAR TICKETS */}
                            {regularTickets.map((ticket) => (
                                <div
                                    key={ticket.id}
                                    className="grid grid-cols-12 px-6 py-4 items-center hover:bg-gray-50 transition"
                                >
                                    <div className="col-span-2 font-bold text-blue-600">
                                        {ticket.ticket_no}
                                    </div>
                                    <div className="col-span-4 flex items-center gap-2 text-gray-900 font-medium">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <span className="truncate">{ticket.name ?? "Anonymous"}</span>
                                    </div>
                                    <div className="col-span-3">
                                        <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                                            {ticket.type}
                                        </span>
                                    </div>
                                    <div className="col-span-3 text-right text-sm text-gray-500">
                                        {new Date(ticket.created_at).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}