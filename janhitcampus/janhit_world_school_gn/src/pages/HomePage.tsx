import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { FounderBatch } from "@/components/site/FounderBatch";
import { WhyChoose } from "@/components/site/WhyChoose";
import { Foundational } from "@/components/site/Foundational";
import { Sports } from "@/components/site/Sports";
import { Admissions } from "@/components/site/Admissions";
import { Campus } from "@/components/site/Campus";
import { Faq } from "@/components/site/Faq";
import { Contact } from "@/components/site/Contact";

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <FounderBatch />
      <WhyChoose />
      <Foundational />
      <Sports />
      <Admissions />
      <Campus />
      <Faq />
      <Contact />
    </>
  );
}
