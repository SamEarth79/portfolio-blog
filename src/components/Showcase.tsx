"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContourField from "@/components/ContourField";

gsap.registerPlugin(ScrollTrigger);

type Tile = {
  caption: string;
  title?: string;
  note?: string;
  sizeClass: string;
  href?: string;
  images?: string[];
  variant?: "white" | "badge" | "metrics";
  metrics?: { value: string; label: string }[];
};

/* Scattered scrapbook tiles: varied sizes + vertical offsets, caption above each */
const TILES: Tile[] = [
  {
    caption: "PROJECT, 2025",
    title: "Matching Beats",
    note: "Compare your Spotify taste with friends via QR — match score, shared artists, and a full audio-feature breakdown.",
    sizeClass: "h-[62vh] w-auto aspect-[1276/1394] self-center",
    href: "https://main.d100dmsfe3uycb.amplifyapp.com/",
    images: [
      "/projects/matching-beats/deep-dive.jpeg",
      "/projects/matching-beats/qr-scan.jpeg",
      "/projects/matching-beats/soulmates.jpeg",
    ],
  },
  {
    caption: "EVENT, 2026",
    title: "@ AWS Summit '26",
    note: "Understanding how companies are pivoting in this GenAI era.",
    sizeClass: "h-[46vh] w-[64vw] self-start md:mt-[10vh] md:w-[24vw]",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7467904514352680960/",
    images: ["/projects/aws-summit/booth.jpeg"],
  },
  {
    caption: "NOW, 2026",
    title: "Skye",
    note: "Link In Bio SaaS, coming soon",
    sizeClass: "h-[62vh] w-[80vw] self-center md:w-[34vw]",
    variant: "white",
  },
  {
    caption: "ACHIEVEMENT, 2024",
    title: "Google Cloud Certified — ML Engineer",
    note: "Professional Machine Learning Engineer certification.",
    sizeClass: "h-[56vh] w-[64vw] self-end md:mb-[8vh] md:w-[26vw]",
    href: "https://www.credly.com/badges/f1d59651-5343-4cb8-9d38-b6e00943c9db/email",
    images: ["/projects/gcp-ml-engineer/badge.png"],
    variant: "badge",
  },
  {
    caption: "GITHUB",
    sizeClass: "h-[30vh] w-[85vw] self-start md:mt-[16vh] md:h-[26vh] md:w-[46vw]",
    href: "https://github.com/SamEarth79",
    images: ["/projects/github/contributions.jpeg"],
    variant: "metrics",
    metrics: [
      { value: "500+", label: "PR" },
      { value: "53", label: "Repos" },
    ],
  },
];

