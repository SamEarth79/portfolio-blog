# Architecture: Typing Challenge

## Approach
A static route `/race` renders one client component holding a small state machine: idle, racing, finished. A requestAnimationFrame loop reads elapsed time from a timestamp and drives both the countdown and the simulation. No new dependencies; the graph is hand written SVG.

## Components touched
- **Frontend**: new `src/app/race/page.tsx`; new `src/components/race/` (TypingRace, TypingPanel, Results, WpmChart); new `src/lib/race/` (passages, ghost, scoring); `Nav.tsx` edit.
- **Backend**: none
- **Infrastructure**: none

## Data flow
1. Mount (client only, avoiding hydration mismatch) picks a random passage and seed and builds the ghost run. Retry and Restart rebuild it.
2. First keystroke records the start time.
3. Each frame: remaining time, then apply every ghost keystroke whose timestamp has passed.
4. Visitor stats are sampled once per second.
5. At 30s input locks and results render from both sample series.

## Data model changes
None.

## Key decisions
- **Decision**: net WPM = correct characters / 5 / minutes; accuracy = correct keystrokes / all keystrokes.
  **Rationale**: comparable to Monkeytype, so 91 means the same thing for both sides.
- **Decision**: the ghost is a pregenerated `{t, key}[]` list from pure `generateGhost(passage, seed)`, fed through the same `applyKey` and scoring as the visitor.
  **Rationale**: testable, reproducible, never drifts; real recordings could replace it later.
- **Decision**: seeded PRNG (mulberry32); target 88 to 94 WPM weighted to 91 (correct chars = round(wpm x 2.5)); smooth pace drift 0.85 to 1.15 every 3 to 7s with warm up; per word and key delay weights with jitter; 2 to 5 typos, mostly backspaced; timestamps scaled so the target is reached just before 30s and later keys dropped.
  **Rationale**: varied but bounded runs.

## Wireframe reconciliation
- 2026-11-25: ghost changed from fixed curve to generator (Data flow, Key decisions rewritten; `results.ghost-wpm`). Self reviewed: no new security surface.

## Security
Self reviewed (no specialist sign off): client only, no input is persisted, sent or rendered as HTML.
