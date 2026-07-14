"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { lenisRef } from "@/lib/lenis";

const ROLL_GAP = 0.02;
const ROLL_ROW_HEIGHT = 16;
const ROLL_DURATION = 0.52;
const ROLL_EASE = "power2.out";

function attachRollHover(el: HTMLElement) {
  const charArr = el.querySelectorAll(".char");
  el.addEventListener("mouseenter", () => {
    gsap.killTweensOf(charArr);
    charArr.forEach((c, i) => {
      gsap.to(c, {
        y: -ROLL_ROW_HEIGHT,
        duration: ROLL_DURATION,
        ease: ROLL_EASE,
        delay: i * ROLL_GAP,
      });
    });
  });
  el.addEventListener("mouseleave", () => {
    gsap.killTweensOf(charArr);
    charArr.forEach((c, i) => {
      gsap.to(c, {
        y: 0,
        duration: ROLL_DURATION,
        ease: ROLL_EASE,
        delay: i * ROLL_GAP,
      });
    });
  });
}

// Renders text as a row of masked, two-layer characters so attachRollHover
// can slide the original out the top while its clone rolls in from below.
function RollText({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((char, i) => {
        const display = char === " " ? " " : char;
        return (
          <span key={i} className="inline-block h-4 overflow-hidden align-top">
            <span className="char flex flex-col">
              <span className="block h-4 leading-4">{display}</span>
              <span className="block h-4 leading-4">{display}</span>
            </span>
          </span>
        );
      })}
    </>
  );
}

// Global site nav. The wordmark and the Contact button are two independent
// fixed elements: the wordmark carries mix-blend-difference so it inverts
// against whatever section is behind it, while the button stays a solid,
// opaque chip (blending it would let section content bleed through).
export default function Nav() {
  const markRef = useRef<HTMLAnchorElement | null>(null);
  const btnRef = useRef<HTMLAnchorElement | null>(null);
  const projectsRef = useRef<HTMLAnchorElement | null>(null);

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
      if (projectsRef.current) {
        attachRollHover(projectsRef.current);
      }
      if (btnRef.current) {
        attachRollHover(btnRef.current);
      }
    });

    // Lenis's default easing (duration-only) is an exponential ease-out with
    // a long, crawling tail. Swap in a cubic ease-out so the scroll settles
    // into place quickly instead of lingering right before arrival.
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const handleProjectsClick = (e: MouseEvent) => {
      e.preventDefault();
      lenisRef.current?.scrollTo("#showcase", {
        offset: 0,
        duration: 1.4,
        easing: easeOutCubic,
      });
    };
    const handleCollaborateClick = (e: MouseEvent) => {
      e.preventDefault();
      lenisRef.current?.scrollTo("#connect", {
        offset: 0,
        duration: 6,
        easing: easeOutCubic,
      });
    };
    projectsRef.current?.addEventListener("click", handleProjectsClick);
    btnRef.current?.addEventListener("click", handleCollaborateClick);

    return () => {
      ctx.revert();
      projectsRef.current?.removeEventListener("click", handleProjectsClick);
      btnRef.current?.removeEventListener("click", handleCollaborateClick);
    };
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
      <a
        ref={projectsRef}
        href="#showcase"
        className="fixed top-4 z-[999] flex h-8 items-center font-mona text-xs font-bold uppercase tracking-[0.02em] text-offwhite mix-blend-difference right-[210px] sm:right-[240px]"
      >
        <RollText text="Projects" />
      </a>
      <div className="fixed right-0 top-0 z-[999] flex h-16 items-center px-6 sm:px-10">
        <a
          ref={btnRef}
          href="#connect"
          className="rounded-md bg-accent px-4 py-2 font-mona text-xs font-bold uppercase tracking-[0.02em] text-ink transition-colors hover:bg-accent/80"
        >
          <RollText text={"Let’s Collaborate"} />
        </a>
      </div>
    </>
  );
}
