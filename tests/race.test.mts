import { test } from "node:test";
import assert from "node:assert/strict";
import { generateGhost } from "../src/lib/race/ghost.ts";
import { GIFS, pickGif } from "../src/lib/race/gifs.ts";
import { SUBTEXTS } from "../src/lib/race/subtexts.ts";
import { PASSAGES } from "../src/lib/race/passages.ts";
import {
  EMPTY_TYPING, RACE_MS, applyKey, getStats, scoreTier, replay, wpmSeries,
} from "../src/lib/race/scoring.ts";

const SEEDS = Array.from({ length: 2000 }, (_, i) => i * 7919 + 1);

// OQ: PF-OQ-001-B01
test("PF-OQ-001-B01: ghost scores 88 to 94 WPM at 94 to 98% accuracy", () => {
  for (const passage of PASSAGES) {
    let total = 0;
    for (const seed of SEEDS) {
      const stats = getStats(replay(generateGhost(passage, seed), passage), passage, RACE_MS);
      assert.ok(stats.wpm >= 88 && stats.wpm <= 94, `seed ${seed}: ${stats.wpm} wpm`);
      assert.ok(stats.accuracy >= 94 && stats.accuracy <= 98, `seed ${seed}: ${stats.accuracy}%`);
      total += stats.wpm;
    }
    assert.ok(Math.abs(total / SEEDS.length - 91) < 0.6);
  }
});

// OQ: PF-OQ-001-B02
test("PF-OQ-001-B02: ghost is reproducible, varied and in time order", () => {
  assert.deepEqual(generateGhost(PASSAGES[0], 5), generateGhost(PASSAGES[0], 5));
  assert.notDeepEqual(generateGhost(PASSAGES[0], 5), generateGhost(PASSAGES[0], 6));
  for (const seed of SEEDS.slice(0, 200)) {
    let previous = 0;
    for (const { t } of generateGhost(PASSAGES[0], seed)) {
      assert.ok(t > previous && t < RACE_MS);
      previous = t;
    }
  }
  const series = new Set(SEEDS.slice(0, 20).map((s) => wpmSeries(generateGhost(PASSAGES[0], s), PASSAGES[0]).join()));
  assert.equal(series.size, 20);
});

// OQ: PF-OQ-001-B03
test("PF-OQ-001-B03: 4 to 6 long, keyboard friendly passages", () => {
  assert.ok(PASSAGES.length >= 4 && PASSAGES.length <= 6);
  for (const passage of PASSAGES) {
    assert.ok(passage.length >= 600, `${passage.length} chars`);
    assert.match(passage, /^[A-Za-z0-9 .,;:'?!-]+$/);
    assert.doesNotMatch(passage, / {2}/);
  }
});

// OQ: PF-OQ-001-B04
test("PF-OQ-001-B04: scoring with mistakes and backspaces", () => {
  const state = ["a", "x", "Backspace", "b", "c"].reduce((s, k) => applyKey(s, k, "abcdef"), EMPTY_TYPING);
  assert.deepEqual(getStats(state, "abcdef", 6000), { correct: 3, wrong: 0, wpm: 6, accuracy: 75 });
  assert.deepEqual(getStats(EMPTY_TYPING, "abc", 0), { correct: 0, wrong: 0, wpm: 0, accuracy: 0 });
});

// OQ: PF-OQ-001-B05
test("PF-OQ-001-B05: GIF tiers", () => {
  assert.equal(scoreTier(59, 91), "low");
  assert.equal(scoreTier(60, 91), "mid");
  assert.equal(scoreTier(90, 91), "mid");
  assert.equal(scoreTier(91, 91), "high");
  assert.equal(scoreTier(120, 91), "high");
});

// OQ: PF-OQ-001-B05
test("PF-OQ-001-B05: random GIF from the tier without back to back repeats", () => {
  for (const tier of ["low", "mid", "high"] as const) {
    const seen = new Set<string>();
    let previous = "";
    for (let i = 0; i < 500; i++) {
      const url = pickGif(tier);
      assert.ok(GIFS[tier].includes(url));
      assert.notEqual(url, previous);
      seen.add((previous = url));
    }
    assert.equal(seen.size, GIFS[tier].length);
  }
});

// OQ: PF-OQ-001-B05
test("PF-OQ-001-B05: every tier has three subtext lines", () => {
  for (const lines of Object.values(SUBTEXTS)) assert.equal(lines.length, 3);
});
