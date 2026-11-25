# PF-001-typing-challenge — Frontend Operation Qualities (OQs)

Status: `approved`

## PF-OQ-001-F01: Nav entry opens race

- **Linked stories:** PF-STORY-001-003
- **Kind:** frontend
- **Given:** a visitor on the home page, desktop or 375px wide
- **When:** they click "Race Me"
- **Then:** /race opens; nav items do not overlap
- **Covers:** `race.nav-link`; gather User flows 1

## PF-OQ-001-F02: Existing nav links work from /race

- **Linked stories:** PF-STORY-001-003
- **Kind:** frontend
- **Given:** a visitor on /race
- **When:** they click Projects or Let's Collaborate
- **Then:** the home page opens at that section; Back to the race and home again keeps home scrolling and pinning intact
- **Covers:** gather In scope

## PF-OQ-001-F03: Ready state

- **Linked stories:** PF-STORY-001-001
- **Kind:** frontend
- **Given:** /race has just loaded
- **When:** nothing is typed
- **Then:** "Think you can beat me?", timer hidden, both 0 WPM, the same passage in both panels, "Start typing to begin the race.", no Restart, no subheading, and the ghost does not move
- **Covers:** race ready: `race.heading`, `race.timer`, `race.player-panel`, `race.player-wpm`, `race.player-text`, `race.ghost-panel`, `race.ghost-wpm`, `race.ghost-text`, `race.start-hint`

## PF-OQ-001-F04: First keystroke starts the race

- **Linked stories:** PF-STORY-001-001
- **Kind:** frontend
- **Given:** the ready state
- **When:** the visitor types one character
- **Then:** timer and ghost start together, live WPM updates, Restart appears and the hint disappears
- **Covers:** race racing; gather User flows 3

## PF-OQ-001-F05: Typos and backspace

- **Linked stories:** PF-STORY-001-001
- **Kind:** frontend
- **Given:** a running race
- **When:** the visitor types a wrong key (including Space), continues, then backspaces and fixes it
- **Then:** the cursor advances past the mistake, which is highlighted until corrected; Space does not scroll the page; long text keeps the caret line visible
- **Covers:** race racing: `race.player-text`; business rule 4

## PF-OQ-001-F06: Paste is blocked

- **Linked stories:** PF-STORY-001-001
- **Kind:** frontend
- **Given:** a ready or running race
- **When:** text is pasted or dropped into the input
- **Then:** nothing is entered and the timer does not start
- **Covers:** gather Defaults

## PF-OQ-001-F07: Restart

- **Linked stories:** PF-STORY-001-001
- **Kind:** frontend
- **Given:** a running race
- **When:** the visitor presses Restart or Esc
- **Then:** ready state returns with cleared stats and a newly generated run
- **Covers:** `race.restart`; gather User flows

## PF-OQ-001-F08: Lost focus

- **Linked stories:** PF-STORY-001-001
- **Kind:** frontend
- **Given:** a running race
- **When:** the input loses focus
- **Then:** "Click or tap here to keep typing" shows, ghost and timer continue, and activating it resumes typing
- **Covers:** race unfocused: `race.focus-prompt`

## PF-OQ-001-F09: 30s end

- **Linked stories:** PF-STORY-001-001
- **Kind:** frontend
- **Given:** a running race, including in a tab that was backgrounded
- **When:** 30s of real time passes
- **Then:** both stop together, input is ignored and results show
- **Covers:** business rule 2; `race.timer`

## PF-OQ-001-F10: Results content

- **Linked stories:** PF-STORY-001-002
- **Kind:** frontend
- **Given:** a finished race
- **When:** results render
- **Then:** verdict, GIF placeholder, both cards with WPM, accuracy, characters and Time 30s, and a chart with You and Samarth lines; ghost figures match what was shown in the race
- **Covers:** `results.verdict`, `results.gif`, `results.player-card`, `results.player-wpm`, `results.player-accuracy`, `results.player-chars`, `results.player-time`, `results.ghost-card`, `results.ghost-wpm`, `results.ghost-accuracy`, `results.ghost-chars`, `results.chart`

## PF-OQ-001-F11: Verdict outcomes

- **Linked stories:** PF-STORY-001-002
- **Kind:** frontend
- **Given:** results where the visitor's rounded WPM is below, above or equal to this run's ghost
- **When:** results render
- **Then:** "I win this one.", "Okay, you beat me." or "Tie!!! Again?" respectively; the winner's card is emphasised, neither on a tie
- **Covers:** results loss, win, tie; business rule 5

## PF-OQ-001-F12: Retry and home

- **Linked stories:** PF-STORY-001-002
- **Kind:** frontend
- **Given:** the results screen
- **When:** "Try again" or "Back to portfolio" is used
- **Then:** Try again gives a fresh ready state with a new run; Back to portfolio opens /
- **Covers:** `results.retry`, `results.home`

## PF-OQ-001-F13: Phone layout

- **Linked stories:** PF-STORY-001-001, PF-STORY-001-002
- **Kind:** frontend
- **Given:** a 375px viewport
- **When:** the race and results are used with the on screen keyboard
- **Then:** panels stack, nothing scrolls sideways, tapping focuses typing without autocorrect or autocapitalise
- **Covers:** gather Defaults

