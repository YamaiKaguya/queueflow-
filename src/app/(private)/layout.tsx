import PrivateHeader from "@/src/components/header/PrivateHeader"

export default async function PrivateLayout({
children,
}: {
children: React.ReactNode
}) {
   return (
      <div className="min-h-screen antialiased flex flex-col">
         <PrivateHeader />
         {children}
      </div>
   )
}