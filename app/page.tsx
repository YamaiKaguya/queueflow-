import { Hero } from "@/components/Hero/Hero";
import { Navbar } from "@/components/Navbar/navbar";
import WhatMakesIt from "@/components/Hero/whatmakesitwork";
import HowItWorks from "@/components/Hero/howitworks";
import FAQ from "@/components/Hero/FAQ";
import CTABanner from "@/components/Hero/CTABanner";
import Footer from "@/components/Hero/Footer";
import Footer2 from "@/components/Hero/Footer2";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhatMakesIt />
      <HowItWorks />
      <FAQ />
      <CTABanner />
      <Footer />
      <Footer2/>
    </>
  )
}