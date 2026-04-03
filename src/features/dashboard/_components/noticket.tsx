import { LiveBadge } from '@/src/features/dashboard/_components/_barrel/barrel'
import { useRouter } from 'next/navigation'

export function NoTicket() {
  const router = useRouter()
  return (
    <div className="bg-[var(--primary-background)] p-20">
      <main className="w-[90vw] mx-auto">
        <header className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-5xl font-bold">Virtual Queue</h1>
            <p className="text-base mt-4">Reserve and track your spot in line, hassle-free.</p>
          </div>
          <LiveBadge />
        </header>
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <p className="text-xl text-gray-500">You have no active ticket.</p>
          <button
            onClick={() => router.push('/joinqueue')}
            className="px-6 py-3 bg-[var(--primary-color-dark)] text-white rounded-lg font-medium hover:opacity-90 transition"
          >
            Join the Queue
          </button>
        </div>
      </main>
    </div>
  )
}