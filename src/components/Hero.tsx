"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Chapter from "@/components/Chapter";
import ContourMap from "@/components/ContourMap";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLParagraphElement | null>(null);
  const line1Ref = useRef<HTMLSpanElement | null>(null);
  const line2Ref = useRef<HTMLSpanElement | null>(null);
  const socialsRef = useRef<HTMLDivElement | null>(null);
  const scaleRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [labelRef.current, line1Ref.current, line2Ref.current, socialsRef.current, frameRef.current],
          { opacity: 1, y: 0, clearProps: "transform" }
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      tl.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }
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
          socialsRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.35"
        )
        .fromTo(
          frameRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.2, ease: "power2.out" },
          "-=0.6"
        );

      // Hero sticks inside its tall wrapper: shrinks to 0.7 while pinned,
      // then the whole (shrunken) hero scrolls up before About arrives.
      const zone = document.getElementById("hero-zone");
      if (zone) {
        gsap.to(scaleRef.current, {
          scale: 0.7,
          ease: "none",
          transformOrigin: "center center",
          scrollTrigger: {
            trigger: zone,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="sticky top-0 h-svh">
      <div ref={scaleRef} className="h-full">
        <Chapter background="warm" className="h-full !min-h-0">
          <ContourMap />

          {/* Survey-sheet frame: hairline border with corner register marks */}
          <div
            ref={frameRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-4 z-10 border border-ink/15 opacity-0 sm:inset-6"
          >
            {[
              "left-0 top-0 border-l border-t",
              "right-0 top-0 border-r border-t",
              "bottom-0 left-0 border-b border-l",
              "bottom-0 right-0 border-b border-r",
            ].map((pos) => (
              <span
                key={pos}
                className={`absolute h-4 w-4 border-ink/50 ${pos}`}
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col gap-6 px-6 sm:px-10">
            <p
              ref={labelRef}
              className="ml-2 text-xs font-bold uppercase tracking-[0.35em] text-ink sm:ml-4 sm:font-normal"
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

            <div
              ref={socialsRef}
              className="mt-6 flex items-center justify-center gap-8 text-ink/60 sm:ml-4 sm:justify-start sm:gap-5"
            >
              <a
                href="https://linkedin.com/in/samarthmm"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-[22px] sm:w-[22px]" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://github.com/samarthmm"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-[22px] sm:w-[22px]" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
              <a
                href="mailto:samarthmm.work@gmail.com"
                className="transition-colors hover:text-accent"
                aria-label="Email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-[22px] sm:w-[22px]" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-10 7L2 7"/>
                </svg>
              </a>
            </div>
          </div>
        </Chapter>
      </div>
    </div>
  );
}
