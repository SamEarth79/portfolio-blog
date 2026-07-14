"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Chapter from "@/components/Chapter";

gsap.registerPlugin(ScrollTrigger);

const LinkedInIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const InstagramIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

const MailIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 7L2 7" />
  </svg>
);

const SOCIALS: {
  name: string;
  meta: string;
  href: string;
  icon: ReactNode;
}[] = [
  {
    name: "LinkedIn",
    meta: "2,000+ followers",
    href: "https://linkedin.com/in/samarthmm",
    icon: LinkedInIcon,
  },
  {
    name: "GitHub",
    meta: "500+ PRs · 53 Repos",
    href: "https://github.com/SamEarth79",
    icon: GitHubIcon,
  },
  {
    name: "Instagram",
    meta: "@samarth_m_",
    href: "https://www.instagram.com/samarth_m_",
    icon: InstagramIcon,
  },
  {
    name: "Mail",
    meta: "samarthmm.work@gmail.com",
    href: "mailto:samarthmm.work@gmail.com",
    icon: MailIcon,
  },
];

export default function Socials() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-social-row]");
      if (prefersReducedMotion) {
        gsap.set(rows, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        rows,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 60%",
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} id="connect" className="block w-full">
      <Chapter background="warm">

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-32 sm:px-10">
          <div className="flex flex-col gap-4">
            <p className="text-[10px] uppercase tracking-[0.35em] text-ink/50">
              Elsewhere
            </p>
            <h2 className="font-display text-[12vw] font-bold uppercase leading-[0.9] tracking-tight text-ink sm:text-[7vw]">
              Let&rsquo;s Collaborate
            </h2>
          </div>

          <ul className="flex flex-col border-t border-ink/15">
            {SOCIALS.map((social, i) => (
              <li key={social.name} data-social-row>
                <a
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group relative flex items-center gap-5 border-b border-ink/15 py-6 sm:gap-8 sm:py-8"
                >
                  <span className="font-display text-sm text-accent-deep sm:text-base">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="h-6 w-6 shrink-0 text-ink transition-colors duration-300 group-hover:text-accent-deep sm:h-7 sm:w-7">
                    {social.icon}
                  </span>

                  <span className="font-display text-3xl font-bold uppercase tracking-tight text-ink transition-transform duration-500 ease-out group-hover:translate-x-2 sm:text-5xl">
                    {social.name}
                  </span>

                  <span className="ml-auto hidden font-serif text-base italic text-ink/50 sm:block sm:text-lg">
                    {social.meta}
                  </span>

                  <span
                    aria-hidden="true"
                    className="text-ink transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:text-accent-deep"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </span>

                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-accent-deep transition-transform duration-500 ease-out group-hover:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-ink/40">
            <span className="font-serif tracking-[0.02em] normal-case text-sm">
              samarthmm.com
            </span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </Chapter>
    </div>
  );
}
