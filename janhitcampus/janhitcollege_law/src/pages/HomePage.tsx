import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Courses } from "@/components/site/Courses";
import { Infrastructure } from "@/components/site/Infrastructure";
import { Admissions } from "@/components/site/Admissions";
import { Downloads } from "@/components/site/Downloads";
import { Faculty } from "@/components/site/Faculty";
import { Committees } from "@/components/site/Committees";
import { Disclosures } from "@/components/site/Disclosures";
import { NewsEvents } from "@/components/site/NewsEvents";
import { HomeGallery } from "@/components/site/HomeGallery";
import { ContactForm } from "@/components/site/ContactForm";

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Courses />
      <Infrastructure />
      <Admissions />
      <Downloads isHomePage={true} />
      <Faculty />
      <Committees />
      <Disclosures />
      <NewsEvents />
      <HomeGallery />
      <ContactForm />
    </>
  );
}
