type Props = {
   service: Service
   isSelected: boolean
   onSelect: (id: string) => void
}

type Service = {
   id: string
   label: string
   average: number
   open: boolean
   ahead: number
}

function getCongestion(ahead: number) {
   if (ahead <= 5) return { level: 'LOW', label: 'LOW', bg: 'bg-green-100', text: 'text-green-700' }
   if (ahead <= 12)  return { level: 'MEDIUM', label: 'MED', bg: 'bg-yellow-100', text: 'text-yellow-700' }
                     return { level: 'HIGH', label: 'HIGH', bg: 'bg-red-100', text: 'text-red-700' }
}

export function ServiceCard({ service: s, isSelected, onSelect }: Props) {
   const cong = getCongestion(s.ahead)
   const isDisabled = !s.open

   return (
      <button
         onClick={() => !isDisabled && onSelect(s.id)}
         disabled={isDisabled}
         className={`p-5 rounded-2xl h-fit border transition-all text-left w-full cursor-pointer
         ${isDisabled
            ? 'opacity-50 bg-gray-100 cursor-not-allowed'
            : isSelected
               ? 'border-blue-300 bg-blue-50 shadow-sm'
               : 'bg-white border-gray-200 hover:border-blue-300'
         }`}
      >
         <div className="flex justify-between items-start mb-3">
         <h3 className="font-semibold text-gray-800 text-base">{s.label.toUpperCase()}</h3>
         {!isDisabled && (
            <div className="flex items-center gap-1">
               <span
               className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${cong.bg} ${cong.text}`}
               >
               {cong.label}
               </span>
            </div>
         )}
         </div>


         {s.open && (
            <div className="text-sm text-gray-700 space-y-1">
               <p>
                  Status: 
               <span>
                  {s.open ? ' Open ' : ' Closed '}
               </span>
               </p>
               <p>
                  Wait Time: 
                  <span>
                     {s.ahead && s.average ? ` ${s.ahead * Number(s.average)} mins` : ' N/A '}
                  </span>
               </p>
               <p>
                  People: <span>{s.ahead}</span>
               </p>
            </div>
         )}
      </button>
   )
}