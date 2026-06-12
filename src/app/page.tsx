import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { TestRunner } from "@/components/TestRunner";
import { Writing } from "@/components/Writing";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <TestRunner />
        <Writing />
      </main>
      <Footer />
    </>
  );
}
