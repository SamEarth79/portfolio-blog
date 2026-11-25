# Gather: Typing Challenge

## Feature summary
A page on the portfolio where a visitor races Samarth's typing speed. "Think you can beat me?" heading, two panels side by side: the visitor types on the left, a simulation of Samarth (around 91 WPM, varying each run) types on the right. A 30 second race ends in a results screen comparing both, with a score-based GIF.

## User flows
1. Visitor clicks the nav entry and lands on a new page.
2. On page load one passage is picked at random from a pool of 4 to 6 and a fresh simulation run is generated. Retry and Restart (button or Esc) generate a new one.
3. The first keystroke starts a shared 30s timer and the simulation.
4. Visitor types (mistakes allowed, shown in red, backspace works).
5. At 0s both stop together. Results screen: both sides' stats, WPM over time graph, GIF slot based on the visitor's score.
6. Visitor can retry.

## Scope boundaries
### In scope
- Nav entry, new route, race screen, results screen with graph and GIF placeholder
### Out of scope
- Leaderboard, saved scores, accounts, backend, sharing, final GIF assets, other durations or modes

## Business rules
1. Each run, the simulation finishes at a random 88 to 94 WPM, weighted towards 91, with 94 to 98% accuracy and varying pace and typos.
5. The verdict compares the visitor with the simulation's score for that run.
2. Race lasts exactly 30s for both sides.
3. Pool of 4 to 6 fixed passages, one random per run.
4. Monkeytype style typo handling.

## Wireframe decisions
- 2026-11-25: subheading removed (`race.subheading`).
- 2026-11-25: simulation score varies per run; verdict and GIF tiers are relative to it (`results.verdict`, `results.gif`, `results.ghost-wpm`).

## Security & reliability constraints
1. Client only. No data collected, stored or sent.

## Technical & integration constraints
1. Next.js 16.2.10, React 19, Tailwind 4. Read bundled Next docs before coding.
2. Match the existing visual system (olive/charcoal, lime accent, Fraunces, Space Grotesk, Mona Sans).

## Key decisions made
- Fixed 30s timer, not "first to finish".
- Results include a two line WPM graph (reference: Monkeytype screenshot).

## Deferred / open questions
- GIF assets and score tiers (placeholder tiers until decided).
- Defaults pending review: timer starts on first keystroke; paste blocked; passages long enough (about 600+ characters) that nobody runs out in 30s; panels stack on mobile.
