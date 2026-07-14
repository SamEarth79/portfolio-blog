"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lenisRef } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: !prefersReducedMotion,
      duration: prefersReducedMotion ? 0 : 1.2,
      touchMultiplier: prefersReducedMotion ? 1 : 2,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    // Pin-spacers change document height during refresh; make Lenis re-measure
    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    // lagSmoothing(0) below lets real stalls (HMR, GC pauses, backgrounded
    // tabs) through as one big deltaTime instead of gsap masking them — good
    // for scrub accuracy, but a single oversized tick can make a duration-based
    // lenis.scrollTo() jump straight to completion instead of easing there.
    // Clamp what reaches Lenis so a stall can't skip an in-flight animation.
    let lastRafMs = performance.now();
    const tickerCallback = () => {
      const now = performance.now();
      lastRafMs += Math.min(now - lastRafMs, 50);
      lenis.raf(lastRafMs);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
