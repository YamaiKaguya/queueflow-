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
      <section className="max-w-full bg-[#f5f5f3] py-20">
         <div className="max-w-6xl p-5 flex justify-between gap-20 mx-auto ">

         {/* LEFT SIDE */}
         <div className="space-y-6">
            <h2 className="text-(--black) text-4xl font-semibold">FAQ</h2>
            <p className="text-(--gray) max-w-sm">
               Everything you need to know about the platform and how to get started.
               Can&apos;t find the answer? Reach out to our support team.
            </p>
            <div className="space-y-3">
               <p className="text-sm text-(--primary-color)">NEED MORE ANSWERS?</p>
               <div className="flex gap-3">
               <Button className="cursor-pointer" variant="outline" size="lg">Email Support</Button>
               <Button className="cursor-pointer" variant="outline" size="lg">Contact Sales</Button>
               </div>
            </div>
         </div>

         {/* RIGHT SIDE */}
         <div className="flex-1">
            <Accordion type="single" collapsible className="space-y-3">
               {faqItems.map((item) => (
               <AccordionItem key={item.id} value={item.id} className="border bg-white rounded-xl px-4 p-1">
                  <AccordionTrigger className="text-left cursor-pointer ">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-(--gray) ">{item.answer}</AccordionContent>
               </AccordionItem>
               ))}
            </Accordion>
         </div>

         </div>
      </section>
   );
}