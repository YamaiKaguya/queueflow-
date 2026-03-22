"use client"

import logo from "@/public/QueueFlow+.png";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";


export function Header() {
const router = useRouter();

const handleClick = () => {
router.push("http://localhost:3000/dashboard");
};

   return (
      <nav className={"flex items-center justify-between px-5 py-1 border-b"}>
      <div className="flex items-center gap-2 font-semibold">
            <Image src={logo} alt="QueueFlow Logo" className="max-w-11" />
            <h1 className="text-lg">
               QueueFlow+
            </h1>
      </div>

      <div className="flex items-center gap-6">
            <a className="text-base
            hover:text-blue-600  transition-all duration-300 cursor-pointer" onClick={handleClick}>Log In</a>
            <Button variant="default" size="lg" className="bg-blue-500 text-white cursor-pointer
               hover:bg-(--primary-color) 
               transition-all 
               duration-300">
               Sign Up
            </Button>
      </div>
      </nav>
   )
}

