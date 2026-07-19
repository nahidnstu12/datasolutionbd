import About from "@/components/sections/About";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Faq from "@/components/sections/Faq";
import Features from "@/components/sections/Features";
import Hero from "@/components/sections/Hero";
import Process from "@/components/sections/Process";
import Solutions from "@/components/sections/Solutions";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import TrustStrip from "@/components/sections/TrustStrip";
import WhyUs from "@/components/sections/WhyUs";

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <TrustStrip />
      <About />
      <WhyUs />
      <Solutions />
      <Features />
      <Stats />
      <Testimonials />
      <Process />
      <Faq />
      <Blog />
      <Contact />
    </main>
  );
}
