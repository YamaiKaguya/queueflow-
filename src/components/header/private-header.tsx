// src/components/header/dashboard-header.tsx
import { createClient } from "@/src/lib/supabase/server"
import { DashboardNav } from "@/src/components/header/_components/dashboardnav"
import { UserDropdown } from "@/src/components/header/_components/userdropdown"
import Logo from "@/src/components/logo"
import Notification from "@/src/components/header/_components/notification"

export async function DashboardHeader() {
   const supabase = await createClient()
   const { data } = await supabase.auth.getUser()

   return (
      <header className="
                  flex items-center justify-between 
                  px-8 py-2 
                  bg-white 
                  shadow-[0_4px_6px_-1px_rgba(114,114,114,0.10)]">
         <div className="flex items-center gap-6">
            <Logo />
            <DashboardNav />
         </div>
         <div className="flex items-center gap-4">
            <Notification />
            <UserDropdown user={data.user} />
         </div>
      </header>
   )
}