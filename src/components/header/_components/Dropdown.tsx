'use client'
import { useRouter } from "next/navigation"
import { createClient } from "@/src/lib/supabase/client"
import { User, Settings, LogOut } from "lucide-react"
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

export default function UserDropdown({ user }: Props) {
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
            <div className="flex items-center gap-2">
               <button className="flex items-center gap-3 px-2 py-1 rounded-xl hover:bg-slate-100 transition cursor-pointer">
                  <div className="w-[45px] h-[45px] rounded-full border-2 border-gray-200 bg-blue-500 flex items-center justify-center text-white text-lg font-semibold flex-shrink-0">
                     {fullName?.[0]?.toUpperCase() ?? "?"}
                  </div>
                  <span className="text-lg font-medium">{fullName}</span>
               </button>
            </div>
         </DropdownMenuTrigger>
         <DropdownMenuContent
            align="end"
            className="w-64 p-2 rounded-2xl border border-gray-200 shadow-md"
         >
            {/* HEADER */}
            <div className="px-3 py-3 mb-1">
               <p className="font-semibold text-base text-gray-900">{fullName}</p>
               <p className="text-sm text-gray-400 truncate">{user?.email}</p>
            </div>
            <div className="border-t border-gray-100 mb-1" />

            {/* PROFILE */}
            <DropdownMenuItem
               className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-gray-700 hover:!bg-gray-100 hover:!text-gray-900 transition"
               onClick={() => router.push("/profile")}
            >
               <User size={18} className="text-gray-400" />
               <span className="text-sm font-medium">Profile</span>
            </DropdownMenuItem>

            {/* SETTINGS */}
            <DropdownMenuItem
               className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-gray-700 hover:!bg-gray-100 hover:!text-gray-900 transition"
               onClick={() => router.push("/settings")}
            >
               <Settings size={18} className="text-gray-400" />
               <span className="text-sm font-medium">Settings</span>
            </DropdownMenuItem>

            {/* LOGOUT */}
            <DropdownMenuItem
               className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-red-500 hover:!bg-red-50 hover:!text-red-600 transition"
               onClick={logout}
            >
               <LogOut size={18} />
               <span className="text-sm font-medium">Logout</span>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}