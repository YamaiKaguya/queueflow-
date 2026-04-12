import { Users, Clock, MapPin, Info } from "lucide-react"
import { StatCard } from '../_components/_subcomponents/StatCard'

type Props = {
   peopleAhead: number
   estWaitMins: number
   queueStatus: string
}

export function StatsRow({ peopleAhead, estWaitMins, queueStatus }: Props) {
   return (
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

         <StatCard
            icon={<Users size={26} strokeWidth={1} className="text-blue-500" />}
            label="PEOPLE AHEAD"
            value={`${peopleAhead} USERS`}
         />

         <StatCard
            icon={<Clock size={26} strokeWidth={1} className="text-blue-500" />}
            label="EST. WAIT TIME"
            value={`${estWaitMins} MINS`}
         />

         <StatCard
            icon={<MapPin size={26} strokeWidth={1} className="text-blue-500" />}
            label="STATION"
            value="COUNTER"
         />

         <StatCard
            icon={<Info size={26} strokeWidth={1} className="text-blue-500" />}
            label="QUEUE STATUS"
            value={queueStatus.toUpperCase()}
         />

      </div>
   )
}