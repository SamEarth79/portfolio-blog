export const RACE_MS = 30_000;

export type Keystroke = { t: number; key: string };

export type TypingState = {
  typed: string;
  keystrokes: number;
  correctKeystrokes: number;
};

export type Stats = {
  wpm: number;
  accuracy: number;
  correct: number;
  wrong: number;
};

export type Tier = "low" | "mid" | "high";

export const EMPTY_TYPING: TypingState = {
  typed: "",
  keystrokes: 0,
  correctKeystrokes: 0,
};

export function applyKey(
  state: TypingState,
  key: string,
  passage: string
): TypingState {
  if (key === "Backspace") {
    return { ...state, typed: state.typed.slice(0, -1) };
  }
  if (state.typed.length >= passage.length) return state;
  const isCorrect = passage[state.typed.length] === key;
  return {
    typed: state.typed + key,
    keystrokes: state.keystrokes + 1,
    correctKeystrokes: state.correctKeystrokes + (isCorrect ? 1 : 0),
  };
}

export function replay(log: Keystroke[], passage: string, untilMs = RACE_MS) {
  let state = EMPTY_TYPING;
  for (const { t, key } of log) {
    if (t > untilMs) break;
    state = applyKey(state, key, passage);
  }
  return state;
}

export function getStats(
  state: TypingState,
  passage: string,
  elapsedMs: number
): Stats {
  let correct = 0;
  for (let i = 0; i < state.typed.length; i++) {
    if (state.typed[i] === passage[i]) correct++;
  }
  return {
    correct,
    wrong: state.typed.length - correct,
    wpm: elapsedMs > 0 ? Math.round(correct / 5 / (elapsedMs / 60_000)) : 0,
    accuracy: state.keystrokes
      ? Math.round((state.correctKeystrokes / state.keystrokes) * 100)
      : 0,
  };
}

/** Net WPM at the end of each second of the race. */
export function wpmSeries(log: Keystroke[], passage: string): number[] {
  return Array.from({ length: RACE_MS / 1000 }, (_, i) => {
    const ms = (i + 1) * 1000;
    return getStats(replay(log, passage, ms), passage, ms).wpm;
  });
}

export function scoreTier(visitorWpm: number, ghostWpm: number): Tier {
  if (visitorWpm >= ghostWpm) return "high";
  return visitorWpm < 60 ? "low" : "mid";
}
