import { HelpCircle } from "lucide-react"

export function HelpCard() {
   return (
      <div className="bg-blue-500 rounded-[16px] p-5 text-white">
         <div className="flex gap-2">
            <HelpCircle size={20} className="mb-2.5" />
            <p className="text-[15px] font-bold mb-1.5">
                  Need assistance?
            </p>
         </div>

         <p className="text-[13px] opacity-85 leading-[1.5] mb-4">
               Having trouble with your queue number? Reach out to the front desk.
         </p>

         <button className="w-full bg-white text-blue-500 rounded-[10px] py-2.5 text-[14px] font-semibold cursor-pointer border-none">
               Speak with staff
         </button>
      </div>
   )
}