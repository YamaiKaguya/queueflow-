import { HelpCircle } from "lucide-react"

export function HelpCard() {
   return (
      <div className="bg-blue-400 border border-blue-300 rounded-[16px] p-7 text-white">
         <div className="flex items-center gap-2 mb-4">
            <HelpCircle size={20} strokeWidth={2} className="text-white"/>
            <p className="text-[12px] font-bold text-white tracking-wider">
                  NEED ASSISTANCE?
            </p>
         </div>

         <p className="text-sm mb-4">
               Having trouble with your queue number? Reach out to the front desk.
         </p>

         <button className="w-full bg-white text-blue-500 rounded-[10px] py-2.5 text-[14px] font-semibold cursor-pointer border-none">
               Speak with staff
         </button>
      </div>
   )
}