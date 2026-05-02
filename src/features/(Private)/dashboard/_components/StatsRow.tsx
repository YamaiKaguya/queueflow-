import { Users, Clock, MapPin, Info } from "lucide-react"
import { ReactNode } from "react"

type Props = {
    peopleAhead: number | null
    estWaitSecs: number | null
    queueStatus: string | null
    currentlyServing: number | null
    userTicketNo: number | null
    loading?: boolean
}

type StatCardProps = {
    icon: ReactNode
    label: string
    value: string
    loading?: boolean
    color?: string
}

export function StatCard({
    icon,
    label,
    value,
    loading,
    color = "text-blue-500"
}: StatCardProps) {
    return (
        <div className="bg-white rounded-xl p-5 shadow-sm flex items-center gap-4 border border-gray-100">
            <div className={`shrink-0 ${color}`}>
                {icon}
            </div>

            <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase truncate">
                    {label}
                </p>

                {loading ? (
                    <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mt-1.5" />
                ) : (
                    <p className="text-base font-bold text-slate-800 mt-0.5 truncate">
                        {value}
                    </p>
                )}
            </div>
        </div>
    )
}

function formatWaitTime(
    secs: number | null,
    peopleAhead: number | null,
    hasTicket: boolean
): string {
    if (!hasTicket || secs === null || peopleAhead === null) return "N/A"

    // If no one ahead (including person being served), wait time is 0
    if (peopleAhead === 0) return "0 Min"

    // secs is already calculated in the hook, don't multiply again
    if (secs < 60) return `${secs} Secs`

    const mins = Math.ceil(secs / 60)
    return `${mins} ${mins === 1 ? "Min" : "Mins"}`
}

function getStatusColor(status: string | null): string {
    if (!status) return "text-gray-400"
    if (status === "Moving Fast") return "text-green-500"
    if (status === "Moderate") return "text-yellow-500"
    return "text-red-500"
}

export function StatsRow({
    peopleAhead,
    estWaitSecs,
    queueStatus,
    currentlyServing,
    userTicketNo,
    loading
}: Props) {
    // Check if user has a ticket
    const hasTicket =
        peopleAhead !== null &&
        estWaitSecs !== null &&
        queueStatus !== null

    // Check if current user is being served
    const isUserBeingServed = currentlyServing === userTicketNo && userTicketNo !== null

    // Adjust peopleAhead and estWaitSecs display if user is being served
    const displayPeopleAhead = isUserBeingServed ? 0 : peopleAhead
    const displayEstWaitSecs = isUserBeingServed ? 0 : estWaitSecs

    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

            <StatCard
                icon={<Users size={22} strokeWidth={1.5} />}
                label="People Ahead"
                value={
                    hasTicket
                        ? `${displayPeopleAhead} ${displayPeopleAhead === 1 ? "Person" : "People"}`
                        : "N/A"
                }
                loading={loading}
                color="text-blue-500"
            />

            <StatCard
                icon={<Clock size={22} strokeWidth={1.5} />}
                label="Est. Wait Time"
                value={formatWaitTime(displayEstWaitSecs, displayPeopleAhead, hasTicket)}
                loading={loading}
                color="text-purple-500"
            />

            <StatCard
                icon={<MapPin size={22} strokeWidth={1.5} />}
                label="Station"
                value={hasTicket ? "Counter" : "N/A"}
                loading={loading}
                color="text-orange-500"
            />

            <StatCard
                icon={<Info size={22} strokeWidth={1.5} />}
                label="Queue Status"
                value={hasTicket ? queueStatus! : "N/A"}
                loading={loading}
                color={hasTicket ? getStatusColor(queueStatus) : "text-gray-400"}
            />

        </div>
    )
}