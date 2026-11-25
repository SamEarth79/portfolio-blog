# PF-001-typing-challenge — Backend Operation Qualities (OQs)

Status: `approved`

> There is no server. These cover the pure client logic and become unit tests.

## PF-OQ-001-B01: Ghost score range

- **Linked stories:** PF-STORY-001-001
- **Kind:** backend
- **Given:** many seeds across every passage
- **When:** a run is generated and scored at 30s
- **Then:** WPM is 88 to 94, centred on 91, and accuracy 94 to 98%
- **Covers:** business rule 1

## PF-OQ-001-B02: Ghost reproducible and varied

- **Linked stories:** PF-STORY-001-001
- **Kind:** backend
- **Given:** a passage
- **When:** runs are generated with equal and different seeds
- **Then:** equal seeds give identical runs, different seeds differ; timestamps strictly increase and stay under 30000ms; pace and typo positions vary
- **Covers:** business rule 1

## PF-OQ-001-B03: Passage pool

- **Linked stories:** PF-STORY-001-001
- **Kind:** backend
- **Given:** the passage pool
- **When:** it is checked
- **Then:** it holds 4 to 6 passages of at least 600 characters, typeable on a standard keyboard, and one is picked at random
- **Covers:** business rule 3

## PF-OQ-001-B04: Scoring

- **Linked stories:** PF-STORY-001-001, PF-STORY-001-002
- **Kind:** backend
- **Given:** keystrokes including mistakes and backspaces
- **When:** scored
- **Then:** net WPM = correct characters / 5 / minutes; accuracy = correct keystrokes / all character keystrokes (backspaced mistakes still count against it); no input gives 0 WPM without errors; the same function scores both sides
- **Covers:** gather business rules 2, 4

## PF-OQ-001-B05: GIF tier

- **Linked stories:** PF-STORY-001-002
- **Kind:** backend
- **Given:** visitor and ghost scores
- **When:** a tier is picked
- **Then:** under 60 is low; 60 up to below ghost is mid; equal or above ghost is high
- **Covers:** results `results.gif`

