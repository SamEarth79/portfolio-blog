# PF-STORY-001-002: Results screen

## Description

As a visitor, I want to see how I did against Samarth, so that I know who won and can retry.

## Acceptance criteria

1. When the race ends, `results.verdict` shows "I win this one.", "Okay, you beat me." or "Tie!!! Again?" by comparing rounded WPM with this run's ghost; the winner's card is emphasised, neither on a tie.
2. `results.player-card` and `results.ghost-card` show WPM, accuracy, characters (correct / wrong) and Time 30s.
3. `results.chart` is hand written SVG with per second WPM, You (solid) and Samarth (dashed), and no new dependency.
4. `results.gif` is a placeholder with three tiers: under 60; 60 up to below ghost; equal or above ghost.
5. `results.retry` "Try again" gives a fresh ready state; `results.home` "Back to portfolio" opens /.
6. Cards stack on phones with no sideways scroll.

## Wireframe

- Screen: `results`
  - `results.chart`
  - `results.ghost-accuracy`
  - `results.ghost-card`
  - `results.ghost-chars`
  - `results.ghost-wpm`
  - `results.gif`
  - `results.home`
  - `results.player-accuracy`
  - `results.player-card`
  - `results.player-chars`
  - `results.player-time`
  - `results.player-wpm`
  - `results.subtext`
  - `results.retry`
  - `results.verdict`

## Operation Qualities

- PF-OQ-001-F10
- PF-OQ-001-F11
- PF-OQ-001-F12
- PF-OQ-001-F13
- PF-OQ-001-B04
- PF-OQ-001-B05

## Requirements implemented

- User flows 5 and 6; Business rule 5

## Depends on

- PF-STORY-001-001

## Agents likely needed

- [x] frontend
- [ ] backend
- [ ] infrastructure

## Status

- [x] Implemented
- [x] Tested
- [x] Committed
