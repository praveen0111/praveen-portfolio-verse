import { useEffect } from "react";
import { motion, useAnimation, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

import "./CircularText.css";

const getRotationTransition = (duration: number, from: number, loop = true) => ({
  from,
  to: from + 360,
  ease: "linear" as const,
  duration,
  type: "tween" as const,
  repeat: loop ? Infinity : 0,
});

const getTransition = (duration: number, from: number) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: "spring" as const,
    damping: 20,
    stiffness: 300,
  },
});

type CircularTextHoverMode = "slowDown" | "speedUp" | "pause" | "goBonkers" | null;

type CircularTextProps = {
  text: string;
  spinDuration?: number;
  onHover?: CircularTextHoverMode;
  className?: string;
};

const CircularText = ({ text, spinDuration = 20, onHover = "speedUp", className = "" }: CircularTextProps) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinDuration, text, onHover]);

  const handleHoverStart = () => {
    const start = rotation.get();
    if (!onHover) return;

    let transitionConfig: ReturnType<typeof getTransition> | { rotate: any; scale: any };
    let scaleVal = 1;

    switch (onHover) {
      case "slowDown":
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case "speedUp":
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case "pause":
        transitionConfig = {
          rotate: { type: "spring", damping: 20, stiffness: 300 },
          scale: { type: "spring", damping: 20, stiffness: 300 },
        };
        scaleVal = 1;
        break;
      case "goBonkers":
        transitionConfig = getTransition(spinDuration / 20, start);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start);
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig as any,
    });
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  };

  return (
    <motion.div
      className={cn("circular-text", className)}
      style={{ rotate: rotation }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      aria-hidden
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const transform = `rotateZ(${rotationDeg}deg) translateY(calc(-1 * var(--circular-text-radius)))`;

        return (
          <span key={i} style={{ transform, WebkitTransform: transform }} aria-hidden>
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;

