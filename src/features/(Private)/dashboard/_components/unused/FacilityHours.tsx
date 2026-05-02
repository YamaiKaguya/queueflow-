import { Calendar } from "lucide-react"

const HOURS = [
   { day: 'MON - FRI', hours: '08:00 - 20:00', closed: false },
   { day: 'SATURDAY',  hours: '08:00 - 15:00', closed: false },
   { day: 'SUNDAY',    hours: 'CLOSED',         closed: true  },
]

export function FacilityHours() {
   return (
      <div className="bg-white rounded-[16px] p-7 shadow-sm">
         <div className="flex items-center gap-2 mb-4">
            <Calendar size={18} className="text-blue-500" />
            <p className="text-[12px] font-bold text-slate-700 tracking-wider">
               FACILITY HOURS
            </p>
         </div>

         {HOURS.map((h) => (
            <div key={h.day} className="flex justify-between items-center border-b border-gray-200 last:border-b-0 py-3 last:pb-0">
               <span className="text-[12px] font-medium text-slate-500">{h.day}</span>
               <span className={h.closed ? "text-[12px] font-bold text-red-500" : "text-[12px] font-semibold text-slate-700"}>
                     {h.hours}
               </span>
            </div>
         ))}
      </div>
   )
}