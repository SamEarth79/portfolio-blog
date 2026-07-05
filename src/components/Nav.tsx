"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Global site nav. The wordmark and the Contact button are two independent
// fixed elements: the wordmark carries mix-blend-difference so it inverts
// against whatever section is behind it, while the button stays a solid,
// opaque chip (blending it would let section content bleed through).
export default function Nav() {
  const markRef = useRef<HTMLAnchorElement | null>(null);
  const btnRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const targets = [markRef.current, btnRef.current];
      if (prefersReducedMotion) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        targets,
        { y: -24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power4.out" }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <a
        ref={markRef}
        href="/"
        className="fixed left-0 top-0 z-[999] flex h-16 items-center px-6 font-serif text-sm uppercase tracking-[0.02em] text-offwhite mix-blend-difference sm:px-10"
      >
        samarthmm.com
      </a>
      <div className="fixed right-0 top-0 z-[999] flex h-16 items-center px-6 sm:px-10">
        <a
          ref={btnRef}
          href="mailto:samarthmm.work@gmail.com"
          className="rounded-md bg-accent px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-accent/80"
        >
          Contact
        </a>
      </div>
    </>
  );
}
