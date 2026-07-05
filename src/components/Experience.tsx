"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Chapter from "@/components/Chapter";
import ContourField from "@/components/ContourField";

gsap.registerPlugin(ScrollTrigger);

type Bullet = { label: string; text: string };
type Event = {
  period: string;
  title: string;
  org?: string;
  location?: string;
  note?: string;
  links?: { label: string; href: string }[];
  bullets?: Bullet[];
  tools?: string;
};

// Chronological, past -> present.
const EVENTS: Event[] = [
  {
    period: "The Spark",
    title: "Interest in Computers",
    note: "Where the curiosity started — taking machines apart just to see how they worked, and never quite putting the questions down.",
  },
  {
    period: "Foundation",
    title: "Computer Science Engineering",
    org: "B.E. — Computer Science",
    note: "Turned the curiosity into fundamentals: algorithms, systems, and a habit of building things end to end.",
  },
  {
    period: "Aug 2021 — Nov 2021",
    title: "Web Developer Intern",
    org: "MySmartShala",
    location: "Hubli, IN",
    bullets: [
      {
        label: "Secure Backend Systems",
        text: "Led development of a secure PDF e-signature system using Python and Flask, managing a team of four engineers and ensuring scalable, compliant workflows.",
      },
    ],
    tools: "Python, Flask",
  },
  {
    period: "Jan 2022 — May 2023",
    title: "Associate Software Engineer",
    org: "Toshiba Software India",
    location: "Bengaluru, IN",
    bullets: [
      {
        label: "Test Automation Framework",
        text: "Built a Python-based automation framework that reduced regression cycles by 40% and failures by 70%, improving build stability and release confidence.",
      },
      {
        label: "Developer Productivity Tools",
        text: "Reduced manual QA effort by 3× by automating workflows and developing internal CLI tools using Python and REST APIs.",
      },
    ],
    tools: "Python, REST APIs, Automation Frameworks",
  },
  {
    period: "May 2023 — Apr 2025",
    title: "Lead Full Stack Web Developer",
    org: "LionCircuits",
    location: "Bengaluru, IN",
    links: [
      { label: "Website 1", href: "#" }, // placeholder URL
      { label: "Website 2", href: "#" }, // placeholder URL
    ],
    bullets: [
      {
        label: "Large-Scale Product Development",
        text: "Led end-to-end development of distributed customer-facing and internal platforms, contributing 200+ production pull requests while supporting enterprise workflows and production traffic.",
      },
      {
        label: "Production AI (RAG) System",
        text: "Designed and deployed a scalable RAG-based AI system enabling vector search over 100k+ electronic components and internal documents, integrated with AWS Bedrock.",
      },
      {
        label: "E-Commerce Systems Architecture",
        text: "Designed and scaled latency-sensitive commerce systems (Cart, Payments, Invoicing) using Django REST Framework and React-Redux, supporting high-frequency transactional flows with reliable data consistency.",
      },
      {
        label: "SEO & Global Platform Scaling",
        text: "Built and operated a high-availability, SEO-optimized Next.js + Django platform on AWS serverless infrastructure, achieving page-1 Google search rankings while handling global production traffic.",
      },
    ],
    tools: "React, Next.js, Django, Redux, AWS (Serverless), Bedrock, Vector Databases",
  },
  {
    period: "Apr 2025 — Present",
    title: "DevOps Full Stack Web Developer",
    org: "Boston Consulting Group",
    location: "Bengaluru, IN",
    bullets: [
      {
        label: "B2B Platform Ownership",
        text: "Built and shipped distributed, production-grade B2B platforms used by international enterprise customers, owning frontend (React), backend (Django), and AWS infrastructure.",
      },
      {
        label: "Deployment Automation",
        text: "Implemented fault-tolerant CI/CD pipelines across existing applications using GitHub Actions, Docker, Nginx, and AWS, cutting deployment time by 40% and improving high-availability production releases.",
      },
      {
        label: "Google Cloud Certified",
        text: "Professional Machine Learning Engineer with hands-on experience building and scaling ML GenAI solutions on Google Cloud using production-ready MLOps practices.",
      },
    ],
    tools: "React, Django, AWS, GitHub Actions, Docker, Nginx",
  },
];

