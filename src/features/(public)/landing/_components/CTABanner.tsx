import { Mail } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

export default function CTABanner() {
   return (
      <section className="w-full bg-white py-20">
         <div className="
         max-w-[85vw] mx-auto
         bg-[var(--primary-color)]
         rounded-3xl py-16 px-8
         flex flex-col items-center text-center
         relative overflow-hidden
         ">

            {/* BACKGROUND DECORATIONS */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />
            <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full pointer-events-none" />

            {/* HEADING */}
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-3 max-w-lg">
               Ready to transform your wait time?
            </h2>

            {/* SUBHEADING */}
            <p className="text-white/70 text-base mb-10 max-w-sm">
               Join 1,000+ businesses delivering better experiences today.
            </p>

            {/* INPUT AND SUBMIT BUTTON */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xl">
               <div className="relative flex-1 w-full">
                  <Input
                  placeholder="Enter your work email"
                  className="
                     h-12 px-6 rounded-lg text-lg
                     bg-white border border-transparent
                     focus-visible:ring focus-visible:ring-white/20
                     focus-visible:border-white/40
                     shadow-sm focus:shadow-lg
                     transition-all duration-300
                     placeholder:text-lg
                  "
                  />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
               </div>
               <Button size="lg" variant="scaledbutton_inverted">
                  Get Started Now
               </Button>
            </div>

            {/* NOTE */}
            <p className="mt-5 text-white/40 text-xs">
               No credit card required · Free 14-day trial · Cancel anytime
            </p>

         </div>
      </section>
   );
}