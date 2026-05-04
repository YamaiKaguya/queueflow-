import UserHeader from "@/src/components/header/UserHeader"

export default function UserLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className="min-h-screen antialiased flex flex-col">
         <UserHeader />
         {children}
      </div>
   )
}