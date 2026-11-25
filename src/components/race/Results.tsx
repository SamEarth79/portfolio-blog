"use client";

import { useState } from "react";
import Link from "next/link";
import WpmChart from "@/components/race/WpmChart";
import {
  RACE_MS,
  getStats,
  scoreTier,
  replay,
  wpmSeries,
  type Keystroke,
  type Stats,
} from "@/lib/race/scoring";
import { pickGif } from "@/lib/race/gifs";
import { pickSubtext } from "@/lib/race/subtexts";

function StatCard({
  side,
  name,
  stats,
  isWinner,
}: {
  side: "player" | "ghost";
  name: string;
  stats: Stats;
  isWinner: boolean;
}) {
  const details = [
    { label: "Accuracy", value: `${stats.accuracy}%`, wf: `results.${side}-accuracy` },
    { label: "Characters (correct / wrong)", value: `${stats.correct} / ${stats.wrong}`, wf: `results.${side}-chars` },
    { label: "Time", value: `${RACE_MS / 1000}s`, wf: side === "player" ? "results.player-time" : undefined },
  ];
  return (
    <div
      data-wf={`results.${side}-card`}
      className={`rounded-lg border-2 bg-charcoal/40 p-5 ${isWinner ? "border-accent" : "border-offwhite/15"}`}
    >
      <p className="text-xs uppercase tracking-[0.3em] text-offwhite/60">{name}</p>
      <p data-wf={`results.${side}-wpm`} className="font-display text-5xl font-bold">
        {stats.wpm} WPM
      </p>
      <dl className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
        {details.map((detail) => (
          <div key={detail.label}>
            <dt className="text-xs text-offwhite/50">{detail.label}</dt>
            <dd data-wf={detail.wf} className="font-display text-xl font-bold">
              {detail.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function Results({
  passage,
  visitorLog,
  ghostLog,
  onRetry,
}: {
  passage: string;
  visitorLog: Keystroke[];
  ghostLog: Keystroke[];
  onRetry: () => void;
}) {
  const visitor = getStats(replay(visitorLog, passage), passage, RACE_MS);
  const ghost = getStats(replay(ghostLog, passage), passage, RACE_MS);
  const verdict =
    visitor.wpm > ghost.wpm
      ? "Okay, you beat me."
      : visitor.wpm < ghost.wpm
        ? "I win this one."
        : "Tie!!! Again?";
  const tier = scoreTier(visitor.wpm, ghost.wpm);
  const [gifUrl] = useState(() => pickGif(tier));
  const [subtext] = useState(() => pickSubtext(tier));

  return (
    <div className="flex w-full flex-col gap-5">
      <div aria-live="polite" className="text-center">
        <h1 data-wf="results.verdict" className="font-serif text-4xl sm:text-5xl">
          {verdict}
        </h1>
        <p data-wf="results.subtext" className="mt-2 text-base text-offwhite/70 sm:text-lg">
          {subtext}
        </p>
      </div>
      {/* A plain img keeps the animation and skips Next's image optimiser */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        data-wf="results.gif"
        data-tier={tier}
        src={gifUrl}
        alt="Reaction GIF for your score"
        referrerPolicy="no-referrer"
        className="mx-auto h-56 w-full max-w-sm rounded-lg bg-charcoal/40 object-contain"
      />
      <div className="grid gap-4 md:grid-cols-2">
        <StatCard side="player" name="You" stats={visitor} isWinner={visitor.wpm > ghost.wpm} />
        <StatCard side="ghost" name="Samarth" stats={ghost} isWinner={ghost.wpm > visitor.wpm} />
      </div>
      <WpmChart visitor={wpmSeries(visitorLog, passage)} ghost={wpmSeries(ghostLog, passage)} />
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          data-wf="results.retry"
          onClick={onRetry}
          className="rounded-md bg-accent px-5 py-2.5 font-mona text-xs font-bold uppercase text-ink hover:bg-accent/80"
        >
          Try again
        </button>
        <Link
          href="/"
          data-wf="results.home"
          className="rounded-md border border-offwhite/30 px-5 py-2.5 font-mona text-xs font-bold uppercase hover:border-offwhite"
        >
          Back to portfolio
        </Link>
      </div>
    </div>
  );
}