/* Tile face: plain <article>; an underlined "Visit" link floats top-right when tile.href is set. */
function TileBody({ tile, index }: { tile: Tile; index: number }) {
  const isWhite = tile.variant === "white";
  const isBadge = tile.variant === "badge";
  const isMetrics = tile.variant === "metrics";
  const isLight = isWhite || isBadge;
  return (
    <article
      role={tile.href ? "link" : undefined}
      tabIndex={tile.href ? 0 : undefined}
      onClick={tile.href ? () => window.open(tile.href, "_blank", "noopener,noreferrer") : undefined}
      onKeyDown={tile.href ? (e) => { if (e.key === "Enter" || e.key === " ") window.open(tile.href, "_blank", "noopener,noreferrer"); } : undefined}
      className={`group relative flex flex-1 cursor-pointer flex-col justify-between overflow-hidden p-6 ${
        isLight ? "bg-offwhite text-navy" : "bg-navy text-offwhite"
      }`}
    >
      {isWhite && (
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <span className="font-display text-6xl font-bold uppercase tracking-tight sm:text-7xl">
            Skye
          </span>
        </div>
      )}
      {!isBadge && tile.images && (
        <div className="absolute inset-0 flex">
          {tile.images.slice(0, 2).map((src) => (
            <div key={src} className="relative flex-1">
              <Image
                src={src}
                alt=""
                fill
                sizes={isMetrics ? "(min-width: 768px) 46vw, 85vw" : "40vh"}
                quality={isMetrics ? 100 : undefined}
                className={
                  tile.images!.length === 1 && !isMetrics
                    ? "object-cover"
                    : "object-contain"
                }
              />
            </div>
          ))}
          <div className={`absolute inset-0 bg-gradient-to-t from-navy via-navy/20 ${isMetrics ? 'to-navy/85' : 'to-navy/55'}`} />
        </div>
      )}

      <div className="relative z-10 flex items-center justify-between">
        <span className="font-display text-sm text-accent">
          {String(index + 1).padStart(2, "0")}
        </span>
        {tile.href && (
          <a
            href={tile.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 text-xs tracking-[0.02em] underline underline-offset-4 hover:text-accent"
          >
            Visit
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </a>
        )}
      </div>
      {isBadge && tile.images && (
        <div className="relative z-10 flex flex-1 items-center justify-center py-4">
          <div className="relative h-28 w-28 sm:h-36 sm:w-36">
            <Image
              src={tile.images[0]}
              alt=""
              fill
              sizes="10rem"
              className="object-contain"
            />
          </div>
        </div>
      )}
      {isMetrics ? (
        <div className="relative z-10 mt-4 pt-8 flex flex-wrap items-end gap-x-6 gap-y-2">
          {tile.metrics?.map((m) => (
            <div key={m.label} className="flex flex-col">
              <span className="font-display text-3xl font-bold leading-none tracking-tight sm:text-4xl">
                {m.value}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-offwhite/80">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative z-10 flex flex-col gap-2">
          {!isWhite && tile.title && (
            <h3 className="font-display text-2xl font-bold uppercase leading-none tracking-tight sm:text-3xl">
              {tile.title}
            </h3>
          )}
          {tile.note && (
            <p
              className={`max-w-xs text-sm ${
                isLight ? "text-navy/60" : "text-offwhite/60"
              }`}
            >
              {tile.note}
            </p>
          )}
        </div>
      )}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-10 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
      />
    </article>
  );
}

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
      const section = rootRef.current!;
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
            trigger: section,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        }
      );

      // Pinned phase: continue across the full track, while the theme
      // gradually inverts from dark olive back to the warm light theme.
      const pinned = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      pinned
        .fromTo(
          track,
          { x: 0 },
          { x: () => -getDistance(), ease: "none", immediateRender: false },
          0
        )
        .to(
          section,
          {
            backgroundColor: "#eeeae2",
            color: "#14130f",
            "--sc-contour": "#14130f",
            ease: "none",
          },
          0
        );

      // Exit: mirror the entry glide — tiles keep drifting left as the
      // section scrolls away, instead of freezing the instant the pin ends.
      gsap.fromTo(
        track,
        { x: () => -getDistance() },
        {
          x: () => -getDistance() - window.innerWidth * 0.55,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: () => `top top-=${getDistance()}`,
            end: () => `top top-=${getDistance() + window.innerHeight}`,
            scrub: true,
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
      id="showcase"
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-olive text-offwhite md:h-screen"
      style={{ "--sc-contour": "var(--color-fg)" } as React.CSSProperties}
    >
      <ContourField stroke="var(--sc-contour)" />

      <div className="absolute top-14 left-6 z-10 sm:left-10">
        <p className="text-[10px] uppercase tracking-[0.35em] opacity-50">
          Selected Work
        </p>
        <h2 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-6xl">
          Showcase
        </h2>
      </div>

      <div
        ref={trackRef}
        className="relative z-10 flex w-full flex-col items-stretch gap-10 px-6 py-32 md:h-full md:w-max md:flex-row md:items-stretch md:gap-[7vw] md:py-0 md:pl-[48vw] md:pr-[22vw]"
      >
        {TILES.map((tile, i) => (
          <div key={tile.title} className="contents">
            <figure className={`flex shrink-0 flex-col gap-3 ${tile.sizeClass}`}>
              <figcaption className="text-[10px] uppercase tracking-[0.3em] opacity-50">
                {tile.caption}
              </figcaption>
              <TileBody tile={tile} index={i} />
            </figure>
          </div>
        ))}
      </div>
    </section>
  );
}
