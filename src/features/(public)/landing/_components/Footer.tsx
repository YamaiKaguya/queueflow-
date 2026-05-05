import Image from "next/image";
import logo from "@/public/QueueFlow+.png";
import { Mail, MapPin } from "lucide-react";

const footerLinks = [
   { heading: "Quick Links", links: ["How It Works", "Features", "FAQ"] },
   { heading: "Resources", links: ["Terms of Use", "Privacy Policy"] },
];

const renderLinks = (links: string[]) =>
   links.map((item) => (
      <li key={item}>
         <a href="#" className="text-base  text-gray-500 hover:text-gray-800 transition-colors">
         {item}
         </a>
      </li>
));

export default function Footer() {
   return (
      <footer className="w-full bg-[#f5f5f3] py-20 border-t border-gray-100">
         <div className="max-w-[85vw] mx-auto flex">

            {/* LEFT */}
            <div className="md:w-lg flex flex-col gap-4">
               <div className="flex items-center gap-2">
                  <Image src={logo} alt="QueueFlow Logo" width={52} height={52} />
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-indigo-600">
                  QueueFlow+
                  </span>
               </div>

               <p className="text-[18px] text-gray-500 leading-relaxed">
                  Making waiting a thing of the past. Our mission is to humanize
                  the queueing experience through intelligent technology and elegant design.
               </p>

               {/* Contact info */}
               <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2  text-base text-gray-500">
                     <Mail className="w-4 h-4 text-[var(--primary-color)]" />
                     queueflow@gmail.com
                  </div>
                  <div className="flex items-center gap-2 text-base text-gray-500">
                     <MapPin className="w-4 h-4 text-[var(--primary-color)]" />
                     Pasig City, Metro Manila
                  </div>
               </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-wrap gap-30 mx-auto">
               {footerLinks.map(({ heading, links }) => (
                  <div key={heading}>
                  <h4 className="text-base font-semibold text-gray-800 tracking-widest uppercase mb-4">
                     {heading}
                  </h4>
                  <ul className="flex flex-col gap-2">{renderLinks(links)}</ul>
                  </div>
               ))}
            </div>

         </div>
      </footer>
   );
}