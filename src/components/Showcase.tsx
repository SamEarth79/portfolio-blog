"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TILES = [
  { label: "Project", title: "Best Project #1", note: "Placeholder — flagship build" },
  { label: "Project", title: "Best Project #2", note: "Placeholder — second flagship" },
  { label: "LinkedIn", title: "Top Post", note: "Placeholder — best LinkedIn post" },
  { label: "Now", title: "Building Now", note: "Placeholder — current work" },
  { label: "Achievement", title: "Achievement", note: "Placeholder — proudest win" },
];

export default function Showcase() {
  const rootRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const getDistance = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex h-screen w-full flex-col justify-center overflow-hidden bg-charcoal text-offwhite"
    >
      <div className="absolute top-16 left-6 z-10 sm:left-10">
        <p className="text-[10px] uppercase tracking-[0.35em] text-offwhite/50">
          Selected Work
        </p>
        <h2 className="font-display text-5xl font-bold uppercase tracking-tight sm:text-7xl">
          Showcase
        </h2>
      </div>

      <div
        ref={trackRef}
        className="flex w-max items-center gap-8 pl-[55vw] pr-[10vw] max-md:flex-col max-md:w-full max-md:px-6 max-md:pt-40"
      >
        {TILES.map((tile, i) => (
          <article
            key={tile.title}
            className="group relative flex h-[62vh] w-[70vw] shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-offwhite/10 bg-navy p-8 sm:w-[38vw] max-md:h-[50vh] max-md:w-full"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.3em] text-offwhite/50">
                {tile.label}
              </span>
              <span className="font-display text-sm text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-display text-3xl font-bold uppercase leading-none tracking-tight sm:text-4xl">
                {tile.title}
              </h3>
              <p className="max-w-xs text-sm text-offwhite/60">{tile.note}</p>
            </div>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
            />
          </article>
        ))}
      </div>
    </section>
  );
}
