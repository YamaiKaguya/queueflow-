import { QueueRow, TicketStatus } from "../_hooks/useStaff"
import { Play } from "lucide-react"

type Props = {
    filteredServing: QueueRow[]
    filteredWaiting: QueueRow[]
    filteredHasNext: boolean
    actionLoading: string | null
    callNext: () => void
    updateStatus: (id: string, status: TicketStatus) => Promise<void>
    hasServing: boolean
}

export default function ServingPanel({
    filteredServing,
    filteredHasNext,
    actionLoading,
    callNext,
    updateStatus,
    hasServing
}: Props) {
    const current = filteredServing[0]
    const isLoading = actionLoading !== null
    const isBlocked = !filteredHasNext || isLoading || hasServing

    return (
        <section className="space-y-6">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* !CURRENTLY SERVING CARD */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex justify-between">
                    <div className="flex flex-col justify-between w-full">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                CURRENTLY SERVING
                            </h2>
                            <div className="text-6xl font-extrabold text-blue-500 mt-2 tracking-tight">
                                {current?.ticket_no ?? "—"}
                            </div>

                            {/* <p className="text-sm text-gray-500 mt-2">
                                PATIENT: {current?.patient_name ?? "No patient"}
                            </p> */}
                        </div>

                        {/* ACTIONS */}
                        <div className="flex justify-between items-center w-full">
                            <button
                                onClick={callNext}
                                disabled={isBlocked}
                                className={`
                                    flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition 
                                    ${
                                        isBlocked
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            : "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                                    }
                                `}
                            >
                                <Play size={16} />
                                {hasServing
                                    ? "PATIENT IN SERVICE"
                                    : isLoading
                                        ? "Calling..."
                                        : filteredHasNext
                                            ? "CALL NEXT PATIENT"
                                            : "NO MORE PATIENTS"}
                            </button>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => current?.id && updateStatus(current.id, "done")}
                                    disabled={isLoading || !current}
                                    className="px-3 py-2 rounded-xl text-sm font-semibold text-white bg-green-500 hover:bg-green-600 disabled:opacity-40 transition cursor-pointer"
                                >
                                    Done
                                </button>

                                <button
                                    onClick={() => current?.id && updateStatus(current.id, "skipped")}
                                    disabled={isLoading || !current}
                                    className="px-3 py-2 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 transition cursor-pointer"
                                >
                                    Skip
                                </button>

                                <button
                                    onClick={() => current?.id && updateStatus(current.id, "no-show")}
                                    disabled={isLoading || !current}
                                    className="px-3 py-2 rounded-xl text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-40 transition cursor-pointer"
                                >
                                    No-show
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* QUEUE CARD */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Dental Registration
                    </h3>

                    <div className="space-y-3">
                        <input
                            placeholder="Enter Full Name"
                            className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <input
                            placeholder="Enter Email Address"
                            className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <label className="flex items-center gap-2 text-sm text-gray-600">
                            <input type="checkbox" />
                            Priority
                        </label>

                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl text-sm font-semibold">
                            Generate D-Number
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}