export default function Experience() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const listRef = useRef<HTMLOListElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const events = gsap.utils.toArray<HTMLElement>("[data-event]");

      if (prefersReducedMotion) {
        gsap.set(events, { opacity: 1, x: 0 });
        gsap.set(progressRef.current, { scaleY: 1 });
        return;
      }

      // Center line draws itself as the timeline scrolls through the viewport.
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 75%",
            end: "bottom 75%",
            scrub: true,
          },
        }
      );

      const mm = gsap.matchMedia();

      // Desktop: alternate cards in from their own side.
      mm.add("(min-width: 768px)", () => {
        events.forEach((el) => {
          const fromLeft = el.dataset.side === "left";
          gsap.fromTo(
            el,
            { opacity: 0, x: fromLeft ? -80 : 80 },
            {
              opacity: 1,
              x: 0,
              duration: 0.9,
              ease: "power4.out",
              scrollTrigger: { trigger: el, start: "top 80%" },
            }
          );
        });
      });

      // Mobile: everything slides in from the left of the rail.
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          events,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.05,
            scrollTrigger: { trigger: listRef.current, start: "top 80%" },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="block w-full">
      <Chapter background="warm">
        <ContourField />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-32 sm:px-10">
          <div className="flex flex-col gap-4">
            <p className="text-[10px] uppercase tracking-[0.35em] text-ink/50">
              The Path
            </p>
            <h2 className="font-display text-[12vw] font-bold uppercase leading-[0.9] tracking-tight text-ink sm:text-[7vw]">
              Experience
            </h2>
          </div>

          <ol ref={listRef} className="relative">
            {/* Base rail */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-[7px] top-0 h-full w-px bg-ink/15 md:left-1/2 md:-translate-x-1/2"
            />
            {/* Drawn accent rail */}
            <span
              ref={progressRef}
              aria-hidden="true"
              className="pointer-events-none absolute left-[7px] top-0 h-full w-px origin-top scale-y-0 bg-accent-deep md:left-1/2 md:-translate-x-1/2"
            />

            {EVENTS.map((e, i) => {
              const left = i % 2 === 0;
              return (
                <li
                  key={e.title}
                  data-event
                  data-side={left ? "left" : "right"}
                  className="relative mb-14 last:mb-0 md:mb-24 md:grid md:grid-cols-2 md:gap-x-16"
                >
                  {/* Node */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1.5 z-10 h-4 w-4 rounded-full border-2 border-accent-deep bg-warm md:left-1/2 md:-translate-x-1/2"
                  />

                  <div
                    className={`pl-10 md:pl-0 ${
                      left ? "md:col-start-1 md:pr-16" : "md:col-start-2 md:pl-16"
                    }`}
                  >
                    <div className="flex flex-col gap-3 border border-ink/10 bg-[#f5f2ea] p-6 sm:p-7">
                      <span className="font-display text-xs uppercase tracking-[0.2em] text-accent-deep">
                        {e.period}
                      </span>

                      <div className="flex flex-col gap-1">
                        <h3 className="font-display text-xl font-bold uppercase leading-tight tracking-tight text-ink sm:text-2xl">
                          {e.title}
                        </h3>
                        {e.org && (
                          <p className="font-serif text-base italic text-ink/70">
                            {e.org}
                            {e.location && (
                              <span className="not-italic text-ink/40">
                                {" "}
                                — {e.location}
                              </span>
                            )}
                          </p>
                        )}
                      </div>

                      {e.links && (
                        <div className="flex flex-wrap gap-2">
                          {e.links.map((l) => (
                            <a
                              key={l.label}
                              href={l.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full border border-ink/20 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-ink/60 transition-colors hover:border-accent-deep hover:text-accent-deep"
                            >
                              {l.label}
                            </a>
                          ))}
                        </div>
                      )}

                      {e.note && (
                        <p className="text-sm leading-relaxed text-ink/60">
                          {e.note}
                        </p>
                      )}

                      {e.bullets && (
                        <ul className="mt-1 flex flex-col gap-3">
                          {e.bullets.map((b) => (
                            <li
                              key={b.label}
                              className="text-sm leading-relaxed text-ink/60"
                            >
                              <span className="font-medium text-ink/90">
                                {b.label}:
                              </span>{" "}
                              {b.text}
                            </li>
                          ))}
                        </ul>
                      )}

                      {e.tools && (
                        <p className="mt-1 font-mono text-[11px] leading-relaxed text-ink/45">
                          {e.tools}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Chapter>
    </div>
  );
}
