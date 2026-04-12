"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from '@/src/lib/supabase/client';
import { Button } from "@/src/components/ui/button";
import Logo from "@/src/components/logo";

import type { User, AuthChangeEvent, Session  } from "@supabase/supabase-js";

export function Header() {
   const router = useRouter();
   const [user, setUser] = useState<User | null>(null);
   const [loading, setLoading] = useState(true);
   const supabase = createClient();

   useEffect(() => {
      supabase.auth.getUser().then(({ data }: { data: { user: User | null } }) => {
         setUser(data.user);
         setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
         setUser(session?.user ?? null);
         setLoading(false);
      });

      return () => subscription.unsubscribe();
   });

   const handleLogout = async () => {
      await supabase.auth.signOut();
      router.refresh();
      router.push("/");
   };

   if (loading) return (
      <nav className="flex items-center justify-between px-8 py-2 shadow-[0_4px_6px_-1px_rgba(114,114,114,0.10)]">
         <Logo />
         <div className="w-40 h-8 rounded-md bg-gray-100 animate-pulse" />
      </nav>
   );

   return (
      <nav className="flex items-center justify-between px-8 py-2 shadow-[0_4px_6px_-1px_rgba(114,114,114,0.10)]">
         <Logo />
         <div className="flex items-center gap-1 text-lg transition-all duration-300">
         {user ? (
            <>
               <Button variant="buttonlink" onClick={() => router.push("/dashboard")} className="flex items-center gap-2">
               Dashboard
               </Button>
               <Button variant="custom" onClick={handleLogout} className="flex items-center gap-2">
               Logout
               </Button>
            </>
         ) : (
            <>
               <Button variant="buttonlink" onClick={() => router.push("/auth/login")}>
               Sign In
               </Button>
               <Button variant="custom" onClick={() => router.push("/auth/sign-up")}>
               Sign Up
               </Button>
            </>
         )}
         </div>
      </nav>
   );
}