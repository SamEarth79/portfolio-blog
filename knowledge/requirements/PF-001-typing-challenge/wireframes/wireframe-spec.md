# Wireframe spec: Typing Challenge

Approved: 2026-11-25
Source files: race.html, results.html

## Screen: race

**Purpose**: Race the simulation for 30 seconds.
**Entry points**: Nav link, or /race directly
**Reuses**: Nav

### Layout

Nav, heading, countdown, two panels (side by side; stacked under 700px), footer hint or Restart. Long text scrolls to keep the caret line in view.

### Elements

| `data-wf` | Type | Label / copy | States shown in | Bound to | Reuses |
|---|---|---|---|---|---|
| `race.nav-link` | link | Race Me | all | /race | Nav |
| `race.heading` | heading | Think you can beat me? | ready, racing | — | — |
| `race.timer` | text | 30 counting down | ready, racing | elapsed time | — |
| `race.player-panel` | region | You | all | visitor state | — |
| `race.player-wpm` | text | N WPM | ready, racing | visitor score | — |
| `race.player-text` | text | passage | ready, racing | visitor state | — |
| `race.ghost-panel` | region | Samarth | all | ghost state | — |
| `race.ghost-wpm` | text | N WPM | all | ghost score | — |
| `race.ghost-text` | text | passage | all | ghost state | — |
| `race.start-hint` | text | Start typing to begin the race. | ready | — | — |
| `race.restart` | button | Restart | racing | — | — |
| `race.focus-prompt` | button | Click or tap here to keep typing | unfocused | input focus | — |

### States

- **ready**: timer 30, both WPM 0, start hint, no Restart.
- **racing**: countdown, live WPM, typos highlighted, Restart.
- **unfocused** (during a race): player panel shows the focus prompt; ghost and timer continue.

### Interactions

- First keystroke starts timer and ghost.
- `race.restart` or Esc: new passage and run, back to ready.
- `race.focus-prompt`: refocus the input.
- Timer reaching 0 shows results.

## Screen: results

**Purpose**: Compare both results and retry.
**Entry points**: Race timer reaching 0 (same route)
**Reuses**: none

### Layout

Verdict, GIF slot, two stat cards (side by side; stacked on phones), chart, actions. Winner card has the heavier border (neither on a tie).

### Elements

| `data-wf` | Type | Label / copy | States shown in | Bound to | Reuses |
|---|---|---|---|---|---|
| `results.verdict` | heading | see States | all | score comparison | — |
| `results.gif` | image slot | GIF placeholder, picked by your WPM | all | GIF tier | — |
| `results.player-card` | region | You | all | visitor result | — |
| `results.player-wpm` | text | N WPM | all | visitor | — |
| `results.player-accuracy` | text | Accuracy N% | all | visitor | — |
| `results.player-chars` | text | Characters (correct / wrong) | all | visitor | — |
| `results.player-time` | text | Time 30s | all | visitor | — |
| `results.ghost-card` | region | Samarth (plus Time 30s) | all | ghost result | — |
| `results.ghost-wpm` | text | N WPM | all | ghost | — |
| `results.ghost-accuracy` | text | Accuracy N% | all | ghost | — |
| `results.ghost-chars` | text | Characters (correct / wrong) | all | ghost | — |
| `results.chart` | chart | WPM over time; legend You (solid), Samarth (dashed) | all | per second samples | — |
| `results.retry` | button | Try again | all | — | — |
| `results.home` | link | Back to portfolio | all | / | — |

### States

- **loss**: "I win this one."
- **win**: "Okay, you beat me."
- **tie**: "Dead heat. Rematch?"

Comparison is on rounded WPM against this run's ghost score. GIF tiers: under 60; 60 up to below ghost; equal or above ghost.

### Interactions

- `results.retry`: new passage and run, ready state.
- `results.home`: go to /.

## Element index

- `race.focus-prompt`
- `race.ghost-panel`
- `race.ghost-text`
- `race.ghost-wpm`
- `race.heading`
- `race.nav-link`
- `race.player-panel`
- `race.player-text`
- `race.player-wpm`
- `race.restart`
- `race.start-hint`
- `race.timer`
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
- `results.retry`
- `results.verdict`

## Implementation deviations

- 2026-11-26 (user request): `race.timer` is hidden in the ready state and appears when the race starts. Typing panels are about 10% larger than first built.
- 2026-11-26 (user request): `results.subtext` added under `results.verdict`: a random line per score tier, with no back to back repeat in a tier. Copy lives in `src/lib/race/subtexts.ts`.
- 2026-11-26 (user request): the tie copy for `results.verdict` is "Tie!!! Again?" (was "Dead heat. Rematch?").
