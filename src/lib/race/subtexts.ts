import { createPicker } from "./picker.ts";
import type { Tier } from "./scoring.ts";

export const SUBTEXTS: Record<Tier, string[]> = {
  low: [
    "Uh oh. Don't worry, I won't share your result with anyone.",
    "It's ok, nobody types these days anyway.",
    "Try again?",
  ],
  mid: [
    "So cloooooose",
    "Not bad! Not me, but not bad.",
    "You almost had me sweating. Almost.",
  ],
  high: [
    "Okay, who let the professional in?",
    "Easy there, your keyboard has a family.",
    "I'd like to blame my lag. I'm a simulation, so I can't.",
  ],
};

export const pickSubtext = createPicker(SUBTEXTS);
