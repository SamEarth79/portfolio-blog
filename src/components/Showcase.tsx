"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Scattered scrapbook tiles: varied sizes + vertical offsets, caption above each */
const TILES: {
  caption: string;
  title: string;
  note: string;
  sizeClass: string;
}[] = [
  {
    caption: "PROJECT, 2025",
    title: "Best Project #1",
    note: "Placeholder — flagship build",
    sizeClass: "h-[52vh] w-[78vw] self-center md:w-[30vw]",
  },
  {
    caption: "LINKEDIN, 2025",
    title: "Top Post",
    note: "Placeholder — best LinkedIn post",
    sizeClass: "h-[34vh] w-[64vw] self-start md:mt-[10vh] md:w-[20vw]",
  },
  {
    caption: "NOW, 2026",
    title: "Building Now",
    note: "Placeholder — current work",
    sizeClass: "h-[62vh] w-[80vw] self-center md:w-[34vw]",
  },
  {
    caption: "ACHIEVEMENT, 2024",
    title: "Proudest Win",
    note: "Placeholder — achievement",
    sizeClass: "h-[38vh] w-[64vw] self-end md:mb-[8vh] md:w-[22vw]",
  },
  {
    caption: "PROJECT, 2024",
    title: "Best Project #2",
    note: "Placeholder — second flagship",
    sizeClass: "h-[48vh] w-[72vw] self-start md:mt-[14vh] md:w-[26vw]",
  },
];

export default function Showcase() {
  const rootRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const track = trackRef.current!;
      const getDistance = () => track.scrollWidth - window.innerWidth;

      // Entry: tiles already gliding in from the right while About is still leaving
      gsap.fromTo(
        track,
        { x: () => window.innerWidth * 0.55 },
        {
          x: 0,
          ease: "none",
          immediateRender: true,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        }
      );

      // Pinned phase: continue across the full track
      gsap.fromTo(
        track,
        { x: 0 },
        {
          x: () => -getDistance(),
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: () => `+=${getDistance()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-olive text-offwhite md:h-screen"
    >
      <div className="absolute top-14 left-6 z-10 sm:left-10">
        <p className="text-[10px] uppercase tracking-[0.35em] text-offwhite/50">
          Selected Work
        </p>
        <h2 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-6xl">
          Showcase
        </h2>
      </div>

      <div
        ref={trackRef}
        className="flex w-full flex-col items-stretch gap-10 px-6 py-32 md:h-full md:w-max md:flex-row md:items-stretch md:gap-[7vw] md:py-0 md:pl-[48vw] md:pr-[14vw]"
      >
        {/* Serif pull-quote slotted between tiles, scrapbook style */}
        {TILES.map((tile, i) => (
          <div key={tile.title} className="contents">
            {i === 2 && (
              <div className="flex max-w-xs shrink-0 flex-col justify-center gap-4 self-center">
                <p className="font-serif text-xl italic leading-relaxed text-offwhite/80 sm:text-2xl">
                  &ldquo;Every tile here started as a{" "}
                  <em className="text-accent">what if</em> — this is the shelf I
                  keep the answers on.&rdquo;
                </p>
                <span className="text-[10px] uppercase tracking-[0.3em] text-offwhite/40">
                  Samarth M M
                </span>
              </div>
            )}
            <figure className={`flex shrink-0 flex-col gap-3 ${tile.sizeClass}`}>
              <figcaption className="text-[10px] uppercase tracking-[0.3em] text-offwhite/50">
                {tile.caption}
              </figcaption>
              <article className="group relative flex flex-1 flex-col justify-between overflow-hidden bg-navy p-6">
                <span className="font-display text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-2xl font-bold uppercase leading-none tracking-tight sm:text-3xl">
                    {tile.title}
                  </h3>
                  <p className="max-w-xs text-sm text-offwhite/60">
                    {tile.note}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
                />
              </article>
            </figure>
          </div>
        ))}
      </div>
    </section>
  );
}
