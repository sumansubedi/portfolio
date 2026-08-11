import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Highlights } from "@/components/Highlights";
import { Projects } from "@/components/Projects";
import { TestRunner } from "@/components/TestRunner";
import { Writing } from "@/components/Writing";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Highlights />
        <Projects />
        <TestRunner />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
