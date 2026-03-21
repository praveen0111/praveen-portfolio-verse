import { ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export type LogoItem =
  | { node: ReactNode; title?: string; href?: string }
  | { src: string; alt: string; href?: string };

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right";
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  scaleOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  ariaLabel?: string;
}

function wrapOffset(offset: number, loopW: number): number {
  if (loopW <= 0) return offset;
  let o = offset;
  while (o <= -loopW) o += loopW;
  while (o > 0) o -= loopW;
  return o;
}

const DRAG_THRESHOLD_PX = 8;

const LogoLoop = ({
  logos,
  speed = 80,
  direction = "left",
  logoHeight = 48,
  gap = 48,
  hoverSpeed = 0,
  scaleOnHover = false,
  fadeOut = false,
  fadeOutColor = "#ffffff",
  ariaLabel = "Logo carousel",
}: LogoLoopProps) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [loopWidth, setLoopWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const offsetRef = useRef(0);
  const draggingRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const dragAccumRef = useRef(0);
  const suppressClickRef = useRef(false);
  const lastTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const touchMoveCleanupRef = useRef<(() => void) | null>(null);
  const touchStartRef = useRef({ x: 0, y: 0 });

  const effectiveSpeed = isHovered && hoverSpeed > 0 ? hoverSpeed : speed;
  /** Pixels per second; negative = content moves left (default marquee). */
  const velocityPxPerSec = direction === "left" ? -effectiveSpeed : effectiveSpeed;

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    if (half > 0) {
      setLoopWidth(half);
      offsetRef.current = wrapOffset(offsetRef.current, half);
    }
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [logos, gap, logoHeight, measure]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useEffect(() => {
    const tick = (t: number) => {
      const track = trackRef.current;
      if (!track) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const w = loopWidth;
      if (w > 0 && !draggingRef.current) {
        const dt = lastTimeRef.current != null ? (t - lastTimeRef.current) / 1000 : 0;
        offsetRef.current = wrapOffset(offsetRef.current + velocityPxPerSec * dt, w);
      }
      lastTimeRef.current = t;

      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    lastTimeRef.current = null;
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loopWidth, velocityPxPerSec]);

  const startDrag = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    draggingRef.current = true;
    setIsDragging(true);
    dragAccumRef.current = 0;
    suppressClickRef.current = false;
    lastPointerXRef.current = e.clientX;
    touchStartRef.current = { x: e.clientX, y: e.clientY };
    const el = outerRef.current;
    el?.setPointerCapture(e.pointerId);

    // iOS/Safari: horizontal scrub needs a non-passive touchmove so we can preventDefault
    // once the gesture is clearly horizontal; otherwise the page/browser may eat the move.
    touchMoveCleanupRef.current?.();
    if (el && e.pointerType === "touch") {
      const onTouchMove = (ev: TouchEvent) => {
        if (!draggingRef.current || !ev.touches[0]) return;
        const t = ev.touches[0];
        const dx = Math.abs(t.clientX - touchStartRef.current.x);
        const dy = Math.abs(t.clientY - touchStartRef.current.y);
        if (dx > dy && dx > 6) ev.preventDefault();
      };
      el.addEventListener("touchmove", onTouchMove, { passive: false });
      touchMoveCleanupRef.current = () => {
        el.removeEventListener("touchmove", onTouchMove);
        touchMoveCleanupRef.current = null;
      };
    }
  };

  /** Capture phase so we run before <a> hit-testing quirks on mobile. */
  const onPointerDownCapture = (e: React.PointerEvent) => {
    startDrag(e);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current || loopWidth <= 0) return;
    const dx = e.clientX - lastPointerXRef.current;
    lastPointerXRef.current = e.clientX;
    dragAccumRef.current += Math.abs(dx);
    offsetRef.current = wrapOffset(offsetRef.current + dx, loopWidth);
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);
    touchMoveCleanupRef.current?.();
    try {
      outerRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    suppressClickRef.current = dragAccumRef.current >= DRAG_THRESHOLD_PX;
    dragAccumRef.current = 0;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    endDrag(e);
  };

  const onPointerCancel = (e: React.PointerEvent) => {
    endDrag(e);
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (suppressClickRef.current) {
      e.preventDefault();
      e.stopPropagation();
      suppressClickRef.current = false;
    }
  };

  return (
    <div
      ref={outerRef}
      className="relative w-full overflow-hidden select-none touch-pan-y [-webkit-touch-callout:none]"
      style={{
        minHeight: logoHeight + 16,
        /** Vertical scroll still works on the page; horizontal drag scrubs the loop. */
        touchAction: "pan-y",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDownCapture={onPointerDownCapture}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onClickCapture={onClickCapture}
      aria-label={ariaLabel}
    >
      {fadeOut && (
        <>
          <div
            className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{
              width: 80,
              background: `linear-gradient(to right, ${fadeOutColor}, transparent)`,
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{
              width: 80,
              background: `linear-gradient(to left, ${fadeOutColor}, transparent)`,
            }}
          />
        </>
      )}

      <div
        ref={trackRef}
        className="flex items-center will-change-transform"
        style={{
          width: "max-content",
        }}
      >
        {[...logos, ...logos].map((logo, i) => (
          <a
            key={i}
            href={"href" in logo ? logo.href : undefined}
            target={logo.href ? "_blank" : undefined}
            rel={logo.href ? "noopener noreferrer" : undefined}
            draggable={false}
            className="flex touch-pan-y items-center justify-center flex-shrink-0 transition-transform duration-200"
            style={{
              height: logoHeight,
              width: logoHeight,
              marginRight: gap,
              touchAction: "pan-y",
              transform: scaleOnHover && hoveredIndex === i ? "scale(1.1)" : "scale(1)",
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            title={"title" in logo ? logo.title : "src" in logo ? logo.alt : undefined}
          >
            {"node" in logo ? (
              <span className="inline-flex w-full h-full [&>svg]:w-full [&>svg]:h-full">{logo.node}</span>
            ) : (
              <img src={logo.src} alt={logo.alt} draggable={false} className="max-h-full max-w-full object-contain" />
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

export default LogoLoop;
