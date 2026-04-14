import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import ProductSuite from "@/components/landing/ProductSuite";
import HowItWorks from "@/components/landing/HowItWorks";
import WhatsInside from "@/components/landing/WhatsInside";
import WhyFounders from "@/components/landing/WhyFounders";
import Methodology from "@/components/landing/Methodology";
import InputRequirements from "@/components/landing/InputRequirements";
import Pricing from "@/components/landing/Pricing";

import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ProductSuite />
      <HowItWorks />
      <WhatsInside />
      <WhyFounders />
      <Methodology />
      <InputRequirements />
      <Pricing />
      
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
