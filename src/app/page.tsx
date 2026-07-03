import Hero from "@/components/Hero";
import About from "@/components/About";
import Showcase from "@/components/Showcase";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <div id="hero-zone" className="h-[180vh]">
        <Hero />
      </div>
      <About />
      {/* Plain block wrapper: GSAP pin-spacers misbehave as direct flex children */}
      <div className="block w-full">
        <Showcase />
      </div>
    </main>
  );
}
