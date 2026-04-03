import { 
   Hero, 
   WhatMakesIt, 
   HowItWorks, 
   FAQ, 
   CTABanner, 
   Footer, 
   Copyright,} from "@/src/features/landing/_barrel/barrel";

   import { PublicHeader } from "@/src/components/header/public-header"
   

export default function Home() {
   return (
      <>
         <PublicHeader />
         <Hero />
         <WhatMakesIt />
         <HowItWorks />
         <FAQ />
         <CTABanner />
         <Footer />
         <Copyright/>
      </>
   )
}