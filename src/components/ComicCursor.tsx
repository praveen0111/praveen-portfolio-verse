import { useEffect, useState, useRef } from "react";

/**
 * ============================================
 * COMIC CURSOR COMPONENT
 * ============================================
 * 
 * Custom cursor with ink-style effects:
 * - Ink distortion ripple on hover
 * - Ink spread effect on click
 * - Crosshair-style design
 * - Trail effect for movement
 * 
 * HOW TO CUSTOMIZE:
 * 1. cursorSize: Main cursor diameter
 * 2. trailCount: Number of trail elements
 * 3. inkSpreadDuration: Click effect duration
 */

interface InkRipple {
  id: number;
  x: number;
  y: number;
  createdAt: number;
}

const ComicCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [inkRipples, setInkRipples] = useState<InkRipple[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const trailPositions = useRef<{ x: number; y: number }[]>([]);
  const rippleIdRef = useRef(0);

  useEffect(() => {
    // Check if device has fine pointer (mouse)
    const hasFineMouse = window.matchMedia("(pointer: fine)").matches;
    if (!hasFineMouse) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Update trail
      trailPositions.current.unshift({ x: e.clientX, y: e.clientY });
      if (trailPositions.current.length > 5) {
        trailPositions.current.pop();
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      
      // Create ink ripple effect
      const newRipple: InkRipple = {
        id: rippleIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        createdAt: Date.now(),
      };
      
      setInkRipples(prev => [...prev, newRipple]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setInkRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("cursor-pointer");
      
      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => {
      setPosition({ x: -100, y: -100 });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Hide default cursor globally
    document.body.style.cursor = "none";
    
    // Add cursor-none to all interactive elements
    const style = document.createElement("style");
    style.innerHTML = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.body.style.cursor = "";
      document.head.removeChild(style);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Outer ring */}
        <div
          className={`
            absolute rounded-full border-2 border-white
            transition-all duration-150 ease-out
            ${isClicking ? "scale-75 opacity-50" : "scale-100 opacity-100"}
            ${isHovering ? "w-12 h-12 border-4" : "w-8 h-8"}
          `}
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        
        {/* Center dot - ink splash style */}
        <div
          className={`
            absolute rounded-full bg-white
            transition-all duration-100 ease-out
            ${isClicking ? "w-3 h-3" : "w-1.5 h-1.5"}
          `}
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        
        {/* Crosshair lines */}
        <div
          className={`
            absolute w-px h-3 bg-white/60
            transition-all duration-150
            ${isHovering ? "opacity-0" : "opacity-100"}
          `}
          style={{
            left: "50%",
            top: "-8px",
            transform: "translateX(-50%)",
          }}
        />
        <div
          className={`
            absolute w-px h-3 bg-white/60
            transition-all duration-150
            ${isHovering ? "opacity-0" : "opacity-100"}
          `}
          style={{
            left: "50%",
            bottom: "-8px",
            transform: "translateX(-50%)",
          }}
        />
        <div
          className={`
            absolute h-px w-3 bg-white/60
            transition-all duration-150
            ${isHovering ? "opacity-0" : "opacity-100"}
          `}
          style={{
            top: "50%",
            left: "-8px",
            transform: "translateY(-50%)",
          }}
        />
        <div
          className={`
            absolute h-px w-3 bg-white/60
            transition-all duration-150
            ${isHovering ? "opacity-0" : "opacity-100"}
          `}
          style={{
            top: "50%",
            right: "-8px",
            transform: "translateY(-50%)",
          }}
        />
      </div>

      {/* Ink ripple effects on click */}
      {inkRipples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Main ripple */}
          <div
            className="absolute rounded-full border-2 border-white/80 animate-ink-ripple"
            style={{
              width: 10,
              height: 10,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          
          {/* Secondary ripple */}
          <div
            className="absolute rounded-full border border-white/50 animate-ink-ripple-delayed"
            style={{
              width: 10,
              height: 10,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          
          {/* Ink splatter dots */}
          {[...Array(6)].map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const distance = 15 + Math.random() * 10;
            return (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white/70 animate-ink-splatter"
                style={{
                  left: "50%",
                  top: "50%",
                  "--splatter-x": `${Math.cos(angle) * distance}px`,
                  "--splatter-y": `${Math.sin(angle) * distance}px`,
                } as React.CSSProperties}
              />
            );
          })}
        </div>
      ))}
    </>
  );
};

export default ComicCursor;
