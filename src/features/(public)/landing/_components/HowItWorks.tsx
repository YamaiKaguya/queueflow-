import Image from "next/image";
import { Data } from "@/src/data/howitowrks"; 

export default function HowItWorks() {
   return (
      <section className="w-full bg-white py-40">
      <div className="   
      max-w-[85vw]
      mx-auto 
      ">

         {/* HEADER */}
         <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 tracking-tight mb-8">
            How QueueFlow+ works for everyone
            </h2>
            <p className="text-gray-500 text-xl max-w-4xl mx-auto leading-relaxed">
            helps users wait smarter, staff manage the flow efficiently, and
            admins track insights to optimize service—all in one seamless system.
            </p>
         </div>

         {/* CARDS */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {Data.map((data) => (
               <RoleCard key={data.id} data={data}  />
            ))}
         </div>
      </div>
      </section>
   );
}

interface Data {
   id: string;
   role: string;
   description: string;
   avatar: string;
   items: string[];
   highlighted: boolean;
}

function RoleCard({ data }: { data: Data }) {
   return (
      <div
      className={`
         rounded-2xl p-6 flex flex-col gap-5
         ${data.highlighted ? "bg-white shadow-md border border-gray-100" : "bg-white shadow-sm border border-gray-100"}
         transition-transform  duration-300 ease-out
         hover:-translate-y-1 hover:shadow-lg cursor-pointer
      `}
      >
      <div className="flex flex-col items-center text-center gap-3">
         <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-gray-100 shadow-sm">
            <Image
            src={data.avatar}
            alt={data.role}
            width={64}
            height={64}
            className="object-cover w-full h-full"
            />
         </div>
         <div>
            <h3 className="text-xl font-semibold text-gray-900">{data.role}</h3>
            <p className="text-base text-gray-400 mt-1 leading-relaxed max-w-[40ch] mx-auto">
            {data.description}
            </p>
         </div>
      </div>

      <div className="flex flex-col gap-2">
         {data.items.map((item, i) => (
            <div
            key={i}
            className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 transition-transform duration-200 hover:translate-x-1"
            >
            <span className="w-8 h-8 rounded-full bg-blue-500 text-white text-base font-semibold flex items-center justify-center shrink-0">
               {i + 1}
            </span>
            <span className="text-base text-gray-700">{item}</span>
            </div>
         ))}
      </div>
      </div>
   );
}