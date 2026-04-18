"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import logo from "@/public/QueueFlow+.png";
// import logo from "@/public/Logo_2.0.png";

export default function Logo() {
  const router = useRouter();

  return (
    <div
      className="flex items-center gap-1.5 cursor-pointer select-none "
      onClick={() => router.push("/")}
    >
      <Image
        src={logo}
        alt="QueueFlow Logo"
        className="max-w-14 transition-transform duration-300 hover:scale-110"
      />
        <h1 className="text-2xl font-bold bg-linear-to-r from-[var(--primary-color)] to-[var(--primary-color-darker)] bg-clip-text text-transparent tracking-tight">
        QueueFlow+
        </h1>
    </div>
  );
}