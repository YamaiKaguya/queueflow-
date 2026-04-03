// src/components/header/public-header.tsx
'use client'

import { useRouter } from "next/navigation"
import { createClient } from "@/src/lib/supabase/client"
import { Button } from "@/src/components/ui/button"
import { useEffect, useState } from "react"
import Logo from "../logo"

type User = {
email?: string
id?: string
} | null

export function PublicHeader() {
const router = useRouter()
const supabase = createClient()
const [user, setUser] = useState<User>(null)

useEffect(() => {
   supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ? { email: data.user.email, id: data.user.id } : null)
   })
}, [supabase])

const logout = async () => {
   await supabase.auth.signOut()
   router.refresh()
}

   return (
      <header className="
         h-18
         flex items-center justify-between 
         px-8 py-2 
         bg-white 
         shadow-[0_4px_6px_-1px_rgba(114,114,114,0.10)]">
         <Logo />

         {user ? (
         <div className="flex gap-3 align-center justify-center">
            <Button variant="buttonlink" onClick={() => router.push("/dashboard")}>
               Dashboard
            </Button>
            <button
            
               onClick={logout}
               className="bg-[var(--primary-color)] text-white text-[18px]
               hover:bg-slate-200 text-sm px-4 py-2 rounded-xl"
            >
               Logout
            </button>
         </div>
         ) : (
         <div className="flex gap-2">
            <Button variant="buttonlink" 
            onClick={() => router.push("/auth/login")}>
               Sign In
            </Button>
            <Button onClick={() => router.push("/auth/sign-up")}>
               Sign Up
            </Button>
         </div>
         )}
      </header>
   )
}