import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./DotGrid.css";

/** Matches `.texture-halftone::after` in index.css */
const DOT_RADIUS_PX = 1.5;
const GRID_STEP_PX = 12;

export type DotGridVariant = "think" | "create" | "contact";

const VARIANT_CSS_VAR: Record<DotGridVariant, string> = {
  think: "--think-accent",
  create: "--neon-red",
  contact: "--accent",
};

function parseHslComponents(value: string): { h: number; s: number; l: number } | null {
  const t = value.trim();
  const m = /^([\d.]+)\s+([\d.]+%)\s+([\d.]+%)$/.exec(t);
  if (!m) return null;
  return { h: parseFloat(m[1]), s: parseFloat(m[2]), l: parseFloat(m[3]) };
}

export interface DotGridProps {
  variant: DotGridVariant;
  shockRadius?: number;
  shockStrength?: number;
  resistance?: number;
  returnDuration?: number;
  /** Base dot opacity (halftone layer was 0.12) */
  dotOpacity?: number;
}

/**
 * Interactive dot grid (same geometry as CSS halftone: 1.5px dots, 12px grid).
 * Cursor proximity lightens dots; shock decay via GSAP (no full-page redirect).
 */
const DotGrid = ({
  variant,
  shockRadius = 130,
  shockStrength = 14,
  resistance = 1000,
  returnDuration = 0.5,
  dotOpacity = 0.12,
}: DotGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1e9, y: -1e9 });
  const strengthRef = useRef({ value: 0 });
  const hslRef = useRef({ h: 0, s: 50, l: 50 });

  const readAccentHsl = useCallback(() => {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(VARIANT_CSS_VAR[variant]).trim();
    const parsed = parseHslComponents(raw);
    if (parsed) hslRef.current = parsed;
  }, [variant]);

  useEffect(() => {
    readAccentHsl();
  }, [readAccentHsl]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state = strengthRef.current;

    const draw = () => {
      const { h, s, l } = hslRef.current;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const hPx = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(hPx * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const str = state.value;

      ctx.clearRect(0, 0, w, hPx);

      for (let cy = GRID_STEP_PX / 2; cy < hPx; cy += GRID_STEP_PX) {
        for (let cx = GRID_STEP_PX / 2; cx < w; cx += GRID_STEP_PX) {
          const dist = Math.hypot(cx - mx, cy - my);
          let t = 0;
          if (dist < shockRadius && str > 0) {
            t = (1 - dist / shockRadius) * str;
          }
          const lighten = t * (shockStrength / 14) * 10;
          const lightness = Math.min(96, l + lighten);
          const alpha = dotOpacity + t * (shockStrength / 14) * 0.35;
          ctx.globalAlpha = Math.min(0.55, alpha);
          ctx.fillStyle = `hsl(${h} ${s}% ${lightness}%)`;
          ctx.beginPath();
          ctx.arc(cx, cy, DOT_RADIUS_PX, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - r.left,
        y: e.clientY - r.top,
      };
      gsap.killTweensOf(state);
      state.value = 1;
      const dur = returnDuration * (resistance / 1000);
      gsap.to(state, {
        value: 0,
        duration: Math.max(0.15, dur),
        ease: "power3.out",
        overwrite: true,
        onUpdate: draw,
      });
      draw();
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    const ro = new ResizeObserver(() => {
      readAccentHsl();
      draw();
    });
    ro.observe(container);

    readAccentHsl();
    draw();

    return () => {
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      gsap.killTweensOf(state);
    };
  }, [variant, shockRadius, shockStrength, resistance, returnDuration, dotOpacity, readAccentHsl]);

  return (
    <div ref={containerRef} className="dot-grid-layer" aria-hidden>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default DotGrid;
