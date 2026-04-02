import { useEffect, useId, useRef, useState } from "react";
import ComicParticles from "./ComicParticles";
import { ComicInkStrokeBar } from "./ComicInkStrokeBar";
import { ComicPopHeadlinePlate } from "./ComicPopHeadlinePlate";
import { cn } from "@/lib/utils";

function ComicKnobMicroStrokes() {
  const rawId = useId().replace(/:/g, "");
  const filterId = `knob-ink-${rawId}`;

  // Deterministic “micro paint strokes” around the knob edge.
  // Kept mostly vertical (top/bottom) and very small to avoid looking jagged.
  const top = Array.from({ length: 17 }, (_, i) => {
    const x = 18 + i * 4.6 + (i % 3 === 0 ? -1 : i % 3 === 1 ? 0.8 : 1.2);
    const len = 2 + (i % 5) + (i % 2 === 0 ? 1 : 0); // ~2..8
    const wobble = (i % 4 - 1.5) * 0.12; // tiny horizontal wobble
    return { x, len, wobble };
  });

  return (
    <svg className="absolute inset-0 z-0 overflow-visible pointer-events-none" viewBox="0 0 100 100" aria-hidden>
      <defs>
        <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="9" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      {/* Top protrusions */}
      <g filter={`url(#${filterId})`} stroke="#000" strokeWidth="2" strokeLinecap="round">
        {top.map((s, idx) => (
          <line key={`t-${idx}`} x1={s.x} y1={10} x2={s.x + s.wobble} y2={10 - s.len} />
        ))}
      </g>

      {/* Bottom protrusions */}
      <g filter={`url(#${filterId})`} stroke="#000" strokeWidth="2" strokeLinecap="round">
        {top.map((s, idx) => (
          <line key={`b-${idx}`} x1={s.x} y1={90} x2={s.x + s.wobble} y2={90 + s.len} />
        ))}
      </g>
    </svg>
  );
}

interface HeroSliderProps {
  onNavigateCreative: () => void;
  onNavigateThink: () => void;
  /** When true after initial load, runs divider sweep: left → right → center */
  playIntro?: boolean;
  onIntroComplete?: () => void;
  /** When true, THINK/CREATE and divider are inactive (loading, reveal blur, intro sweep) */
  navigationLocked?: boolean;
}

/** Pause at each intro stop (was 1s) */
const INTRO_HOLD_MS = 500;

/** Mobile (HeroSlider isMobile): THINK in upper panel — edit vertical offset here */
const MOBILE_THINK_BUTTON_CLASS =
  "left-0 right-0 top-[58%] flex justify-center text-center px-3";

/** Mobile: CREATE sits in the lower panel — X centered via flex (desktop keeps left-[20%]) */
const MOBILE_CREATE_BUTTON_CLASS =
  "left-0 right-0 bottom-[70%] flex justify-center text-center px-3";

