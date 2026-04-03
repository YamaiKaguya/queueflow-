// src/components/header/dashboard-header.tsx
import { DashboardNav } from "@/src/components/header/_components/dashboardnav"
import { UserDropdown } from "@/src/components/header/_components/userdropdown"
import Logo from "@/src/components/logo"

export function DashboardHeader({ user }: { user: any }) {
return (
   <header className="
               flex items-center justify-between 
               px-8 py-2 
               bg-white 
               shadow-[0_4px_6px_-1px_rgba(114,114,114,0.10)]">
               <Logo />
      <DashboardNav />
      <UserDropdown user={user} />
   </header>
)
}