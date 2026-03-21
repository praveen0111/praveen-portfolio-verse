import { useEffect, useRef } from "react";

/**
 * ============================================
 * COMIC CURSOR COMPONENT
 * ============================================
 * 
 * Custom cursor with ink effects:
 * - Ink distortion ripple on hover
 * - Ink spread/splatter on click
 * - Comic-style visual feedback
 * - Replaces default cursor
 * 
 * HOW TO USE:
 * Add <ComicCursor /> to your root component or App
 */

const ComicCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pointerCursorRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const pointerCursor = pointerCursorRef.current;
    const ripple = rippleRef.current;
    if (!cursor || !pointerCursor || !ripple) return;

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      // Smooth cursor follow
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      const animate = () => {
        const activeCursor = isHoveringRef.current ? pointerCursor : cursor;
        const rect = activeCursor.getBoundingClientRect();
        const currentX = rect.left + rect.width / 2;
        const currentY = rect.top + rect.height / 2;

        const dx = e.clientX - currentX;
        const dy = e.clientY - currentY;

        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
          const newX = currentX + dx * 0.15;
          const newY = currentY + dy * 0.15;
          cursor.style.left = `${newX}px`;
          cursor.style.top = `${newY}px`;
          pointerCursor.style.left = `${newX}px`;
          pointerCursor.style.top = `${newY}px`;
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          cursor.style.left = `${e.clientX}px`;
          cursor.style.top = `${e.clientY}px`;
          pointerCursor.style.left = `${e.clientX}px`;
          pointerCursor.style.top = `${e.clientY}px`;
        }
      };

      // Initialize position
      if (!cursor.style.left || !cursor.style.top) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        pointerCursor.style.left = `${e.clientX}px`;
        pointerCursor.style.top = `${e.clientY}px`;
      }
      
      animate();
    };

    // Hover effect - switch to pointer cursor
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isPointer = 
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer";
      
      isHoveringRef.current = isPointer;
      
      if (isPointer) {
        cursor.style.display = "none";
        pointerCursor.style.display = "block";
        if (ripple) {
          ripple.style.left = `${e.clientX}px`;
          ripple.style.top = `${e.clientY}px`;
          ripple.classList.add("active");
        }
      } else {
        cursor.style.display = "block";
        pointerCursor.style.display = "none";
        if (ripple) {
          ripple.classList.remove("active");
        }
      }
    };

    // Click effect - ink splatter
    const handleClick = (e: MouseEvent) => {
      const splatter = document.createElement("div");
      splatter.className = "cursor-splatter";
      splatter.style.left = `${e.clientX}px`;
      splatter.style.top = `${e.clientY}px`;
      document.body.appendChild(splatter);

      setTimeout(() => {
        splatter.remove();
      }, 400);
    };

    // Hide default cursor
    document.body.style.cursor = "none";

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("click", handleClick);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("click", handleClick);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="comic-cursor">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="halftone-arrow" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.8" fill="#DC2626" opacity="0.7"/>
            </pattern>
          </defs>
          <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="url(#halftone-arrow)" stroke="#FFD700" strokeWidth="2.5" strokeLinejoin="round"/>
        </svg>
      </div>
      <div ref={pointerCursorRef} className="comic-cursor-pointer" style={{ display: 'none' }}>
        <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="halftone-hand" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.8" fill="#DC2626" opacity="0.7"/>
            </pattern>
          </defs>
          {/* Pointing hand - index finger up */}
          <path d="M7 1L7 8L5.5 8C4.67157 8 4 8.67157 4 9.5V10.5C4 11.3284 4.67157 12 5.5 12L7 12L7 22C7 22.5523 7.44772 23 8 23H10C10.5523 23 11 22.5523 11 22V12L12.5 12C13.3284 12 14 11.3284 14 10.5V9.5C14 8.67157 13.3284 8 12.5 8L11 8L11 1C11 0.447715 10.5523 0 10 0H8C7.44772 0 7 0.447715 7 1Z" fill="url(#halftone-hand)" stroke="#FFD700" strokeWidth="2.5" strokeLinejoin="round"/>
          {/* Thumb and palm */}
          <rect x="5" y="13" width="6" height="9" rx="1.5" fill="url(#halftone-hand)" stroke="#FFD700" strokeWidth="2.5"/>
        </svg>
      </div>
      <div ref={rippleRef} className="cursor-ripple" />
      <style>{`
        .comic-cursor {
          position: fixed;
          width: 24px;
          height: 24px;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-8px, -8px);
          filter: drop-shadow(3px 3px 0px rgba(0, 0, 0, 0.9));
        }

        .comic-cursor svg {
          width: 100%;
          height: 100%;
        }

        .comic-cursor-pointer {
          position: fixed;
          width: 18px;
          height: 24px;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-4px, -2px);
          filter: drop-shadow(3px 3px 0px rgba(0, 0, 0, 0.9));
        }

        .comic-cursor-pointer svg {
          width: 100%;
          height: 100%;
        }

        .cursor-ripple {
          position: fixed;
          width: 10px;
          height: 10px;
          border: 1px solid rgba(255, 215, 0, 0.5);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          opacity: 0;
        }

        .cursor-ripple.active {
          width: 60px;
          height: 60px;
          opacity: 0.3;
          border-color: rgba(255, 215, 0, 0.8);
        }

        .cursor-splatter {
          position: fixed;
          width: 30px;
          height: 30px;
          border: 2px solid #FFD700;
          border-radius: 50% 40% 50% 40%;
          pointer-events: none;
          z-index: 9997;
          transform: translate(-50%, -50%) scale(0);
          opacity: 0.8;
          background: radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, transparent 70%);
          animation: ink-splatter 0.4s ease-out forwards;
        }

        @keyframes ink-splatter {
          0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 0.8;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.5) rotate(180deg);
            opacity: 0.5;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.5) rotate(360deg);
            opacity: 0;
          }
        }

        /* Hide cursor on touch devices */
        @media (hover: none) {
          .comic-cursor,
          .comic-cursor-pointer,
          .cursor-ripple {
            display: none !important;
          }
          body {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
};

export default ComicCursor;

