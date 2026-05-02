export default function NoTicketLoading() {
   return (
      <div className="min-h-[calc(100vh-74px)] bg-[var(--primary-background)] flex items-center justify-center p-6">
         <div className="flex flex-col items-center justify-center gap-6">
            <div className="relative w-16 h-16">
               <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
               <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[var(--primary-color-dark)] animate-spin"></div>
            </div>
            
            <p className="text-lg text-gray-600 font-medium">Loading your data...</p>
         </div>
      </div>
   )
}
