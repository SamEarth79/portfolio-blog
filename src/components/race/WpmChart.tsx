const WIDTH = 600;
const HEIGHT = 200;
const LEFT = 36;
const RIGHT = 590;
const TOP = 12;
const BOTTOM = 176;

export default function WpmChart({
  visitor,
  ghost,
}: {
  visitor: number[];
  ghost: number[];
}) {
  const max = Math.max(120, Math.ceil(Math.max(...visitor, ...ghost) / 40) * 40);
  const x = (i: number) => LEFT + (i / (ghost.length - 1)) * (RIGHT - LEFT);
  const y = (wpm: number) => BOTTOM - (wpm / max) * (BOTTOM - TOP);
  const points = (series: number[]) =>
    series.map((wpm, i) => `${x(i)},${y(wpm)}`).join(" ");
  const gridValues = [0, max / 3, (max / 3) * 2, max];

  return (
    <div data-wf="results.chart" className="rounded-lg border border-offwhite/15 bg-charcoal/40 p-4">
      <div className="mb-2 flex flex-wrap items-center gap-x-5 text-xs uppercase tracking-[0.2em] text-offwhite/60">
        <span>WPM over time</span>
        <span className="text-accent">━ You</span>
        <span className="text-offwhite">┅ Samarth</span>
      </div>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="block h-auto w-full" role="img" aria-label="WPM over 30 seconds">
        {gridValues.map((value) => (
          <g key={value}>
            <line x1={LEFT} x2={RIGHT} y1={y(value)} y2={y(value)} className="stroke-offwhite/10" />
            <text x={LEFT - 8} y={y(value) + 3} textAnchor="end" className="fill-offwhite/50 text-[10px]">
              {Math.round(value)}
            </text>
          </g>
        ))}
        {[1, 5, 10, 15, 20, 25, 30].map((second) => (
          <text key={second} x={x(second - 1)} y={HEIGHT - 6} textAnchor="middle" className="fill-offwhite/50 text-[10px]">
            {second}s
          </text>
        ))}
        <polyline points={points(ghost)} fill="none" strokeWidth="2" strokeDasharray="7 5" className="stroke-offwhite/70" />
        <polyline points={points(visitor)} fill="none" strokeWidth="2.5" strokeLinejoin="round" className="stroke-accent" />
      </svg>
    </div>
  );
}
