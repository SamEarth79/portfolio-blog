# Analysis: Typing Challenge

## Summary
A client only 30s typing race against a simulation of about 91 WPM. See gather.md.

> Quick pass: analysis done inline, without the seven specialist agents.

## Relevant existing code
- `src/app/layout.tsx`: global Nav and SmoothScroll wrap every route, so the new page inherits both.
- `src/components/Nav.tsx`: Projects and Collaborate call `preventDefault` and Lenis scroll to home page hashes.
- `src/app/globals.css`: colour and font tokens; scrollbars hidden.
- `src/components/Showcase.tsx`: pinned ScrollTrigger on the home page.

## Constraints and risks
- Off the home page, existing nav links would do nothing. They must navigate to `/#showcase` and `/#connect`.
- A third nav item will collide on phones: links are absolutely positioned (`right-[210px]`).
- Client side navigation to and from the pinned home page needs verifying (GSAP cleanup, Lenis re-measure, hash landing).
- Mobile keyboards need a real focused input with autocorrect and autocapitalise off. Spacebar must not scroll the page.
- Timer must use elapsed timestamps, not interval counts, so background tabs don't drift.

## Engineering audit
- note: no test setup or CI checks exist. Keep scoring as pure functions. Engineering baseline skipped for this quick pass.

## Open questions
- GIF assets and tiers.
