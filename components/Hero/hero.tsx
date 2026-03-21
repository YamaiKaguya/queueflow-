"use client";

import hospital from "../../public/hospital.jpg";
import Image from "next/image";
import { motion } from "framer-motion";
import More from "../../public/more.svg";

export default function Hero() {
   return (
      <section
         className="grid grid-cols-2 gap-24 place-items-center min-h-[calc(100vh-100px)] px-36 relative"
      >
         {/* Left Content */}
         <div className="my-auto">
            <p className="text-sm bg-gray-100 inline-block px-3 py-1 rounded-full">
               The Next Gen of Queue Management
            </p>

            <h1 className="text-5xl font-bold mt-6">
               Reimagining the <span className="text-blue-500">Wait Experience</span>
            </h1>

            <p className="text-gray-600 mt-4">
               QueueFlow+ eliminates physical lines and transforms waiting into a digital experience.
            </p>

            <div className="flex gap-4 mt-8">
               {/* Primary Button */}
               <button
               className="bg-blue-500 text-white px-6 py-3 rounded-lg
               hover:bg-blue-600 hover:scale-105 transition-all duration-300 cursor-pointer"
               >
                  Start Queueing
               </button>

               {/* Secondary Button */}
               <button
               className="border border-blue-500 text-blue-500 px-6 py-3 rounded-lg
               hover:font-bold hover:scale-105 transition-all duration-300 cursor-pointer"
               >
                  Learn More
               </button>
            </div>
         </div>

         {/* Scroll Indicator */}
         <div className="flex flex-col items-center mt-10 gap-1 absolute bottom-20 left-1/2 -translate-x-1/2">
            <motion.span
            className="text-3xl"
            animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
            >
               <Image src={More} alt="Scroll Down" width={40} height={40} />
            </motion.span>
         </div>

         {/* Right Image */}
         <div className="flex justify-center">
            <Image
            src={hospital}
            alt="Hospital Waiting Room"
            className="max-w-xs md:max-w-lg rounded-2xl shadow-xl p-1"
            />
         </div>
      </section>
   );
}