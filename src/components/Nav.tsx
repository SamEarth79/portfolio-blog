"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

// Lenis's default easing (duration-only) is an exponential ease-out with a
// long, crawling tail. Swap in a cubic ease-out so the scroll settles into
// place quickly instead of lingering right before arrival.
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const LINK_CLASS =
  "flex h-8 items-center font-mona text-xs font-bold uppercase tracking-[0.02em] text-offwhite";

// A section to land on once the home page has mounted. Held here rather than
// in the URL because Next's router can stack hashes ("/#showcase#connect")
// when it reuses a cached "/" route.
let pendingHash: string | null = null;

// Global site nav. The wordmark and the Contact button are two independent
// fixed elements: the wordmark carries mix-blend-difference so it inverts
// against whatever section is behind it, while the button stays a solid,
// opaque chip (blending it would let section content bleed through).
export default function Nav() {
  const markRef = useRef<HTMLAnchorElement | null>(null);
  const btnRef = useRef<HTMLAnchorElement | null>(null);
  const projectsRef = useRef<HTMLAnchorElement | null>(null);
  const raceRef = useRef<HTMLAnchorElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Smooth scrolls in place on the home page; from anywhere else, goes home
  // first. Modified clicks keep the browser's default (open in new tab).
  const goToSection = (e: MouseEvent, hash: string, duration: number) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    if (pathname !== "/") {
      pendingHash = hash;
      router.push("/");
      return;
    }
    lenisRef.current?.scrollTo(hash, {
      offset: 0,
      duration,
      easing: easeOutCubic,
    });
  };

  // After a client side navigation, Lenis and ScrollTrigger still hold the
  // previous page's measurements, and a hash target moves once pins exist.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
      lenisRef.current?.resize();
      const hash = pendingHash ?? window.location.hash;
      if (pathname === "/" && hash) {
        pendingHash = null;
        lenisRef.current?.scrollTo(hash, { immediate: true, force: true });
      } else if (pathname !== "/") {
        lenisRef.current?.scrollTo(0, { immediate: true, force: true });
      }
    }, 100);
    return () => window.clearTimeout(timer);
  }, [pathname]);

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
      [raceRef, projectsRef, btnRef].forEach((ref) => {
        if (ref.current) attachRollHover(ref.current);
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Link
        ref={markRef}
        href="/"
        className="fixed left-0 top-0 z-[999] flex h-16 items-center px-6 font-serif text-sm uppercase tracking-[0.02em] text-offwhite mix-blend-difference sm:px-10"
      >
        samarthmm.com
      </Link>
      {/* Below sm there is no room beside the button, so links take a second row */}
      <div className="fixed right-6 top-14 z-[999] flex gap-6 mix-blend-difference sm:right-[240px] sm:top-4 sm:gap-8">
        <Link ref={raceRef} href="/race" data-wf="race.nav-link" className={LINK_CLASS}>
          <RollText text="Race Me" />
        </Link>
        <Link
          ref={projectsRef}
          href="/#showcase"
          onClick={(e) => goToSection(e, "#showcase", 1.4)}
          className={LINK_CLASS}
        >
          <RollText text="Projects" />
        </Link>
      </div>
      <div className="fixed right-0 top-0 z-[999] flex h-16 items-center px-6 sm:px-10">
        <Link
          ref={btnRef}
          href="/#connect"
          onClick={(e) => goToSection(e, "#connect", 6)}
          className="rounded-md bg-accent px-4 py-2 font-mona text-xs font-bold uppercase tracking-[0.02em] text-ink transition-colors hover:bg-accent/80"
        >
          <RollText text={"Let’s Collaborate"} />
        </Link>
      </div>
    </>
  );
}
