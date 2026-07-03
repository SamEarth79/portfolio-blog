const FAMILIES: {
  drift: string;
  opacity: number;
  paths: string[];
}[] = [
  {
    // Family 1: giant open contours sweeping from bottom-left across the viewport
    drift: "contour-drift-a",
    opacity: 0.13,
    paths: [
      "M -250 900 C -100 640, 220 560, 480 660 C 760 768, 1040 700, 1180 520 C 1310 355, 1560 330, 1850 420",
      "M -250 990 C -60 720, 260 640, 540 740 C 820 840, 1120 770, 1280 580 C 1420 415, 1650 385, 1900 470",
      "M -250 1080 C -20 810, 310 720, 600 820 C 880 916, 1200 845, 1380 645 C 1530 480, 1740 445, 1950 525",
    ],
  },
  {
    // Family 2: enormous nested loop occupying the upper-right, mostly off-canvas
    drift: "contour-drift-b",
    opacity: 0.12,
    paths: [
      "M 1900 -80 C 1500 -120, 1220 60, 1260 320 C 1295 545, 1520 660, 1760 610 C 1890 583, 1960 500, 1980 400",
      "M 1930 30 C 1590 -10, 1350 140, 1385 350 C 1415 530, 1600 625, 1800 583 C 1905 560, 1960 490, 1975 410",
      "M 1955 140 C 1690 105, 1490 220, 1515 380 C 1537 517, 1680 590, 1835 557",
    ],
  },
  {
    // Family 3: long lone meander lines crossing the whole top / middle
    drift: "contour-drift-c",
    opacity: 0.11,
    paths: [
      "M -200 190 C 120 90, 380 260, 640 210 C 930 155, 1030 -40, 1350 30 C 1560 76, 1680 220, 1900 190",
      "M -200 350 C 60 300, 240 430, 470 400 C 700 370, 780 240, 1010 265 C 1200 285, 1280 400, 1500 370",
      "M 100 900 C 220 760, 460 740, 560 830 C 640 900, 560 990, 420 970",
    ],
  },
];

export default function ContourField() {
  let drawIndex = 0;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft grey swash — a single wide ribbon, barely-there fill */}
        <g className="contour-drift-slow">
          <path
            d="M -200 620
               C 150 480, 420 700, 700 640
               C 980 580, 1050 420, 1380 460
               C 1550 480, 1700 560, 1900 520
               L 1900 760
               C 1600 820, 1200 760, 900 800
               C 550 845, 150 780, -200 830 Z"
            fill="var(--color-contour-line)"
            className="contour-swash-fade"
            opacity="0.045"
          />
        </g>

        {FAMILIES.map((family) => (
          <g
            key={family.drift}
            className={family.drift}
            stroke="var(--color-contour-line)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            opacity={family.opacity}
          >
            {family.paths.map((d) => (
              <path
                key={d}
                d={d}
                pathLength={1}
                className="contour-draw"
                style={{ animationDelay: `${0.15 * drawIndex++}s` }}
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
