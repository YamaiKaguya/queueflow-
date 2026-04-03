export function QueueSkeleton() {
  return (
    <div className="bg-[var(--primary-background)] p-20">
      <main className="w-[90vw] mx-auto">
        <header className="flex justify-between items-start mb-12">
          <div>
            <div className="h-12 w-72 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="h-4 w-96 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
        </header>
        <div className="flex gap-6 mb-10">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 flex-1 bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-[1fr_340px] gap-10">
          <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
          <div className="flex flex-col gap-10">
            <div className="h-32 bg-gray-200 rounded-xl animate-pulse" />
            <div className="h-32 bg-gray-200 rounded-xl animate-pulse" />
          </div>
        </div>
      </main>
    </div>
  )
}