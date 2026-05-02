import { QueueProvider } from '@/src/features/(Staff)/dashboard/_context/QueueContext'
import PrivateHeader from "@/src/components/header/PrivateHeader"

export default async function PrivateLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <div className="min-h-screen antialiased flex flex-col">
         <PrivateHeader />
         <QueueProvider>
            {children}
         </QueueProvider>
      </div>
   )
}