import { Bell } from "lucide-react"

type NewsItem = {
   time: string
   title: string
   body: string
}

const NEWS: NewsItem[] = [
   { time: 'Today, 09:59PM',  title: 'Facility Maintenance', body: 'Scheduled maintenance this weekend. Some services may be unavailable.' },
   { time: 'Yesterday',       title: 'New Service Added',    body: 'Online appointment booking is now available for all counters.' },
]

export function LatestNews() {
   return (
      <div className="bg-white rounded-[16px] p-7 shadow-sm flex flex-col gap-3">
         <div className="flex items-center gap-2 mb-1">
            <Bell size={18}  strokeWidth={2} className="text-blue-500" />
            <p className="text-[12px] font-bold text-slate-700 tracking-wider">LATEST NEWS</p>
         </div>

         {NEWS.map((item) => (
         <div key={item.title} className="border-b border-gray-200 last:border-b-0 pb-3 last:pb-0">
            <p className="text-sm  text-blue-500 mb-1.5">{item.time}</p>
            <p className="text-sm font-medium text-slate-800">{item.title}</p>
            <p className="text-sm font-medium text-slate-400">{item.body}</p>
         </div>
         ))}
      </div>
   )
}