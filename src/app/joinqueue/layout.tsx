// app/dashboard/layout.tsx
import { DashboardHeader } from "@/src/components/header/private-header"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DashboardHeader />
      {children}
    </>
  )
}