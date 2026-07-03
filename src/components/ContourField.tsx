export default function ContourField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          className="animate-contours"
          stroke="var(--color-contour-line)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M100 180 C80 70 210 30 290 90 C360 140 350 260 270 320 C190 380 80 330 70 240 Z"/>
          <path d="M120 190 C105 95 210 65 275 115 C330 155 325 245 260 295 C195 345 110 300 105 230 Z"/>
          <path d="M145 195 C130 120 205 100 255 135 C300 165 295 225 250 270 C205 315 145 280 145 215 Z"/>
          <path d="M170 205 C160 145 205 135 235 160 C265 180 260 215 235 245 C205 275 170 250 170 215 Z"/>
          <path d="M640 130 C610 20 760 10 860 90 C930 150 910 310 810 360 C700 420 560 320 580 200 Z"/>
          <path d="M670 145 C650 60 760 55 835 115 C885 160 875 285 800 330 C720 380 630 300 645 215 Z"/>
          <path d="M700 165 C690 95 760 95 810 135 C850 170 845 260 795 300 C740 340 685 285 690 225 Z"/>
          <path d="M1200 280 C1180 180 1320 170 1390 250 C1450 315 1440 450 1365 520 C1280 600 1165 520 1175 390 Z"/>
          <path d="M1225 295 C1215 220 1315 210 1370 270 C1415 320 1405 420 1355 470 C1300 530 1220 475 1225 390 Z"/>
          <path d="M1250 315 C1245 250 1310 250 1345 285 C1375 320 1375 395 1340 435 C1305 470 1255 430 1250 380 Z"/>
        </g>
      </svg>
    </div>
  );
}
