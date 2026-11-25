import type { Tier } from "./scoring.ts";

/** Picks randomly from a tier's list, never the same entry twice in a row. */
export function createPicker(lists: Record<Tier, string[]>) {
  const lastPicks: Partial<Record<Tier, string>> = {};
  return (tier: Tier, random: () => number = Math.random) => {
    const options = lists[tier].filter((item) => item !== lastPicks[tier]);
    const pick = options[Math.floor(random() * options.length)];
    lastPicks[tier] = pick;
    return pick;
  };
}
