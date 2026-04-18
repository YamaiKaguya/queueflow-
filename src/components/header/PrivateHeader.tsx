
import { createClient } from "@/src/lib/supabase/server"

import { 
   DashboardNav, 
   UserDropdown, 
   Notification 
} from "@/src/components/header/_components/index"

import Logo from "@/src/components/logo"

export default async function PrivateHeader() {
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