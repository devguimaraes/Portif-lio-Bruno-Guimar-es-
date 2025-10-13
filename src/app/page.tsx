import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Contact } from "@/components/sections/contact";
import { ContactInfo } from "@/components/sections/contact-info";
import { FAQ } from "@/components/sections/faq";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Services />
      <Contact />
      <ContactInfo />
      <FAQ />
    </main>
  );
}
