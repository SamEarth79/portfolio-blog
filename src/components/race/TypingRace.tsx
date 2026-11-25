"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import ContourField from "@/components/ContourField";
import Results from "@/components/race/Results";
import TypingText from "@/components/race/TypingText";
import { generateGhost } from "@/lib/race/ghost";
import { PASSAGES } from "@/lib/race/passages";
import { lenisRef } from "@/lib/lenis";
import {
  EMPTY_TYPING,
  RACE_MS,
  applyKey,
  getStats,
  replay,
  type Keystroke,
} from "@/lib/race/scoring";

type Run = { id: number; passage: string; ghost: Keystroke[] };
type Phase = "ready" | "racing" | "done";

// Randomness must stay in the browser: on the server it would be frozen into
// the static page and mismatch on hydration.
function createRun(id: number): Run {
  const passage = PASSAGES[Math.floor(Math.random() * PASSAGES.length)];
  const seed = Math.floor(Math.random() * 2 ** 32);
  return { id, passage, ghost: generateGhost(passage, seed) };
}

function Panel({
  name,
  wpm,
  wf,
  isActive,
  onClick,
  children,
}: {
  name: string;
  wpm: number;
  wf: "player" | "ghost";
  isActive?: boolean;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <div
      data-wf={`race.${wf}-panel`}
      onClick={onClick}
      className={`relative min-w-0 rounded-lg border-2 bg-charcoal/40 p-[1.375rem] ${isActive ? "border-accent" : "border-offwhite/15"} ${onClick ? "cursor-text" : ""}`}
    >
      <div className="mb-3 flex justify-between text-xs uppercase tracking-[0.3em] text-offwhite/60">
        <span>{name}</span>
        <span data-wf={`race.${wf}-wpm`} className="tabular-nums">
          {wpm} WPM
        </span>
      </div>
      {children}
    </div>
  );
}

