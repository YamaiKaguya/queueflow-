import { PublicHeader } from "@/src/components/header/PublicHeader"
import { createClient } from "@/src/lib/supabase/server"

import { 
   ScrollIndicator,
   Hero, 
   WhatMakesIt, 
   HowItWorks, 
   FAQ, 
   CTABanner, 
   Footer, 
   Copyright
} from "./_components/Index";

export default async function Landing() {
   const supabase = await createClient()

   const {
      data: { user }
   } = await supabase.auth.getUser()

   return (
      <>
         <PublicHeader initialUser={user}/>
         <ScrollIndicator />
         <Hero />
         <WhatMakesIt />
         <HowItWorks />
         <FAQ />
         <CTABanner />
         <Footer />
         <Copyright />
      </>
   )
}