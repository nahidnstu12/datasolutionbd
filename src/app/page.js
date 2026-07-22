import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Faq from "@/components/sections/Faq";
import Features from "@/components/sections/Features";
import Hero from "@/components/sections/Hero";
import Process from "@/components/sections/Process";
import Solutions from "@/components/sections/Solutions";
import Stats from "@/components/sections/Stats";
import TrustStrip from "@/components/sections/TrustStrip";
import WhyUs from "@/components/sections/WhyUs";
import { FaqJsonLd, SoftwareJsonLd } from "@/components/seo/JsonLd";

export default function HomePage() {
  return (
    <>
      <FaqJsonLd />
      <SoftwareJsonLd />
      <main id="main-content">
        <Hero />
        <TrustStrip />
        <About />
        <WhyUs />
        <Solutions />
        <Features />
        <Stats />
        <Process />
        <Faq />
        <Contact />
      </main>
    </>
  );
}
