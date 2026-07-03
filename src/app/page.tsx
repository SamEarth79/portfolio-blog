import Hero from "@/components/Hero";
import About from "@/components/About";
import Showcase from "@/components/Showcase";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <div id="after-hero" className="relative z-10">
        <About />
        <Showcase />
      </div>
    </main>
  );
}
