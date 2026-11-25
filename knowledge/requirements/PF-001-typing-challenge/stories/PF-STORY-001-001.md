# PF-STORY-001-001: Race page and engine

## Description

As a visitor, I want to race a simulation of Samarth for 30 seconds, so that I can test my typing against his.

## Acceptance criteria

1. /race shows the ready state: `race.heading` "Think you can beat me?", `race.timer` hidden until the race starts, `race.player-panel` and `race.ghost-panel` with the same passage and 0 WPM, `race.start-hint` "Start typing to begin the race.", no subheading.
2. Passage pool (4 to 6, at least 600 characters each) and a seeded ghost run are prepared client side on load: 88 to 94 WPM, 94 to 98% accuracy, varied pace and typos, built as in architecture.md.
3. The first keystroke starts timer and ghost; `race.player-wpm`, `race.ghost-wpm`, `race.player-text` and `race.ghost-text` update live; `race.restart` replaces the hint.
4. Typos are highlighted, the cursor advances, backspace fixes them; Space doesn't scroll; the caret line stays visible; paste and drop are blocked.
5. `race.restart` or Esc returns to ready with a new run. On lost focus `race.focus-prompt` "Click or tap here to keep typing" shows while the race continues.
6. At 30s real time (including after backgrounding) both stop and input locks.
7. Panels stack under 700px with no sideways scroll; mobile keyboards have autocorrect and autocapitalise off.
8. Scoring follows architecture.md, as shared pure functions used by both sides.

## Wireframe

- Screen: `race`
  - `race.focus-prompt`
  - `race.ghost-panel`
  - `race.ghost-text`
  - `race.ghost-wpm`
  - `race.heading`
  - `race.player-panel`
  - `race.player-text`
  - `race.player-wpm`
  - `race.restart`
  - `race.start-hint`
  - `race.timer`

## Operation Qualities

- PF-OQ-001-F03
- PF-OQ-001-F04
- PF-OQ-001-F05
- PF-OQ-001-F06
- PF-OQ-001-F07
- PF-OQ-001-F08
- PF-OQ-001-F09
- PF-OQ-001-F13
- PF-OQ-001-B01
- PF-OQ-001-B02
- PF-OQ-001-B03
- PF-OQ-001-B04

## Requirements implemented

- User flows 2 to 4; Business rules 1 to 5; Defaults

## Depends on


## Agents likely needed

- [x] frontend
- [ ] backend
- [ ] infrastructure

## Status

- [x] Implemented
- [x] Tested
- [x] Committed
