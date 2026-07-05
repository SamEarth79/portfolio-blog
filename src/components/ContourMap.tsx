"use client";

import { useEffect, useRef } from "react";

/**
 * Live contour world map: stylised continent outlines are rasterised into a
 * heightfield (equirectangular projection), and marching squares extracts
 * topographic contour lines from it every frame. Gentle ambient waves keep
 * the oceans moving; on fine pointers the cursor is a surveyor's probe that
 * dents the terrain so contours re-flow around it, while a trailing readout
 * reports sampled elevation and true lat/lon. Bangalore wears an accent fix.
 */

const ROWS = 110;
const LEVELS = 12;
const ISO_MIN = 0.09;
const ISO_MAX = 0.88;
const DENT_DEPTH = 0.34;
const REVEAL_MS = 2200;
const SEA_LEVEL_M = 780;
const PEAK_M = 2450;

const HOME = { lon: 77.59, lat: 12.97 }; // Bangalore

// Stylised coastlines as [lon, lat, lon, lat, ...] rings. Deliberately
// coarse — the raster blur rounds them into contour-friendly landmasses.
const LANDMASSES: { ring: number[] }[] = [
  {
    // North America
    ring: [
      -165, 65, -160, 58, -152, 58, -140, 60, -130, 55, -125, 49, -124, 40,
      -117, 33, -110, 24, -105, 20, -95, 16, -90, 14, -83, 9, -79, 9, -83, 15,
      -90, 20, -97, 26, -91, 29, -83, 28, -81, 25, -80, 32, -76, 35, -74, 40,
      -70, 44, -66, 45, -60, 47, -58, 52, -64, 60, -78, 62, -85, 66, -110, 68,
      -130, 70, -155, 71, -165, 65,
    ],
  },
  {
    // South America
    ring: [
      -77, 7, -75, 10, -72, 12, -64, 10, -52, 5, -44, -3, -35, -8, -39, -13,
      -41, -22, -48, -28, -53, -34, -58, -39, -65, -41, -66, -47, -69, -52,
      -71, -54, -73, -50, -71, -42, -71, -33, -70, -25, -70, -18, -76, -14,
      -81, -6, -80, 0, -77, 7,
    ],
  },
  {
    // Africa
    ring: [
      -6, 35, 3, 37, 10, 37, 20, 32, 30, 31, 34, 28, 37, 18, 43, 11, 51, 10,
      46, 2, 40, -5, 35, -15, 33, -26, 27, -34, 17, -30, 12, -18, 9, -5, 9, 4,
      -5, 5, -13, 9, -17, 15, -10, 28, -6, 35,
    ],
  },
  {
    // Eurasia
    ring: [
      -9, 43, -9, 37, 0, 37, 5, 43, 12, 44, 12, 38, 16, 40, 22, 37, 28, 36,
      36, 36, 35, 31, 35, 28, 39, 21, 43, 12, 52, 14, 60, 22, 56, 27, 50, 30,
      61, 25, 66, 25, 72, 20, 77, 8, 80, 13, 87, 22, 94, 16, 98, 8, 105, 12,
      109, 15, 107, 21, 114, 22, 121, 30, 122, 38, 125, 40, 131, 43, 135, 48,
      141, 53, 156, 51, 162, 56, 170, 60, 178, 65, 170, 68, 160, 70, 140, 72,
      110, 74, 90, 75, 70, 72, 60, 69, 48, 68, 40, 66, 30, 70, 18, 69, 5, 61,
      8, 57, 13, 55, 8, 54, 4, 52, -2, 48, -9, 43,
    ],
  },
  {
    // Australia
    ring: [
      114, -22, 122, -18, 130, -12, 136, -12, 142, -11, 146, -15, 149, -20,
      153, -27, 150, -37, 144, -38, 140, -36, 135, -35, 129, -32, 124, -33,
      115, -34, 113, -26, 114, -22,
    ],
  },
  {
    // Greenland
    ring: [
      -45, 60, -40, 64, -32, 68, -22, 70, -25, 76, -38, 80, -55, 82, -68, 78,
      -58, 72, -52, 65, -45, 60,
    ],
  },
  { ring: [44, -12, 50, -16, 47, -25, 44, -22, 43, -16, 44, -12] }, // Madagascar
  { ring: [130, 32, 135, 34, 140, 36, 141, 40, 143, 44, 140, 43, 136, 36, 131, 33, 130, 32] }, // Japan
  { ring: [-5, 50, 0, 52, -2, 56, -5, 58, -7, 55, -5, 50] }, // Britain
  { ring: [109, 0, 114, 4, 118, 1, 116, -3, 110, -2, 109, 0] }, // Borneo
  { ring: [96, 4, 102, 0, 106, -5, 112, -7, 114, -8, 105, -6, 98, 2, 96, 4] }, // Sumatra & Java
  { ring: [131, -2, 138, -3, 146, -6, 143, -8, 135, -5, 131, -2] }, // New Guinea
  { ring: [173, -35, 176, -38, 174, -41, 170, -44, 167, -46, 170, -42, 173, -35] }, // New Zealand
];

