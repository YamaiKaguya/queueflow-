import { Hero, WhatMakesIt, HowItWorks, FAQ, CTABanner, Footer, Copyright,} from "@/src/app/(root-landing)/_components/barrel";
import { Header } from "@/src/app/(root-landing)/_components/header/header"; 

export default function Home() {
   return (
      <>
         <Header />
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