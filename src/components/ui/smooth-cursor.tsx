import { type FC, useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "motion/react";

/** Fixed visual tilt for the default pointer (degrees). Arrow variant stays untilted. */
const CURSOR_TILT_DEG = -45;
const CURSOR_BASE_SCALE = 0.5;
/** Arrow is 30% larger than the default cursor at the same base. */
const ARROW_SIZE_MULT = 1.3;

export interface SmoothCursorProps {
  cursor?: React.ReactNode;
  springConfig?: {
    damping: number;
    stiffness: number;
    mass: number;
    restDelta: number;
  };
}

const DESKTOP_POINTER_QUERY = "(any-hover: hover) and (any-pointer: fine)";
const TEXT_INPUT_SELECTOR = "input, textarea, select, [contenteditable='true']";
/** HeroSlider P.E. knob only — ↔ on desktop (ew-resize), ↑↓ on mobile (ns-resize) */
const SLIDER_PE_BUTTON_SELECTOR = '[data-smooth-cursor="slider-pe-button"]';

type PeSliderCursorVariant = "default" | "arrowH" | "arrowV";

function isTrackablePointer(pointerType: string) {
  return pointerType !== "touch";
}

function peSliderCursorVariant(clientX: number, clientY: number): PeSliderCursorVariant {
  const under = document.elementFromPoint(clientX, clientY);
  if (!(under instanceof Element)) return "default";
  const knob = under.closest(SLIDER_PE_BUTTON_SELECTOR);
  if (!knob) return "default";
  return knob.getAttribute("data-pe-slider-axis") === "vertical" ? "arrowV" : "arrowH";
}

const DefaultCursorSVG: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={50}
      height={54}
      viewBox="0 0 50 54"
      fill="none"
      style={{ scale: 0.5 }}
    >
      <g filter="url(#filter0_d_91_7928)">
        <path
          d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
          fill="black"
        />
        <path
          d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
          stroke="var(--smooth-cursor-border, #ffffff)"
          strokeWidth={2.25825}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_91_7928"
          x={0.602397}
          y={0.952444}
          width={49.0584}
          height={52.428}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={2.25825} />
          <feGaussianBlur stdDeviation={2.25825} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_91_7928"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_91_7928"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

const TwoPointedVerticalArrowSVG: FC = () => {
  /** Vertical ↕ : shaft top–bottom, tips up/down (mobile hero slider / ns-resize). */
  const border = "var(--smooth-cursor-border, #ffffff)";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={28} height={50} viewBox="0 0 28 50" fill="none">
      <path d="M14 18V32" stroke={border} strokeWidth={5} strokeLinecap="round" />
      <path
        d="M8 18L14 10L20 18"
        stroke={border}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 32L14 40L20 32"
        stroke={border}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 16L10 12M14 16L18 12"
        stroke="white"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 34L10 38M14 34L18 38"
        stroke="white"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const TwoPointedArrowSVG: FC = () => {
  /** Horizontal ↔ : shaft left–right, tips point outward (resize affordance). */
  const border = "var(--smooth-cursor-border, #ffffff)";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={50} height={28} viewBox="0 0 50 28" fill="none">
      <path d="M18 14H32" stroke={border} strokeWidth={5} strokeLinecap="round" />
      <path
        d="M18 8L10 14L18 20"
        stroke={border}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 8L40 14L32 20"
        stroke={border}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 14L12 10M16 14L12 18"
        stroke="white"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34 14L38 10M34 14L38 18"
        stroke="white"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export function SmoothCursor({
  cursor = <DefaultCursorSVG />,
  springConfig = {
    damping: 45,
    stiffness: 400,
    mass: 1,
    restDelta: 0.001,
  },
}: SmoothCursorProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<PeSliderCursorVariant>("default");
  const cursorSwapRef = useRef<HTMLDivElement | null>(null);
  const cursorVariantRef = useRef<PeSliderCursorVariant>("default");

  // No physics: direct updates from pointermove.
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_POINTER_QUERY);

    const updateEnabled = () => {
      const nextIsEnabled = mediaQuery.matches;
      setIsEnabled(nextIsEnabled);

      if (!nextIsEnabled) {
        setIsVisible(false);
      }
    };

    updateEnabled();
    mediaQuery.addEventListener("change", updateEnabled);

    return () => {
      mediaQuery.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const smoothPointerMove = (e: PointerEvent) => {
      if (!isTrackablePointer(e.pointerType)) {
        return;
      }

      const target = e.target;
      if (target instanceof Element) {
        // Hide smooth cursor over text inputs so the caret shows normally.
        if (target.closest(TEXT_INPUT_SELECTOR)) {
          setIsVisible(false);
          return;
        }
      }

      setIsVisible(true);

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const nextVariant = peSliderCursorVariant(e.clientX, e.clientY);
      if (cursorVariantRef.current !== nextVariant) {
        cursorVariantRef.current = nextVariant;
        cursorSwapRef.current?.setAttribute("data-variant", nextVariant);
        setCursorVariant(nextVariant);
      }
    };

    let rafId = 0;
    const throttledPointerMove = (e: PointerEvent) => {
      if (!isTrackablePointer(e.pointerType)) {
        return;
      }

      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        smoothPointerMove(e);
        rafId = 0;
      });
    };

    document.body.style.cursor = "none";
    window.addEventListener("pointermove", throttledPointerMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", throttledPointerMove);
      document.body.style.cursor = "auto";
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [cursorX, cursorY, isEnabled]);

  if (!isEnabled) {
    return null;
  }

  /** Default diamond is centered on the pointer; the visible “tip” sits below center — shift up so clicks line up with what you see. */
  const tipAlignTranslateY =
    cursorVariant === "arrowH" || cursorVariant === "arrowV" ? "-50%" : "calc(-50% - 14px)";

  return (
    <motion.div
      style={{
        position: "fixed",
        left: cursorX,
        top: cursorY,
        translateX: "-50%",
        translateY: tipAlignTranslateY,
        zIndex: 99999,
        pointerEvents: "none",
        willChange: "transform",
        opacity: isVisible ? 1 : 0,
      }}
      initial={false}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{
        duration: 0.15,
      }}
    >
      <div
        ref={cursorSwapRef}
        data-variant="default"
        style={{
          transform:
            cursorVariant === "arrowH" || cursorVariant === "arrowV"
              ? `scale(${CURSOR_BASE_SCALE * ARROW_SIZE_MULT}) rotate(0deg)`
              : `scale(${CURSOR_BASE_SCALE}) rotate(${CURSOR_TILT_DEG}deg)`,
          transformOrigin: "center",
          transition: "transform 140ms ease-out",
        }}
      >
        <style>{`
          [data-variant="arrowH"] .smooth-cursor__default,
          [data-variant="arrowV"] .smooth-cursor__default { opacity: 0; }
          [data-variant="default"] .smooth-cursor__arrow-h,
          [data-variant="default"] .smooth-cursor__arrow-v { opacity: 0; }
          [data-variant="arrowH"] .smooth-cursor__arrow-h { opacity: 1; }
          [data-variant="arrowH"] .smooth-cursor__arrow-v { opacity: 0; }
          [data-variant="arrowV"] .smooth-cursor__arrow-v { opacity: 1; }
          [data-variant="arrowV"] .smooth-cursor__arrow-h { opacity: 0; }
          .smooth-cursor__default, .smooth-cursor__arrow-h, .smooth-cursor__arrow-v { transition: opacity 120ms linear; }
        `}</style>
        <span className="smooth-cursor__default">{cursor}</span>
        <span className="smooth-cursor__arrow-h">
          <TwoPointedArrowSVG />
        </span>
        <span className="smooth-cursor__arrow-v">
          <TwoPointedVerticalArrowSVG />
        </span>
      </div>
    </motion.div>
  );
}
