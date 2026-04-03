// app/dashboard/layout.tsx
import { createClient } from "@/src/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/src/components/header/private-header"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await  createClient()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    redirect("/auth/login")
  }

  return (
    <>
      <DashboardHeader user={data.user} />
      {children}
    </>
  )
}