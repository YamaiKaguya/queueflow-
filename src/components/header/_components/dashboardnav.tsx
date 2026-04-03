'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/src/components/ui/button"

const navItems = [
{ href: "/dashboard", label: "Dashboard" },
{ href: "/joinqueue", label: "Join Queue" },
]

export function DashboardNav() {
const pathname = usePathname()

   return (
      <nav className="flex items-center gap-1">
         {navItems.map(({ href, label }) => {
            const isActive = pathname.startsWith(href)

            return (
               <Link key={href} href={href}>
                  <Button
                     variant="buttonlink"
                     className={
                        isActive
                        ? "text-[var(--primary-color-dark)]"
                        : "text-gray-500 hover:text-gray-800"
                     }
                  >
                     {label}
                  </Button>
               </Link>
            )
         })}
      </nav>
   )
}