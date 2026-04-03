"use client";

import {
Accordion,
AccordionItem,
AccordionTrigger,
AccordionContent,
} from "@/src/components/ui/accordion";
import { Button } from "@/src/components/ui/button";
import { faqItems } from "@/src/data/faqItems";

export default function FAQSection() {
   return (
      <section className="max-w-full bg-[#f5f5f3] py-40">
         <div className="max-w-[85vw] p-5 flex justify-between gap-20 mx-auto">
         
         {/* LEFT SIDE */}
         <div className="space-y-6">
            <h2 className="text-[var(--black)] text-5xl font-semibold">FAQ</h2>
            <p className="text-[var(--gray)] text-lg max-w-sm">
               Everything you need to know about the platform and how to get started.
               Can&apos;t find the answer? Reach out to our support team.
            </p>
            <div className="space-y-3">
               <p className="text-base text-[var(--primary-color)]">NEED MORE ANSWERS?</p>
               <div className="flex gap-3">
               <Button variant="scaledbutton">Email Support</Button>
               <Button variant="scaledbutton_inverted">Contact Sales</Button>
               </div>
            </div>
         </div>

         {/* RIGHT SIDE */}
         <div className="flex-1">
            <Accordion type="single" collapsible className="space-y-3">
               {faqItems.map((item, index) => (
               <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="
                     group border-0 bg-white rounded-2xl px-6
                     shadow-sm hover:shadow-md
                     transition-all duration-300
                     data-[state=open]:bg-[var(--primary-color)]
                     data-[state=open]:shadow-lg
                     data-[state=open]:shadow-[var(--primary-color)]/20
                  "
               >
                  <AccordionTrigger
                     className="
                     text-left text-gray-800 text-base cursor-pointer py-5
                     hover:no-underline
                     group-data-[state=open]:text-white
                     transition-colors duration-300
                     "
                  >
                     <div className="flex items-center gap-4 text-lg">
                        <span className="
                           text-base font-bold text-[var(--primary-color)] bg-[var(--primary-color)]/10
                           group-data-[state=open]:text-white group-data-[state=open]:bg-white/20
                           w-8 h-8 rounded-full flex items-center justify-center shrink-0
                           transition-all duration-300
                        ">
                           {String(index + 1).padStart(2, "0")}
                        </span>
                        {item.question}
                     </div>
                  </AccordionTrigger>
                  <AccordionContent
                     className="
                     text-base pb-10 pl-11
                     text-gray-500
                     group-data-[state=open]:text-white/80
                     transition-colors duration-300
                     "
                  >
                     {item.answer}
                  </AccordionContent>
               </AccordionItem>
               ))}
            </Accordion>
         </div>

         </div>
      </section>
   );
}