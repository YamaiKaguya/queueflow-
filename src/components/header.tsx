"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/public/QueueFlow+.png";
import {
DropdownMenu,
DropdownMenuTrigger,
DropdownMenuContent,
DropdownMenuItem,
} from "@/src/components/ui/dropdown-menu"; 

export default function DashboardLayout() {
const router = useRouter();

const handleLogout = () => {
router.push("/");
};

return (
    <>
        <header className="flex items-center justify-between px-5 py-1 border-b">
            <div className="flex items-center gap-8">
                <div
                className="flex items-center gap-2 font-semibold cursor-pointer"
                onClick={() => router.push("/")}
                >
                <Image src={logo} alt="QueueFlow Logo" className="max-w-11" />
                <h1 className="text-lg">QueueFlow+</h1>
                </div>
                <div className="flex items-center gap-6">
                <button
                    className="text-base text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => router.push("/dashboard")}
                >
                    Dashboard
                </button>
                <button
                    className="text-base text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => router.push("/joinqueue")}
                >
                    Join Queue
                </button>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button
                className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors"
                title="notif"
                >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
                </button>

                {/* User Menu */}
                <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-600 cursor-pointer">
                    JD
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.push("/profile")}>
                    Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/settings")}>
                    Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>

                <span className="text-base text-gray-700 font-medium">John Doe</span>
            </div>
        </header>
    </>
    );
}