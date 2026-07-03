"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Chapter from "@/components/Chapter";
import ContourField from "@/components/ContourField";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLParagraphElement | null>(null);
  const line1Ref = useRef<HTMLSpanElement | null>(null);
  const line2Ref = useRef<HTMLSpanElement | null>(null);
  const cueRef = useRef<HTMLDivElement | null>(null);
  const fadeRef = useRef<HTMLDivElement | null>(null);
  const scaleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [navRef.current, labelRef.current, line1Ref.current, line2Ref.current, cueRef.current],
          { opacity: 1, y: 0, clearProps: "transform" }
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      tl.fromTo(
        navRef.current,
        { y: -24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
        .fromTo(
          labelRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.25"
        )
        .fromTo(
          line1Ref.current,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.75 },
          "-=0.15"
        )
        .fromTo(
          line2Ref.current,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.75 },
          "-=0.55"
        )
        .fromTo(
          cueRef.current,
          { y: -12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          "-=0.2"
        );

      // Hero is sticky; shrink + dim it as the next chapter scrolls over
      const after = document.getElementById("after-hero");
      if (after) {
        gsap.to(scaleRef.current, {
          scale: 0.88,
          opacity: 0.4,
          ease: "none",
          transformOrigin: "center center",
          scrollTrigger: {
            trigger: after,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
        gsap.to(fadeRef.current, {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: after,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="sticky top-0 h-screen">
      <div ref={scaleRef} className="h-full">
      <Chapter background="warm" className="h-full !min-h-0">
        <ContourField />

        <div
          ref={navRef}
          className="fixed top-0 left-0 z-20 flex w-full items-center justify-between px-6 py-5 mix-blend-difference sm:px-10"
        >
          <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-offwhite">
            SM
          </span>
          <a
            href="mailto:samarthmm.work@gmail.com"
            className="text-xs uppercase tracking-[0.2em] text-offwhite/80 transition-colors hover:text-accent"
          >
            Contact
          </a>
        </div>

        <div ref={fadeRef} className="relative z-10 flex flex-col gap-6 px-6 sm:px-10">
          <p
            ref={labelRef}
            className="text-xs uppercase tracking-[0.35em] text-ink/50"
          >
            Full-Stack Developer &mdash; Bangalore, India
          </p>

          <h1 className="font-display font-bold uppercase leading-[0.85] tracking-tight text-ink">
            <span className="block overflow-hidden">
              <span
                ref={line1Ref}
                className="block text-[16vw] sm:text-[14vw]"
              >
                Samarth
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                ref={line2Ref}
                className="relative inline-block text-[16vw] sm:text-[14vw]"
              >
                <span className="relative z-10">M M</span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-[0.08em] -z-0 h-[0.34em] bg-accent"
                />
              </span>
            </span>
          </h1>

          <p className="max-w-md font-serif text-xl italic text-ink/70 sm:text-2xl">
            &ldquo;I like to build stuff.&rdquo;
          </p>
        </div>

        <div
          ref={cueRef}
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-ink/50"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">
            Scroll
          </span>
          <span className="h-8 w-px animate-pulse bg-current" />
        </div>
      </Chapter>
      </div>
    </div>
  );
}
