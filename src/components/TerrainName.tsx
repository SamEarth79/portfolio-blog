"use client";

import { useEffect, useRef } from "react";

/**
 * Live terrain hero: a heightfield of gaussian peaks arranged 2-3-2, from
 * which marching squares extracts topographic contour lines every frame.
 * Ambient waves keep the lowlands moving; the cursor is a surveyor's probe
 * that dents the terrain so the contours re-flow around it. A trailing
 * readout reports the real sampled elevation.
 */

const ROWS = 110;
const LEVELS = 12;
const ISO_MIN = 0.09;
const ISO_MAX = 0.88;
const DENT_DEPTH = 0.34;
const REVEAL_MS = 2200;
const SEA_LEVEL_M = 780;
const PEAK_M = 2450;

export default function TerrainName() {
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

    /** Static smoothed noise so the "sea" around the name has character. */
    function bakeNoise(c: number, r: number) {
      const gw = 10;
      const gh = 6;
      const g = new Float32Array((gw + 1) * (gh + 1));
      let seed = 79;
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
          out[y * c + x] = (top + (bot - top) * sy) * 0.14;
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

      // Abstract range: gaussian peaks laid out in a 2-3-2 pattern of
      // contour islands, each with its own height and footprint.
      const peaks: { x: number; y: number; h: number; r: number }[] = [
        { x: 0.32, y: 0.22, h: 0.82, r: 0.13 },
        { x: 0.68, y: 0.24, h: 0.9, r: 0.15 },
        { x: 0.18, y: 0.5, h: 0.78, r: 0.12 },
        { x: 0.5, y: 0.52, h: 0.92, r: 0.16 },
        { x: 0.82, y: 0.5, h: 0.8, r: 0.13 },
        { x: 0.34, y: 0.78, h: 0.86, r: 0.14 },
        { x: 0.66, y: 0.76, h: 0.76, r: 0.12 },
      ];
      const noise = bakeNoise(cols, rows);
      base = new Float32Array(cols * rows);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          let h = 0;
          for (const p of peaks) {
            const dx = x - p.x * cols;
            const dy = y - p.y * rows;
            const s = (p.r * rows * 1.15) ** 2 * 2;
            const v = p.h * Math.exp(-(dx * dx + dy * dy) / s);
            if (v > h) h = v;
          }
          base[y * cols + x] = h + noise[y * cols + x];
        }
      }
      field = new Float32Array(cols * rows);
    }

    function computeField(t: number) {
      const cx = cursor.x;
      const cy = cursor.y;
      const s = cursor.s;
      const r2 = (rows * 0.085) ** 2 * 2;
      const wobble = reduced ? 0 : 1;
      for (let y = 0; y < rows; y++) {
        const wy = Math.sin(y * 0.24 - t * 0.45) * 0.045 * wobble;
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          let h =
            base[i] + wy + Math.sin(x * 0.19 + t * 0.6 + y * 0.07) * 0.045 * wobble;
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

    function draw(reveal: number) {
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
      ctx!.globalAlpha = 1;
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
      draw(reveal);

      if (cursor.s > 0.02) {
        readout!.style.opacity = String(Math.min(cursor.s * 1.4, 1) * reveal);
        readout!.style.transform = `translate(${pointerPx.x + 24}px, ${pointerPx.y + 28}px)`;
        elevEl!.textContent = `ELEV ${sampleElevation(cursor.x, cursor.y).toLocaleString("en-US")} M`;
        if (coordRef.current) {
          // Map the sheet onto a small survey window centred on Bangalore
          const lat = 12.97 + (0.5 - cursor.y / (rows - 1)) * 30;
          const lon = 77.59 + (cursor.x / (cols - 1) - 0.5) * 50;
          coordRef.current.textContent = `${Math.abs(lat).toFixed(4)}° ${lat < 0 ? "S" : "N"} · ${Math.abs(lon).toFixed(4)}° E`;
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

    document.fonts.ready.then(() => {
      if (disposed) return;
      buildBase();
      if (reduced) {
        computeField(0);
        draw(1);
        return;
      }
      raf = requestAnimationFrame(frame);
      if (finePointer) window.addEventListener("mousemove", onMove);
      ro = new ResizeObserver(() => {
        buildBase();
        if (reduced) {
          computeField(0);
          draw(1);
        }
      });
      ro.observe(canvas!.parentElement!);
    });

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
        <span ref={coordRef} className="block text-ink/40">12.9700&deg; N &middot; 77.5900&deg; E</span>
      </div>
    </div>
  );
}
