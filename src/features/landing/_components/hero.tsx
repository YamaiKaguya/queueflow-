"use client";

import hospital from "@/public/hospital.jpg";
import Image from "next/image";
import { motion } from "framer-motion";
import More from "@/public/more.svg";

import { Button } from "@/src/components/ui/button";

export default function Hero() {
   return (
      <section className="w-full py-20 mx-auto">
         <div className="
         max-w-[85vw]
         mx-auto

         flex 
         flex-row 
         justify-between  
         place-items-center'
         ">
            <div className="my-auto">
               <p className="text-lg bg-gray-100 inline-block px-3 py-1 rounded-full">
                  The Next Gen of Queue Management
               </p>
               <h1 className="text-7xl font-bold mt-6 text-nowrap">
                  Reimagining the<span className="text-(--primary-color)">&nbsp;Wait</span>
                  <div className="text-(--primary-color) font-extrabold">
                     Experience
                  </div>
               </h1>
               <p className="text-gray-600 mt-4 text-xl max-w-[40ch] leading-relaxed">
                  QueueFlow+ eliminates physical lines and transforms waiting into a digital experience.
               </p>
               <div className="flex gap-4 mt-8">
                  <Button variant="scaledbutton">Start Queueing</Button>
                  <Button variant="scaledbutton_inverted">Learn More</Button>
               </div>
            </div>

            <div>
               <Image
               src={hospital}
               alt="Hospital Waiting Room"
               className="md:max-w-lg rounded-2xl shadow-xl p-1"
               />
            </div>

            <div className="flex flex-col items-center absolute bottom-20 left-1/2 -translate-x-1/2">
               <motion.span
               className="text-3xl"
               animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
               transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
               >
                  <Image src={More} alt="Scroll Down" width={50} height={50} />
               </motion.span>
            </div>
         </div>
      </section>
   );
}