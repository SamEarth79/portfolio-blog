import { RACE_MS, type Keystroke } from "./scoring.ts";

const KEY_NEIGHBOURS: Record<string, string> = {
  a: "sqz", b: "vgn", c: "xdv", d: "sfe", e: "wrd", f: "dgr", g: "fht",
  h: "gjy", i: "uok", j: "hku", k: "jli", l: "ko", m: "nj", n: "bmh",
  o: "ipl", p: "o", q: "wa", r: "etf", s: "adw", t: "ryg", u: "yij",
  v: "cbf", w: "qes", x: "zcs", y: "tuh", z: "xa",
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), a | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Random = () => number;

const between = (random: Random, min: number, max: number) =>
  min + random() * (max - min);

const intBetween = (random: Random, min: number, max: number) =>
  Math.floor(between(random, min, max + 1));

// A speed multiplier that wanders smoothly, starting slow while warming up.
function createPaceDrift(random: Random) {
  const points = [{ t: 0, v: between(random, 0.85, 1.15) }];
  while (points[points.length - 1].t < RACE_MS * 2) {
    points.push({
      t: points[points.length - 1].t + between(random, 3000, 7000),
      v: between(random, 0.85, 1.15),
    });
  }
  return (t: number) => {
    const next = points.findIndex((p) => p.t > t);
    const a = points[next - 1] ?? points[points.length - 1];
    const b = points[next] ?? a;
    const progress = b === a ? 0 : (t - a.t) / (b.t - a.t);
    const eased = (1 - Math.cos(Math.PI * progress)) / 2;
    const warmUp = 0.65 + 0.35 * Math.min(t / 2500, 1);
    return (a.v + (b.v - a.v) * eased) * warmUp;
  };
}

type Typo = { wrongChars: number; followChars: number; isFixed: boolean };

// Spreads typos over the part of the passage the run will definitely cover,
// leaving a clean tail so the correct-character count only rises at the end.
function planTypos(random: Random, targetChars: number) {
  const typoCount = intBetween(random, 2, 5);
  const wrongCounts = new Array<number>(typoCount).fill(1);
  const totalWrong = intBetween(random, 5, Math.min(12, typoCount * 3));
  for (let extra = totalWrong - typoCount; extra > 0; ) {
    const i = intBetween(random, 0, typoCount - 1);
    if (wrongCounts[i] < 3) {
      wrongCounts[i]++;
      extra--;
    }
  }

  const slot = Math.floor((targetChars - 20) / typoCount);
  let unfixedLeft = intBetween(random, 0, 2);
  return new Map<number, Typo>(
    wrongCounts.map((wrongChars, i) => {
      const at = 5 + i * slot + intBetween(random, 0, slot - 8);
      const isFixed = !(wrongChars === 1 && unfixedLeft > 0 && random() < 0.5);
      if (!isFixed) unfixedLeft--;
      return [at, { wrongChars, followChars: intBetween(random, 0, 2), isFixed }];
    })
  );
}

function neighbourOf(char: string, random: Random) {
  const options = KEY_NEIGHBOURS[char.toLowerCase()] ?? "nmbv";
  return options[Math.floor(random() * options.length)];
}

/**
 * Builds every keystroke of one simulated 30s run. The same seed and passage
 * always produce the same run.
 */
export function generateGhost(passage: string, seed: number): Keystroke[] {
  const random = mulberry32(seed);
  const targetWpm = Math.round((between(random, 88, 94) + between(random, 88, 94)) / 2);
  const targetChars = Math.round(targetWpm * (RACE_MS / 60_000) * 5);
  const typos = planTypos(random, targetChars);
  const drift = createPaceDrift(random);
  const baseDelay = RACE_MS / (targetChars * 1.15);

  const events: Keystroke[] = [];
  const typed: string[] = [];
  let clock = 0;
  let correct = 0;
  let wordFactor = 1;

  const press = (key: string, delay: number) => {
    clock += (delay * between(random, 0.75, 1.25)) / drift(clock);
    events.push({ t: clock, key });
    if (key === "Backspace") {
      const position = typed.length - 1;
      if (typed.pop() === passage[position]) correct--;
    } else {
      if (key === passage[typed.length]) correct++;
      typed.push(key);
    }
  };

  const typeNext = () => {
    const position = typed.length;
    const char = passage[position];
    if (position === 0 || passage[position - 1] === " ") {
      const wordLength = `${passage.slice(position)} `.indexOf(" ");
      const lengthFactor = wordLength <= 3 ? 0.85 : wordLength >= 8 ? 1.15 : 1;
      wordFactor = lengthFactor * between(random, 0.85, 1.15);
      if (random() < 0.08) wordFactor *= 1.2;
    }
    const keyFactor = /[A-Z.,;:'?!-]/.test(char) ? 1.5 : char === " " ? 1.15 : 1;
    press(char, baseDelay * wordFactor * keyFactor);
  };

  while (correct < targetChars && typed.length < passage.length) {
    const typo = typos.get(typed.length);
    if (!typo) {
      typeNext();
      continue;
    }
    typos.delete(typed.length);
    const start = typed.length;
    for (let i = 0; i < typo.wrongChars; i++) {
      press(neighbourOf(passage[typed.length], random), baseDelay);
    }
    if (!typo.isFixed) continue;
    for (let i = 0; i < typo.followChars; i++) typeNext();
    let delay = baseDelay * 2.5;
    while (typed.length > start) {
      press("Backspace", delay);
      delay = baseDelay * 0.7;
    }
  }

  const finishAt = between(random, RACE_MS - 200, RACE_MS - 10);
  const scale = finishAt / clock;
  return events.map(({ t, key }) => ({ t: t * scale, key }));
}
