import Hero from "@/components/Hero";
import About from "@/components/About";
import Showcase from "@/components/Showcase";
import ContourField from "@/components/ContourField";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="relative bg-olive">
        <ContourField stroke="var(--color-fg)" />
        <div id="hero-zone" className="relative h-[180vh]">
          <Hero />
        </div>
        <About />
      </div>
      {/* Plain block wrapper: GSAP pin-spacers misbehave as direct flex children */}
      <div className="block w-full">
        <Showcase />
      </div>
    </main>
  );
}
