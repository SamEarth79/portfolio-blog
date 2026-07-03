"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Chapter from "@/components/Chapter";

gsap.registerPlugin(ScrollTrigger);

function Accent({ children }: { children: string }) {
  return (
    <em className="font-serif font-medium normal-case italic text-accent">
      {children}
    </em>
  );
}

export default function About() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>("[data-about-reveal]");
      if (prefersReducedMotion) {
        gsap.set(lines, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        lines,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 55%",
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <Chapter background="olive" className="items-center text-center">
        <div className="flex max-w-6xl flex-col items-center gap-10 px-6 py-32 sm:px-10">
          <p
            data-about-reveal
            className="text-[10px] uppercase tracking-[0.35em] text-offwhite/50"
          >
            Full-Stack Developer &mdash; Since 2019
          </p>

          <h2
            data-about-reveal
            className="font-display text-[7.5vw] font-bold uppercase leading-[1.02] tracking-tight sm:text-[5.5vw]"
          >
            <Accent>Building</Accent> products end to end, shipping{" "}
            <Accent>fast</Accent>, and learning louder every year. Turning
            ideas into <Accent>software</Accent> people actually use.
          </h2>

          <p
            data-about-reveal
            className="max-w-xl font-serif text-lg italic text-offwhite/60 sm:text-xl"
          >
            &ldquo;It doesn&rsquo;t matter where you start, it&rsquo;s how you
            progress from there.&rdquo;
          </p>
        </div>
      </Chapter>
    </div>
  );
}
