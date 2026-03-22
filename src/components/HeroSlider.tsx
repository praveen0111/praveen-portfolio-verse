import { useEffect, useRef, useState } from "react";
import ComicParticles from "./ComicParticles";
import { ComicInkStrokeBar } from "./ComicInkStrokeBar";
import { ComicPopHeadlinePlate } from "./ComicPopHeadlinePlate";
import { cn } from "@/lib/utils";

interface HeroSliderProps {
  onNavigateCreative: () => void;
  onNavigateThink: () => void;
  /** When true after initial load, runs divider sweep: left → right → center */
  playIntro?: boolean;
  onIntroComplete?: () => void;
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
          onClick={onNavigateThink}
          aria-label="Go to Think"
          className={cn(
            "absolute z-10 pointer-events-auto cursor-pointer select-none touch-manipulation transition-transform duration-150 active:scale-[0.98]",
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
          onClick={onNavigateCreative}
          aria-label="Go to Creative"
          className={cn(
            "absolute z-10 pointer-events-auto cursor-pointer select-none touch-manipulation transition-transform duration-150 active:scale-[0.98]",
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
        </button>
      </div>

      {/* Divider with fluid movement - min 44px touch area on mobile (above THINK/CREATE hit areas) */}
      <div
        ref={dividerRef}
        className={`absolute z-[50] flex items-center justify-center touch-none ${
          isMobile 
            ? "left-0 right-0 cursor-ns-resize min-h-[44px]" 
            : "top-0 bottom-0 cursor-ew-resize min-w-[44px]"
        }`}
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
          if (introLockedRef.current) return;
          prevDragPosRef.current = positionRef.current;
          setKnobRotateDeg(0);
          setIsDragging(true);
        }}
        onTouchStart={() => {
          if (introLockedRef.current) return;
          prevDragPosRef.current = positionRef.current;
          setKnobRotateDeg(0);
          setIsDragging(true);
        }}
      >
        <ComicInkStrokeBar orientation={isMobile ? "horizontal" : "vertical"} />
        
        <div 
          className={`relative z-10 flex shrink-0 items-center justify-center rounded-full bg-black border-0 ${
            isMobile ? "h-14 w-14 sm:h-16 sm:w-16" : "h-16 w-16"
          }`}
          style={{
            boxShadow: "2.4px 3.2px 0 0 rgba(0, 0, 0, 0.4)",
            transform: `${isDragging ? "scale(1.1)" : "scale(1)"} rotate(${knobRotateDeg}deg)`,
            transition: isDragging
              ? "transform 0.05s linear"
              : "transform 0.22s ease-out",
          }}
        >
          <span
            className="font-comic text-white leading-none select-none text-[26px] tracking-wide inline-flex h-[22px] w-9 items-center justify-center"
            aria-hidden
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
