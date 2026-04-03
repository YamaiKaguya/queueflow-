import { Users, Clock, MapPin, Info } from "lucide-react"

type Props = {
   peopleAhead: number
   estWaitMins: number
   queueStatus: string
}

export function StatsRow({ peopleAhead, estWaitMins, queueStatus }: Props) {
   const stats = [
      { icon: <Users size={26} className="text-blue-500" />, label: 'PEOPLE AHEAD',  value: `${peopleAhead} USERS` },
      { icon: <Clock size={26} className="text-blue-500" />, label: 'EST. WAIT TIME', value: `${estWaitMins} MINS` },
      { icon: <MapPin size={26} className="text-blue-500" />, label: 'STATION',       value: 'COUNTER' },
      { icon: <Info size={26} className="text-blue-500" />, label: 'QUEUE STATUS',  value: queueStatus.toUpperCase() },
   ]

   return (
      <div className="mb-6 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
         {stats.map((item) => (
               <div
                  key={item.label}
                  className="bg-white rounded-[14px] p-4 flex items-center gap-3 shadow-sm"
               >
                  <span>{item.icon}</span>
                  <div>
                     <p className="text-base font-semibold tracking-wider text-blue-500 m-0">
                           {item.label}
                     </p>
                     <p className="text-[13px] font-bold text-slate-900 mt-1">
                           {item.value}
                     </p>
                  </div>
               </div>
         ))}
      </div>
   )
}