import { createClient } from "@/src/lib/supabase/server"
import Logo from "@/src/components/logo"
import DashboardNav from "@/src/components/header/_components/dashboardnav"

const staffNavItems = [
    { href: "/staff/dashboard", label: "Dashboard" },
    { href: "/staff/noshow", label: "No-shows" },
    { href: "/staff/overview", label: "Overview" },
]

export default async function StaffHeader() {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    const user = data.user
    const fullName = user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "Staff"

    return (
        <header className="
        flex items-center justify-between
        px-8 py-2
        bg-white
        shadow-[0_4px_6px_-1px_rgba(114,114,114,0.10)]">
        <div className="flex items-center gap-6">
            <Logo />
            <DashboardNav items={staffNavItems} />
        </div>

        <div className="flex items-center gap-2">
            <div className="w-[45px] h-[45px] rounded-full border-2 border-gray-200 bg-blue-500 flex items-center justify-center text-white text-lg font-semibold flex-shrink-0">
            {fullName[0].toUpperCase()}
            </div>
            <div className="flex flex-col">
            <span className="text-lg font-medium text-gray-900">{fullName}</span>
            <span className="text-xs text-gray-400 uppercase tracking-wide">Staff</span>
            </div>
        </div>
        </header>
    )
}