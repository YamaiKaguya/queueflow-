'use client'

import { useRouter } from "next/navigation"
import { createClient } from "@/src/lib/supabase/client"

import { 
Bell,
UserCircle,
User,
Settings,
LogOut
} from "lucide-react"

import {
DropdownMenu,
DropdownMenuTrigger,
DropdownMenuContent,
DropdownMenuItem,
} from "@/src/components/ui/dropdown-menu"

type Claims = {
   email?: string
   sub?: string
} | null

type Props = {
   user: Claims
}

export function UserDropdown({ user }: Props) {
const router = useRouter()
const supabase = createClient()

const logout = async () => {
   await supabase.auth.signOut()
   router.refresh()
}

const fullName = user?.email?.split("@")[0]

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
               <button
                  title="bell"
                  className="relative p-2 rounded-xl hover:bg-slate-100"
               >
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
               </button>
               <button className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100">
                  <UserCircle size={20} />
                  <span className="text-sm font-medium">
                     {fullName}
                  </span>
               </button>
            </div>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
            <div className="px-3 py-2">
               <p className="text-sm font-semibold">{fullName}</p>
               <p className="text-xs text-gray-400">{user?.email}</p>
            </div>

            <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
               <User size={14} />
               Profile
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
               <Settings size={14} />
               Settings
            </DropdownMenuItem>

            <DropdownMenuItem onClick={logout} className="text-red-500">
               <LogOut size={14} />
               Logout
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}