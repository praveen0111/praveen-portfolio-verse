import { ReactNode, useEffect, useState } from "react";

/**
 * ============================================
 * PAGE TRANSITION COMPONENT
 * ============================================
 * 
 * Spider-Verse inspired transitions with:
 * - Directional motion (based on page type)
 * - Parallax depth effects
 * - Panel/frame-like movements
 * - Eased snap timing
 * 
 * MOTION INTENSITY:
 * - THINK: Slower (0.6-0.7s), calmer easing
 * - CREATIVE: Faster (0.3-0.4s), bolder easing with slight overshoot
 * 
 * HOW TO CUSTOMIZE:
 * 1. Edit animation classes in tailwind.config.ts
 * 2. Modify transition durations below
 * 3. Change easing curves for different feel
 */

type TransitionType = "think" | "creative" | "fusion" | "home";

interface PageTransitionProps {
  children: ReactNode;
  type: TransitionType;
  isVisible: boolean;
}

const PageTransition = ({ children, type, isVisible }: PageTransitionProps) => {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      // Set entrance animation based on page type
      switch (type) {
        case "think":
          setAnimationClass("animate-think-enter");
          break;
        case "creative":
          setAnimationClass("animate-creative-enter");
          break;
        case "fusion":
          setAnimationClass("animate-slide-up");
          break;
        case "home":
          setAnimationClass("animate-scale-fade");
          break;
        default:
          setAnimationClass("animate-fadeIn");
      }
    } else {
      // Exit animation
      setAnimationClass("opacity-0 transition-opacity duration-300");
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, type]);

  if (!shouldRender) return null;

  return (
    <div className={`w-full ${animationClass}`}>
      {children}
    </div>
  );
};

export default PageTransition;
