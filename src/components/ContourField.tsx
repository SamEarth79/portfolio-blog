export default function ContourField() {
  return (
    <div
      className="contour-field pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g className="contour-cluster contour-cluster--a" style={{ transformOrigin: "260px 260px" }}>
          <path className="contour-line" d="M180,300 C90,260 100,150 200,110 C300,70 420,110 450,200 C480,290 420,380 320,390 C240,398 250,336 180,300 Z" />
          <path className="contour-line" d="M195,290 C120,255 130,165 215,132 C300,99 400,132 425,205 C450,278 400,352 315,360 C248,367 258,320 195,290 Z" />
          <path className="contour-line" d="M212,278 C150,250 158,182 228,155 C298,128 380,155 400,212 C420,270 378,325 308,332 C255,338 264,300 212,278 Z" />
          <path className="contour-line" d="M228,266 C180,244 186,198 240,177 C296,156 360,177 376,220 C392,264 358,308 302,314 C260,319 268,290 228,266 Z" />
          <path className="contour-line" d="M244,254 C210,238 214,213 252,199 C293,184 340,198 351,228 C363,258 338,290 298,295 C266,299 272,278 244,254 Z" />
        </g>

        <g className="contour-cluster contour-cluster--b" style={{ transformOrigin: "1180px 220px" }}>
          <path className="contour-line" d="M1020,260 C980,180 1050,90 1150,80 C1260,70 1360,140 1360,230 C1360,320 1270,380 1170,370 C1090,362 1060,340 1020,260 Z" />
          <path className="contour-line" d="M1045,248 C1012,182 1068,110 1152,102 C1244,94 1328,152 1328,228 C1328,304 1252,354 1168,346 C1100,340 1078,314 1045,248 Z" />
          <path className="contour-line" d="M1068,236 C1042,183 1088,128 1154,122 C1230,115 1298,163 1298,226 C1298,289 1236,330 1166,323 C1108,318 1090,296 1068,236 Z" />
          <path className="contour-line" d="M1090,224 C1070,183 1106,140 1156,136 C1216,131 1268,170 1268,222 C1268,274 1220,306 1163,301 C1116,297 1102,272 1090,224 Z" />
        </g>

        <g className="contour-cluster contour-cluster--c" style={{ transformOrigin: "700px 700px" }}>
          <path className="contour-line" d="M560,760 C520,690 570,600 660,590 C760,579 850,640 856,720 C862,800 780,860 690,854 C610,849 598,826 560,760 Z" />
          <path className="contour-line" d="M584,748 C552,690 594,616 668,608 C752,599 826,650 831,718 C836,786 766,838 688,833 C620,829 610,806 584,748 Z" />
          <path className="contour-line" d="M606,736 C580,690 616,632 676,626 C744,619 804,662 808,717 C812,772 754,814 692,810 C634,806 626,786 606,736 Z" />
          <path className="contour-line" d="M628,724 C608,690 636,648 684,644 C736,639 782,672 785,715 C788,758 744,790 696,787 C650,784 644,768 628,724 Z" />
          <path className="contour-line" d="M650,712 C636,690 656,664 692,662 C728,659 760,682 762,713 C764,744 734,766 700,764 C668,762 662,750 650,712 Z" />
        </g>

        <g className="contour-cluster contour-cluster--d" style={{ transformOrigin: "1300px 760px" }}>
          <path className="contour-line" d="M1180,800 C1150,750 1190,690 1260,684 C1330,678 1390,720 1394,780 C1398,840 1340,884 1272,880 C1214,876 1206,842 1180,800 Z" />
          <path className="contour-line" d="M1200,792 C1176,750 1208,700 1264,695 C1320,690 1368,724 1371,776 C1374,828 1328,864 1274,861 C1226,858 1220,830 1200,792 Z" />
          <path className="contour-line" d="M1220,784 C1202,750 1226,712 1268,708 C1310,704 1346,730 1348,772 C1350,814 1316,842 1276,840 C1238,838 1234,816 1220,784 Z" />
        </g>

        <g className="contour-cluster contour-cluster--e" style={{ transformOrigin: "40px 680px" }}>
          <path className="contour-line" d="M-60,700 C-90,650 -60,590 10,580 C80,570 140,610 145,670 C150,730 100,774 30,770 C-25,767 -35,742 -60,700 Z" />
          <path className="contour-line" d="M-42,692 C-66,652 -42,602 16,594 C74,586 122,619 126,668 C130,717 90,753 32,750 C-13,747 -21,726 -42,692 Z" />
          <path className="contour-line" d="M-24,684 C-44,654 -24,614 22,608 C68,602 106,628 109,666 C112,704 80,732 34,730 C-1,728 -8,712 -24,684 Z" />
        </g>
      </svg>
    </div>
  );
}