const HeroSlider = ({
  onNavigateCreative,
  onNavigateThink,
  playIntro = false,
  onIntroComplete,
  navigationLocked = false,
}: HeroSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [introLocked, setIntroLocked] = useState(false);
  /** Bumps when targetPositionRef changes without drag so the RAF loop restarts */
  const [targetKick, setTargetKick] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const introLockedRef = useRef(false);
  const positionRef = useRef(50);
  const introPendingRef = useRef(true);
  const onIntroCompleteRef = useRef(onIntroComplete);
  useEffect(() => {
    onIntroCompleteRef.current = onIntroComplete;
  }, [onIntroComplete]);
  
  // Momentum/velocity tracking for fluid animation
  const velocityRef = useRef(0);
  const lastPositionRef = useRef(50);
  const lastTimeRef = useRef(Date.now());
  const animationFrameRef = useRef<number | null>(null);
  const targetPositionRef = useRef(50);
  const prevDragPosRef = useRef(50);
  const [knobRotateDeg, setKnobRotateDeg] = useState(0);

  // Asset paths
  const thinkBackground = "/images/think-background.webp";
  const creativeBackground = "/images/creative-background.webp";

  useEffect(() => {
    introLockedRef.current = introLocked;
  }, [introLocked]);

  useEffect(() => {
    positionRef.current = sliderPosition;
  }, [sliderPosition]);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const bumpTarget = (next: number) => {
    targetPositionRef.current = next;
    setTargetKick((k) => k + 1);
  };

  // Intro: left (think) → right (creative) → center, hold at each stop
  useEffect(() => {
    if (!playIntro || !introPendingRef.current) return;

    let cancelled = false;

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        setTimeout(resolve, ms);
      });

    const waitUntilNear = (target: number, tolerance = 1.5) =>
      new Promise<void>((resolve) => {
        const deadline = Date.now() + 8000;
        const tick = () => {
          if (cancelled) {
            resolve();
            return;
          }
          if (Math.abs(positionRef.current - target) <= tolerance) {
            resolve();
            return;
          }
          if (Date.now() > deadline) {
            resolve();
            return;
          }
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });

    const run = async () => {
      setIntroLocked(true);
      bumpTarget(5);
      await waitUntilNear(5);
      if (cancelled) return;
      await sleep(INTRO_HOLD_MS);
      if (cancelled) return;
      bumpTarget(95);
      await waitUntilNear(95);
      if (cancelled) return;
      await sleep(INTRO_HOLD_MS);
      if (cancelled) return;
      bumpTarget(50);
      await waitUntilNear(50);
      if (cancelled) return;
      introPendingRef.current = false;
      setIntroLocked(false);
      onIntroCompleteRef.current?.();
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [playIntro]);

  // Fluid animation loop with momentum
  useEffect(() => {
    const animate = () => {
      const current = sliderPosition;
      const target = targetPositionRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.01) {
        // Smooth easing with momentum
        const ease = 0.12; // Lower = smoother but slower
        const newPosition = Math.max(5, Math.min(95, current + diff * ease));
        setSliderPosition(newPosition);
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setSliderPosition(Math.max(5, Math.min(95, target)));
        animationFrameRef.current = null;
      }
    };

    if (animationFrameRef.current === null && Math.abs(sliderPosition - targetPositionRef.current) > 0.01) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [sliderPosition, targetKick]);

  // Apply momentum when drag ends
  useEffect(() => {
    if (introLocked) return;
    if (!isDragging && Math.abs(velocityRef.current) > 0.5) {
      const momentum = velocityRef.current * 0.25; // Momentum multiplier
      const newTarget = Math.max(5, Math.min(95, sliderPosition + momentum));
      targetPositionRef.current = newTarget;
      // Decay velocity
      velocityRef.current *= 0.8;
    }
  }, [introLocked, isDragging, sliderPosition]);

  // Knob tilt: right (position ↑) → anticlockwise (negative °); left → clockwise (positive °)
  useEffect(() => {
    if (!isDragging) {
      setKnobRotateDeg(0);
      return;
    }
    const prev = prevDragPosRef.current;
    const delta = sliderPosition - prev;
    if (Math.abs(delta) < 0.00002) return;
    prevDragPosRef.current = sliderPosition;
    setKnobRotateDeg((r) => Math.max(-42, Math.min(42, r - delta * 1.35)));
  }, [sliderPosition, isDragging]);

  // Mouse/Touch handling with velocity tracking
  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (clientPos: number) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const now = Date.now();
      const timeDelta = now - lastTimeRef.current;
      
      const pos = isMobile
        ? Math.max(5, Math.min(95, ((clientPos - rect.top) / rect.height) * 100))
        : Math.max(5, Math.min(95, ((clientPos - rect.left) / rect.width) * 100));

      // Calculate velocity for momentum
      if (timeDelta > 0) {
        const positionDelta = pos - lastPositionRef.current;
        velocityRef.current = (positionDelta / timeDelta) * 16; // Normalize to ~60fps
      }

      // Update immediately while dragging for responsiveness
      setSliderPosition(pos);
      targetPositionRef.current = pos;
      lastPositionRef.current = pos;
      lastTimeRef.current = now;
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(isMobile ? e.clientY : e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      handleMove(isMobile ? e.touches[0].clientY : e.touches[0].clientX);
    };

    const handleEnd = () => {
      setIsDragging(false);
      // Velocity will be applied in the cleanup/effect above
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchend", handleEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, isMobile, sliderPosition]);

  // Calculate dominance with smooth curves
  const thinkDominance = Math.max(0, Math.min(100, ((50 - sliderPosition) / 40) * 100));
  const creativeDominance = Math.max(0, Math.min(100, ((sliderPosition - 50) / 40) * 100));

  return (
    <>
      <div 
        ref={containerRef} 
        className="relative h-full min-h-0 w-full flex-1 overflow-hidden select-none"
        style={{ willChange: "contents" }}
      >
      {/* Comic Particles */}
      <div 
        className="absolute inset-0" 
        style={{ 
          clipPath: isMobile 
            ? `inset(0 0 ${100 - sliderPosition}% 0)` 
            : `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <ComicParticles mode="think" />
      </div>
      
      <div 
        className="absolute inset-0" 
        style={{ 
          clipPath: isMobile 
            ? `inset(${sliderPosition}% 0 0 0)` 
            : `inset(0 0 0 ${sliderPosition}%)`,
        }}
      >
        <ComicParticles mode="creative" />
      </div>

      {/* THINK Background */}
      <div 
        className="absolute inset-0"
        style={{ 
          clipPath: isMobile 
            ? `inset(0 0 ${100 - sliderPosition}% 0)` 
            : `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <img 
          src={thinkBackground}
          alt="Think workspace"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: isMobile ? "center" : "left center" }}
          draggable={false}
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* CREATE. Background */}
      <div 
        className="absolute inset-0"
        style={{ 
          clipPath: isMobile 
            ? `inset(${sliderPosition}% 0 0 0)` 
            : `inset(0 0 0 ${sliderPosition}%)`,
        }}
      >
        <img 
          src={creativeBackground}
          alt="Creative cityscape"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: isMobile ? "center" : "right center" }}
          draggable={false}
          fetchPriority="low"
          decoding="async"
        />
      </div>

      {/* THINK - Think page (left panel), centered */}
      <div 
        className="absolute inset-0 z-30 pointer-events-none"
        style={{ 
          clipPath: isMobile 
            ? `inset(0 0 ${100 - sliderPosition}% 0)` 
            : `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <button
          type="button"
          onClick={() => {
            if (navigationLocked) return;
            onNavigateThink();
          }}
          disabled={navigationLocked}
          aria-disabled={navigationLocked}
          aria-label="Go to Think"
          className={cn(
            "absolute z-10 select-none touch-manipulation transition-transform duration-150",
            navigationLocked
              ? "pointer-events-none cursor-not-allowed opacity-60"
              : "group pointer-events-auto cursor-pointer active:scale-[0.98]",
            isMobile ? MOBILE_THINK_BUTTON_CLASS : "left-1/2 top-24 -translate-x-1/2 md:top-28",
          )}
          style={{ background: "none", border: "none", padding: 0 }}
        >
          <span
            className={cn(
              "inline-block origin-center max-w-[min(100%,22rem)]",
              isMobile ? "scale-[0.675] -translate-x-14" : "scale-[0.5625]"
            )}
          >
            <span
              className={cn(
                "inline-block will-change-transform",
                !navigationLocked &&
                  "motion-safe:animate-hero-plate-bounce motion-reduce:animate-none group-hover:animate-none",
              )}
            >
              <ComicPopHeadlinePlate
                variant="primary"
                align="center"
                className="inline-block"
                textClassName="text-[2rem] xs:text-[2.5rem] sm:text-[2.8125rem] md:text-7xl lg:text-8xl"
                plateStyle={isMobile ? undefined : { left: "386px" }}
                inline
              >
                THINK.
              </ComicPopHeadlinePlate>
            </span>
          </span>
        </button>
      </div>

      {/* CREATE. - Create page (right panel), centered */}
      <div 
        className="absolute inset-0 z-[35] pointer-events-none"
        style={{ 
          clipPath: isMobile 
            ? `inset(${sliderPosition}% 0 0 0)` 
            : `inset(0 0 0 ${sliderPosition}%)`,
        }}
      >
        <button
          type="button"
          onClick={() => {
            if (navigationLocked) return;
            onNavigateCreative();
          }}
          disabled={navigationLocked}
          aria-disabled={navigationLocked}
          aria-label="Go to Creative"
          className={cn(
            "absolute z-10 select-none touch-manipulation transition-transform duration-150",
            navigationLocked
              ? "pointer-events-none cursor-not-allowed opacity-60"
              : "group pointer-events-auto cursor-pointer active:scale-[0.98]",
            isMobile
              ? MOBILE_CREATE_BUTTON_CLASS
              : "left-[20%] top-24 -translate-x-1/2 md:top-28",
          )}
          style={{ background: "none", border: "none", padding: 0 }}
        >
          <span
            className={cn(
              "inline-block origin-center max-w-[min(100%,22rem)]",
              isMobile
                ? "scale-[0.675] -translate-x-14 translate-y-16"
                : "scale-[0.5625]"
            )}
          >
            <span
              className={cn(
                "inline-block will-change-transform",
                !navigationLocked &&
                  "motion-safe:animate-hero-plate-bounce motion-reduce:animate-none group-hover:animate-none",
              )}
            >
              <ComicPopHeadlinePlate
                variant="secondary"
                align="center"
                className="inline-block"
                textClassName="text-[2rem] xs:text-[2.5rem] sm:text-[2.8125rem] md:text-7xl lg:text-8xl"
                plateStyle={
                  ({
                    top: "18px",
                    // Override just this plate's bg to neon red
                    ["--plate-bg" as any]: "hsl(var(--neon-red) / 0.9)",
                  } as any)
                }
                inline
              >
                CREATE.
              </ComicPopHeadlinePlate>
            </span>
          </span>
        </button>
      </div>

      {/* Divider with fluid movement - min 44px touch area on mobile (above THINK/CREATE hit areas) */}
      <div
        ref={dividerRef}
        className={cn(
          "absolute z-[50] flex items-center justify-center touch-none",
          isMobile ? "left-0 right-0 min-h-[44px]" : "top-0 bottom-0 min-w-[44px]",
          navigationLocked
            ? "pointer-events-none cursor-not-allowed opacity-70"
            : isMobile
              ? "cursor-ns-resize"
              : "cursor-ew-resize",
        )}
        style={isMobile 
          ? {
              top: `${sliderPosition}%`,
              transform: "translateY(-50%)",
              height: "44px",
            }
          : {
              left: `${sliderPosition}%`,
              transform: "translateX(-50%)",
              width: "44px",
            }
        }
        onMouseDown={() => {
          if (navigationLocked || introLockedRef.current) return;
          prevDragPosRef.current = positionRef.current;
          setKnobRotateDeg(0);
          setIsDragging(true);
        }}
        onTouchStart={() => {
          if (navigationLocked || introLockedRef.current) return;
          prevDragPosRef.current = positionRef.current;
          setKnobRotateDeg(0);
          setIsDragging(true);
        }}
      >
        <ComicInkStrokeBar orientation={isMobile ? "horizontal" : "vertical"} />
        
        <div 
          className={`relative z-10 flex shrink-0 items-center justify-center rounded-full bg-black border-0 overflow-visible ${
            isMobile ? "h-14 w-14 sm:h-16 sm:w-16" : "h-16 w-16"
          }`}
          style={{
            boxShadow: "2.4px 3.2px 0 0 rgba(0, 0, 0, 0.4)",
            // Keep the circle outline stable while dragging; rotating the whole shape
            // can create aliasing gaps that look "rough" near the vertical divider.
            transform: `${isDragging ? "scale(1.1)" : "scale(1)"} translateZ(0)`,
            transition: isDragging
              ? "transform 0.05s linear"
              : "transform 0.22s ease-out",
          }}
        >
          <ComicKnobMicroStrokes />
          <span
            className="relative z-10 font-comic text-white leading-none select-none text-[26px] tracking-wide inline-flex h-[22px] w-9 items-center justify-center"
            aria-hidden
            style={{
              transform: `rotate(${knobRotateDeg}deg)`,
              transformOrigin: "50% 50%",
              // Helps keep text rotation crisp while avoiding extra edge aliasing.
              willChange: "transform",
              display: "inline-flex",
            }}
          >
            P.E.
          </span>
        </div>
      </div>

    </div>
    </>
  );
};

export default HeroSlider;