export default function TypingRace() {
  const [run, setRun] = useState<Run | null>(null);
  const [phase, setPhase] = useState<Phase>("ready");
  const [elapsed, setElapsed] = useState(0);
  const [player, setPlayer] = useState(EMPTY_TYPING);
  const [finalLog, setFinalLog] = useState<Keystroke[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const startRef = useRef<number | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);
  const logRef = useRef<Keystroke[]>([]);
  const playerRef = useRef(EMPTY_TYPING);

  const reset = useCallback(() => {
    startRef.current = null;
    logRef.current = [];
    playerRef.current = EMPTY_TYPING;
    setPlayer(EMPTY_TYPING);
    setElapsed(0);
    setPhase("ready");
    setRun((previous) => createRun((previous?.id ?? 0) + 1));
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(reset);
    return () => cancelAnimationFrame(frame);
  }, [reset]);

  // <html> has a fixed height, so Lenis can't see this page grow (results,
  // stacked panels) and would stop scrolling at the old limit
  useEffect(() => {
    const observer = new ResizeObserver(() => lenisRef.current?.resize());
    observer.observe(mainRef.current!);
    return () => observer.disconnect();
  }, []);

  const runId = run?.id;
  useEffect(() => {
    if (runId !== undefined) inputRef.current?.focus({ preventScroll: true });
  }, [runId]);

  useEffect(() => {
    if (phase !== "racing") return;
    let frame = 0;
    const tick = () => {
      const now = performance.now() - (startRef.current ?? 0);
      setElapsed(Math.min(now, RACE_MS));
      if (now >= RACE_MS) {
        setFinalLog([...logRef.current]);
        setPhase("done");
      } else {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") reset();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [phase, reset]);

  const ghostCount = run ? run.ghost.filter((k) => k.t <= elapsed).length : 0;
  const ghost = useMemo(
    () => (run ? replay(run.ghost.slice(0, ghostCount), run.passage) : EMPTY_TYPING),
    [run, ghostCount]
  );

  // Diffing the input's value (not keydown) also works with phone keyboards
  const handleInput = (value: string) => {
    if (!run || phase === "done") return;
    const previous = playerRef.current.typed;
    let shared = 0;
    while (shared < previous.length && previous[shared] === value[shared]) shared++;
    const keys = [
      ...Array<string>(previous.length - shared).fill("Backspace"),
      ...value.slice(shared),
    ];
    if (keys.length === 0) return;

    const now = performance.now();
    if (startRef.current === null) {
      if (keys[0] === "Backspace") return;
      startRef.current = now;
      setPhase("racing");
    }
    const t = now - startRef.current;
    if (t > RACE_MS) return;

    for (const key of keys) {
      playerRef.current = applyKey(playerRef.current, key, run.passage);
      logRef.current.push({ t, key });
    }
    setPlayer(playerRef.current);
  };

  const focusInput = () => inputRef.current?.focus({ preventScroll: true });
  const blockInsert = (e: React.SyntheticEvent) => e.preventDefault();
  const showFocusPrompt = phase === "racing" && !isFocused;

  return (
    <main ref={mainRef} className="relative flex min-h-screen flex-1 flex-col items-center overflow-hidden bg-olive text-offwhite">
      <ContourField stroke="var(--color-fg)" />
      <div
        className={`relative z-10 flex w-full flex-col items-center gap-6 px-6 pb-16 pt-28 sm:px-10 ${phase === "done" ? "max-w-6xl" : "max-w-[79.2rem]"}`}
      >
        {run && phase === "done" ? (
          <Results passage={run.passage} visitorLog={finalLog} ghostLog={run.ghost} onRetry={reset} />
        ) : (
          <>
            <h1 data-wf="race.heading" className="text-center font-serif text-4xl sm:text-6xl">
              Think you can beat me?
            </h1>
            {/* Invisible rather than removed, so the panels don't jump on start */}
            <p
              data-wf="race.timer"
              className={`font-display text-5xl font-bold tabular-nums text-accent ${phase === "ready" ? "invisible" : ""}`}
            >
              {Math.ceil((RACE_MS - elapsed) / 1000)}
            </p>
            {run && (
              <div className="grid w-full gap-4 md:grid-cols-2">
                <Panel
                  name="You"
                  wf="player"
                  wpm={getStats(player, run.passage, elapsed >= 1000 ? elapsed : 0).wpm}
                  isActive={isFocused}
                  onClick={focusInput}
                >
                  <input
                    ref={inputRef}
                    value={player.typed}
                    onChange={(e) => handleInput(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onSelect={(e) => {
                      const end = e.currentTarget.value.length;
                      e.currentTarget.setSelectionRange(end, end);
                    }}
                    onPaste={blockInsert}
                    onDrop={blockInsert}
                    aria-label="Type the passage here"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    className="pointer-events-none absolute left-0 top-0 h-full w-full text-base opacity-0"
                  />
                  <TypingText passage={run.passage} typed={player.typed} wf="race.player-text" />
                  {showFocusPrompt && (
                    <button
                      type="button"
                      data-wf="race.focus-prompt"
                      onClick={focusInput}
                      className="absolute inset-0 grid place-items-center rounded-lg bg-charcoal/90 text-sm"
                    >
                      Click or tap here to keep typing
                    </button>
                  )}
                </Panel>
                <Panel
                  name="Samarth"
                  wf="ghost"
                  wpm={getStats(ghost, run.passage, elapsed >= 1000 ? elapsed : 0).wpm}
                >
                  <TypingText passage={run.passage} typed={ghost.typed} wf="race.ghost-text" />
                </Panel>
              </div>
            )}
            {phase === "ready" ? (
              <p data-wf="race.start-hint" className="text-sm text-offwhite/60">
                Start typing to begin the race.
              </p>
            ) : (
              <button
                type="button"
                data-wf="race.restart"
                onClick={reset}
                className="rounded-md border border-offwhite/30 px-5 py-2 font-mona text-xs font-bold uppercase hover:border-offwhite"
              >
                Restart
              </button>
            )}
          </>
        )}
      </div>
    </main>
  );
}
