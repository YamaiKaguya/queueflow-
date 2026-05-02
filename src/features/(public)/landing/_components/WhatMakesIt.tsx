import Image from "next/image";
import { features } from "@/src/data/whatmakesit"; 

function FeatureCard({feature}: {
   feature: (typeof features)[0];
   // !WOOWOWOOWOWOOWOWO
}) {

   return (
      <div
         className={`
         ${feature.span}
         min-h-60
         rounded-2xl border border-gray-100 bg-white p-7
         flex flex-col gap-3 overflow-hidden relative
         transition-transform  duration-300 ease-out
         hover:-translate-y-1 hover:shadow-lg cursor-pointer 
         `}
   >
      <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-50 text-(--primary-color)">
         {feature.icon}
      </span>

      <h3 className={`text-gray-900 ${feature.titleStyle} text-xl leading-snug`}>
         {feature.title}
      </h3>

      <p className="text-gray-500 text-base leading-relaxed">
         {feature.description}
      </p>

      {feature.hasImage &&  feature.imageSrc && (
         <div className="mt-2 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
            <div className="relative w-full h-44">
               <Image 
                  src={feature.imageSrc}
                  alt="feature image"
                  fill
                  className="object-cover"
               />
            </div>
         </div>
         )}
      </div>
   );
}

export default function WhatMakesItWork() {
   return (
      <section className="w-full min-h-dvh bg-[#f5f5f3] py-40">
         <div className="
         max-w-[85vw]
         mx-auto
         ">

            <div className="text-center mb-15">
               <h2 className="text-5xl font-bold text-gray-900 mb-8 tracking-tight">
                  What makes it work
               </h2>
               <p className="text-gray-500 text-xl leading-relaxed max-w-4xl mx-auto">
                  Simplifies queue management by combining virtual queuing, real-time
                  tracking, and smart dashboards. It helps businesses serve customers
                  faster while keeping everyone informed about their place in line.
               </p>
            </div>

            {/* CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
               {features.map((feature, index) => (
                  <FeatureCard key={index} feature={feature}/>
               ))}
            </div>
         </div>
      </section>
   );
}