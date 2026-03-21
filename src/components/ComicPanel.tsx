import { ReactNode, useRef, useEffect, useState } from "react";

/**
 * ============================================
 * COMIC PANEL COMPONENT
 * ============================================
 * 
 * Wraps content in comic-book style panel frames:
 * - Scroll-triggered reveal animations
 * - Panel border styles
 * - Parallax depth effects
 * - Optional diagonal/skewed layouts
 * 
 * PANEL STYLES:
 * - default: Standard rectangular panel
 * - diagonal: Skewed panel for action
 * - floating: Panel with shadow depth
 * - burst: Action burst frame
 * 
 * HOW TO CUSTOMIZE:
 * 1. variant: Panel style type
 * 2. delay: Animation delay (ms)
 * 3. direction: Entrance direction
 */

interface ComicPanelProps {
  children: ReactNode;
  variant?: "default" | "diagonal" | "floating" | "burst";
  delay?: number;
  direction?: "left" | "right" | "up" | "down";
  className?: string;
  theme?: "think" | "creative";
}

const ComicPanel = ({
  children,
  variant = "default",
  delay = 0,
  direction = "up",
  className = "",
  theme = "think",
}: ComicPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let isEffectActive = true;
    timeoutIdRef.current = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isEffectActive) {
          if (timeoutIdRef.current !== null) {
            clearTimeout(timeoutIdRef.current);
          }
          timeoutIdRef.current = setTimeout(() => {
            if (!isEffectActive) {
              return;
            }
            setIsVisible(true);
            timeoutIdRef.current = null;
          }, delay);
        }
      },
      { threshold: 0.15, rootMargin: "-50px" }
    );

    const handleScroll = () => {
      if (!panelRef.current) return;
      
      const rect = panelRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, 1 - (rect.top / windowHeight)));
      setScrollProgress(progress);
    };

    if (panelRef.current) {
      observer.observe(panelRef.current);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      isEffectActive = false;
      if (timeoutIdRef.current !== null) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [delay]);

  // Direction-based transform
  const getInitialTransform = () => {
    switch (direction) {
      case "left":
        return "translateX(-80px) skewX(5deg)";
      case "right":
        return "translateX(80px) skewX(-5deg)";
      case "down":
        return "translateY(80px)";
      default:
        return "translateY(60px)";
    }
  };

  // Variant-specific styles
  const getVariantStyles = () => {
    const borderColor = theme === "creative" 
      ? "border-creative-accent/30" 
      : "border-think-accent/30";
    
    const shadowColor = theme === "creative"
      ? "shadow-creative-accent/20"
      : "shadow-think-accent/20";

    switch (variant) {
      case "diagonal":
        return `
          ${borderColor} border-4
          transform-gpu
          [clip-path:polygon(5%_0%,100%_0%,95%_100%,0%_100%)]
        `;
      case "floating":
        return `
          ${borderColor} border-4
          shadow-2xl ${shadowColor}
          hover:shadow-3xl
        `;
      case "burst":
        return `
          ${borderColor} border-4
          relative
          before:absolute before:inset-0
          before:border-4 before:${borderColor}
          before:transform before:rotate-3
          before:-z-10
        `;
      default:
        return `${borderColor} border-2`;
    }
  };

  // Parallax offset based on scroll
  const parallaxOffset = (scrollProgress - 0.5) * 20;

  return (
    <div
      ref={panelRef}
      className={`
        relative overflow-hidden
        ${getVariantStyles()}
        ${className}
      `}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible 
          ? `translateY(${parallaxOffset}px)` 
          : getInitialTransform(),
      }}
    >
      {/* Halftone corner decoration */}
      {variant !== "default" && (
        <div 
          className="absolute top-0 right-0 w-20 h-20 pointer-events-none opacity-20"
          style={{
            background: `radial-gradient(circle at 100% 0%, ${
              theme === "creative" ? "hsl(82, 100%, 50%)" : "hsl(36, 76%, 56%)"
            } 2px, transparent 2px)`,
            backgroundSize: "8px 8px",
          }}
        />
      )}
      
      {children}
    </div>
  );
};

export default ComicPanel;
