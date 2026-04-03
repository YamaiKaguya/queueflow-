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

export function NewsFeed() {
   return (
      <div className="bg-white rounded-[16px] p-5 shadow-sm">
         <div className="flex items-center gap-2 mb-4">
         <Bell size={18} className="text-blue-500" />
         <p className="text-[12px] font-bold text-slate-700 tracking-wider m-0">
            LATEST NEWS
         </p>
         </div>

         {NEWS.map((item) => (
         <div key={item.title} className="mb-3.5 pb-3.5 border-b border-gray-200 last:border-b-0">
            <p className="text-[11px] font-semibold text-blue-500 mb-0.5">{item.time}</p>
            <p className="text-[13px] font-bold text-slate-900 mb-0.5">{item.title}</p>
            <p className="text-[12px] text-slate-500 leading-[1.5]">{item.body}</p>
         </div>
         ))}
      </div>
   )
}