import { Info, Globe, ShieldCheck } from "lucide-react"

const links = [ "Privacy Policy", "Terms of Service", "Support"];

export default function Footer() {
   return (
      <footer className="w-full bg-white border-t border-gray-100">
         <div className="p-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-1 text-sm text-gray-400">
               <Info className="w-3 h-3" />
               <span>2026 QueueFlow+. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
               {links.map((item) => (
                  <a
                  key={item}
                  href="#"
                  className="hover:text-gray-600 transition-colors"
                  >
                  {item}
                  </a>
               ))}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
               <div className="flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  <span>English (US)</span>
               </div>
               <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Secure</span>
               </div>
            </div>
         </div>
      </footer>
   )
}