export default function ContourMap() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const readoutRef = useRef<HTMLDivElement | null>(null);
  const elevRef = useRef<HTMLSpanElement | null>(null);
  const coordRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const readout = readoutRef.current;
    const elevEl = elevRef.current;
    if (!canvas || !readout || !elevEl) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let cols = 0;
    let rows = ROWS;
    let base: Float32Array = new Float32Array(0);
    let field: Float32Array = new Float32Array(0);
    let cssW = 0;
    let cssH = 0;
    let raf = 0;
    let startTime = 0;
    let disposed = false;

    // Cursor state in grid coordinates; strength eases in/out so the dent
    // melts away instead of popping when the pointer leaves.
    const cursor = { x: -1e3, y: -1e3, tx: -1e3, ty: -1e3, s: 0, ts: 0 };
    const pointerPx = { x: 0, y: 0, tx: 0, ty: 0 };

    const inkColor = "20, 19, 15";
    const accent =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--color-accent")
        .trim() || "#cbff33";

    /** Static smoothed noise, 0..1, from a coarse random lattice. */
    function bakeNoise(c: number, r: number, gw: number, gh: number, seedIn: number) {
      const g = new Float32Array((gw + 1) * (gh + 1));
      let seed = seedIn;
      const rand = () => {
        seed = (seed * 16807) % 2147483647;
        return seed / 2147483647;
      };
      for (let i = 0; i < g.length; i++) g[i] = rand();
      const out = new Float32Array(c * r);
      for (let y = 0; y < r; y++) {
        for (let x = 0; x < c; x++) {
          const gx = (x / c) * gw;
          const gy = (y / r) * gh;
          const x0 = Math.floor(gx);
          const y0 = Math.floor(gy);
          const fx = gx - x0;
          const fy = gy - y0;
          const sx = fx * fx * (3 - 2 * fx);
          const sy = fy * fy * (3 - 2 * fy);
          const i0 = y0 * (gw + 1) + x0;
          const top = g[i0] + (g[i0 + 1] - g[i0]) * sx;
          const i1 = i0 + gw + 1;
          const bot = g[i1] + (g[i1 + 1] - g[i1]) * sx;
          out[y * c + x] = top + (bot - top) * sy;
        }
      }
      return out;
    }

    function buildBase() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      cssW = rect.width;
      cssH = rect.height;
      if (cssW < 10 || cssH < 10) return;

      rows = ROWS;
      cols = Math.max(60, Math.round((cssW / cssH) * rows));

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(cssW * dpr);
      canvas!.height = Math.round(cssH * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Rasterise the coastline rings at grid resolution, blurred so the
      // landmasses become smooth elevation rather than hard plateaus.
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const octx = off.getContext("2d")!;
      octx.fillStyle = "#000";
      octx.fillRect(0, 0, cols, rows);
      octx.filter = `blur(${rows * 0.011}px)`;
      octx.fillStyle = "#fff";
      for (const land of LANDMASSES) {
        octx.beginPath();
        const ring = land.ring;
        for (let i = 0; i < ring.length; i += 2) {
          const px = ((ring[i] + 180) / 360) * cols;
          const py = ((90 - ring[i + 1]) / 180) * rows;
          if (i === 0) octx.moveTo(px, py);
          else octx.lineTo(px, py);
        }
        octx.closePath();
        octx.fill();
      }

      const img = octx.getImageData(0, 0, cols, rows).data;
      // Oceans get faint character; continent interiors get rolling hills so
      // they carry a few inner contours instead of reading as empty plateaus.
      const seaNoise = bakeNoise(cols, rows, 10, 6, 79);
      const landNoise = bakeNoise(cols, rows, 16, 9, 1234);
      base = new Float32Array(cols * rows);
      for (let i = 0; i < base.length; i++) {
        const land = img[i * 4] / 255;
        base[i] = land * (0.52 + 0.4 * landNoise[i]) + (1 - land) * 0.1 * seaNoise[i];
      }
      field = new Float32Array(cols * rows);
    }

    function computeField(t: number) {
      const cx = cursor.x;
      const cy = cursor.y;
      const s = cursor.s;
      const r2 = (rows * 0.085) ** 2 * 2;
      // Calm seas: enough drift to feel alive, not enough to melt coastlines
      const wobble = reduced ? 0 : 1;
      for (let y = 0; y < rows; y++) {
        const wy = Math.sin(y * 0.24 - t * 0.22) * 0.009 * wobble;
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          let h =
            base[i] + wy + Math.sin(x * 0.19 + t * 0.3 + y * 0.07) * 0.009 * wobble;
          if (s > 0.001) {
            const dx = x - cx;
            const dy = y - cy;
            const d2 = dx * dx + dy * dy;
            if (d2 < r2 * 9) h -= s * DENT_DEPTH * Math.exp(-d2 / r2);
          }
          field[i] = h;
        }
      }
    }

    /** Marching squares: append this iso level's segments to a Path2D. */
    function tracePaths(iso: number) {
      const path = new Path2D();
      const sx = cssW / (cols - 1);
      const sy = cssH / (rows - 1);
      for (let y = 0; y < rows - 1; y++) {
        const row = y * cols;
        for (let x = 0; x < cols - 1; x++) {
          const a = field[row + x];
          const b = field[row + x + 1];
          const c = field[row + cols + x + 1];
          const d = field[row + cols + x];
          let code = 0;
          if (a > iso) code |= 8;
          if (b > iso) code |= 4;
          if (c > iso) code |= 2;
          if (d > iso) code |= 1;
          if (code === 0 || code === 15) continue;

          const top = [(x + (iso - a) / (b - a)) * sx, y * sy] as const;
          const right = [(x + 1) * sx, (y + (iso - b) / (c - b)) * sy] as const;
          const bottom = [(x + (iso - d) / (c - d)) * sx, (y + 1) * sy] as const;
          const left = [x * sx, (y + (iso - a) / (d - a)) * sy] as const;

          const seg = (
            p: readonly [number, number],
            q: readonly [number, number]
          ) => {
            path.moveTo(p[0], p[1]);
            path.lineTo(q[0], q[1]);
          };

          switch (code) {
            case 1: case 14: seg(left, bottom); break;
            case 2: case 13: seg(bottom, right); break;
            case 3: case 12: seg(left, right); break;
            case 4: case 11: seg(top, right); break;
            case 5: seg(top, right); seg(left, bottom); break;
            case 6: case 9: seg(top, bottom); break;
            case 7: case 8: seg(left, top); break;
            case 10: seg(left, top); seg(bottom, right); break;
          }
        }
      }
      return path;
    }

    const accentLevel = Math.round(((0.5 - ISO_MIN) / (ISO_MAX - ISO_MIN)) * (LEVELS - 1));

    const BEACON = "#ff2d1f";

    function drawHomeFix(reveal: number, t: number) {
      const hx = ((HOME.lon + 180) / 360) * cssW;
      const hy = ((90 - HOME.lat) / 180) * cssH;

      // Beacon: a bright red fix that fires an expanding ring every 3s
      const phase = reduced ? 0 : (t % 3) / 3;
      ctx!.globalAlpha = reveal;
      ctx!.fillStyle = BEACON;
      ctx!.beginPath();
      ctx!.arc(hx, hy, 4, 0, Math.PI * 2);
      ctx!.fill();

      if (!reduced) {
        const ringR = 5 + phase * 22;
        ctx!.globalAlpha = reveal * (1 - phase) * 0.9;
        ctx!.strokeStyle = BEACON;
        ctx!.lineWidth = 1.5;
        ctx!.beginPath();
        ctx!.arc(hx, hy, ringR, 0, Math.PI * 2);
        ctx!.stroke();
      }

      ctx!.globalAlpha = reveal;
      ctx!.font = "700 10px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx!.fillStyle = BEACON;
      ctx!.fillText("BLR", hx + 12, hy + 4);
      ctx!.globalAlpha = 1;
    }

    function draw(reveal: number, t: number) {
      ctx!.clearRect(0, 0, cssW, cssH);
      for (let k = 0; k < LEVELS; k++) {
        // Contours surface from the sea up during the reveal.
        const levelReveal = Math.min(Math.max(reveal * (LEVELS + 3) - k, 0), 1);
        if (levelReveal <= 0) continue;
        const iso = ISO_MIN + ((ISO_MAX - ISO_MIN) * k) / (LEVELS - 1);
        const path = tracePaths(iso);
        if (k === accentLevel) {
          ctx!.strokeStyle = accent;
          ctx!.globalAlpha = 0.95 * levelReveal;
          ctx!.lineWidth = 1.7;
        } else if (k % 4 === 0) {
          // Index contours, bolder like a real survey sheet
          ctx!.strokeStyle = `rgba(${inkColor}, 0.6)`;
          ctx!.globalAlpha = levelReveal;
          ctx!.lineWidth = 1.25;
        } else {
          ctx!.strokeStyle = `rgba(${inkColor}, 0.34)`;
          ctx!.globalAlpha = levelReveal;
          ctx!.lineWidth = 0.75;
        }
        ctx!.stroke(path);
      }
      drawHomeFix(reveal, t);
    }

    function sampleElevation(gx: number, gy: number) {
      const x = Math.min(Math.max(Math.round(gx), 0), cols - 1);
      const y = Math.min(Math.max(Math.round(gy), 0), rows - 1);
      const h = Math.min(Math.max(field[y * cols + x], 0), 1);
      return Math.round(SEA_LEVEL_M + h * (PEAK_M - SEA_LEVEL_M));
    }

    function frame(now: number) {
      if (disposed) return;
      if (!startTime) startTime = now;
      const t = now / 1000;
      const reveal = reduced ? 1 : Math.min((now - startTime) / REVEAL_MS, 1);

      // Ease cursor + readout toward their targets
      cursor.x += (cursor.tx - cursor.x) * 0.14;
      cursor.y += (cursor.ty - cursor.y) * 0.14;
      cursor.s += (cursor.ts - cursor.s) * 0.1;
      pointerPx.x += (pointerPx.tx - pointerPx.x) * 0.16;
      pointerPx.y += (pointerPx.ty - pointerPx.y) * 0.16;

      computeField(t);
      draw(reveal, t);

      if (cursor.s > 0.02) {
        readout!.style.opacity = String(Math.min(cursor.s * 1.4, 1) * reveal);
        readout!.style.transform = `translate(${pointerPx.x + 24}px, ${pointerPx.y + 28}px)`;
        elevEl!.textContent = `ELEV ${sampleElevation(cursor.x, cursor.y).toLocaleString("en-US")} M`;
        if (coordRef.current) {
          // Equirectangular sheet: the cursor reads true world coordinates
          const lat = 90 - (cursor.y / (rows - 1)) * 180;
          const lon = (cursor.x / (cols - 1)) * 360 - 180;
          coordRef.current.textContent = `${Math.abs(lat).toFixed(2)}° ${lat < 0 ? "S" : "N"} · ${Math.abs(lon).toFixed(2)}° ${lon < 0 ? "W" : "E"}`;
        }
      } else {
        readout!.style.opacity = "0";
      }

      raf = requestAnimationFrame(frame);
    }

    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside) {
        cursor.ts = 0;
        return;
      }
      // Grid coords must account for the hero's scroll-shrink scale
      const px = ((e.clientX - rect.left) / rect.width) * cssW;
      const py = ((e.clientY - rect.top) / rect.height) * cssH;
      cursor.tx = (px / cssW) * (cols - 1);
      cursor.ty = (py / cssH) * (rows - 1);
      cursor.ts = 1;
      pointerPx.tx = px;
      pointerPx.ty = py;
      if (cursor.s < 0.02) {
        pointerPx.x = px;
        pointerPx.y = py;
      }
    }

    let ro: ResizeObserver | null = null;

    buildBase();
    if (reduced) {
      computeField(0);
      draw(1, 0);
    } else {
      raf = requestAnimationFrame(frame);
      if (finePointer) window.addEventListener("mousemove", onMove);
    }
    ro = new ResizeObserver(() => {
      buildBase();
      if (reduced) {
        computeField(0);
        draw(1, 0);
      }
    });
    ro.observe(canvas.parentElement!);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      ro?.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div
        ref={readoutRef}
        className="pointer-events-none absolute left-0 top-0 select-none font-mono text-[10px] uppercase tracking-[0.2em] text-ink/70 opacity-0 will-change-transform"
      >
        <span ref={elevRef} className="block">ELEV — M</span>
        <span ref={coordRef} className="block text-ink/40">12.97&deg; N &middot; 77.59&deg; E</span>
      </div>
    </div>
  );
}
