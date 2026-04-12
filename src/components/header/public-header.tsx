'use client'

import { useRouter } from "next/navigation"
import { createClient } from "@/src/lib/supabase/client"
import { Button } from "@/src/components/ui/button"
import { useEffect, useState } from "react"
import Logo from "../logo"

import type { AuthChangeEvent, Session } from '@supabase/supabase-js'

type User = {
   email?: string
   id?: string
} | null

export function PublicHeader() {
   const router = useRouter()
   const supabase = createClient()
   const [user, setUser] = useState<User>(null)

      useEffect(() => {
         const loadUser = async () => {
            const { data } = await supabase.auth.getUser()
            const user = data.user

            setUser(user ? { email: user.email, id: user.id } : null)
         }

         loadUser()

         const { data: listener } = supabase.auth.onAuthStateChange(
            (event: AuthChangeEvent, session: Session | null) => {
               if (session?.user) {
                  setUser({ email: session.user.email, id: session.user.id })
               } else {
                  setUser(null)
               }
            }
         )

         return () => listener.subscription.unsubscribe()
      }, [supabase])

   const logout = async () => {
      await supabase.auth.signOut()
      // No need to refresh, listener will update state automatically
   }

   return (
      <header className="
         h-18
         flex items-center justify-between 
         px-8
         bg-white 
         shadow-[0_4px_6px_-1px_rgba(114,114,114,0.10)]
      ">
         <Logo />
         {user ? (
         <div className="flex gap-3 items-center justify-center">
            <Button variant="buttonlink" onClick={() => router.push("/dashboard")}>
               Dashboard
            </Button>
            <button
               onClick={logout}
               className="
               bg-[var(--primary-color)] text-white text-[18px]
               hover:bg-[var(--primary-color-dark)] text-sm px-4 py-2 rounded-xl cursor-pointer
               "
            >
               Logout
            </button>
         </div>
         ) : (
         <div className="flex gap-3 items-center justify-center">
            <Button variant="buttonlink" onClick={() => router.push("/auth/login")}>
               Sign In
            </Button>
            <button
               onClick={() => router.push("/auth/sign-up")}
               className="
               bg-[var(--primary-color)] text-white text-[18px]
               hover:bg-[var(--primary-color-dark)] text-sm px-4 py-2 rounded-xl cursor-pointer
               "
            >
               Sign Up
            </button>
         </div>
         )}
      </header>
   )
}