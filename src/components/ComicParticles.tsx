import { useEffect, useRef } from "react";

/**
 * ============================================
 * COMIC PARTICLE SYSTEM COMPONENT
 * ============================================
 * 
 * Dynamic halftone/ink particles that:
 * - Constantly move (never static)
 * - React to scroll (density shifts, parallax)
 * - React to mouse (repel, distort, ripple)
 * - Different speeds for Think (slow) vs Creative (fast)
 * - Ink-based, comic-textural feel
 * 
 * HOW TO USE:
 * <ComicParticles mode="think" /> or <ComicParticles mode="creative" />
 */

interface ComicParticlesProps {
  mode: "think" | "creative" | "fusion";
  intensity?: number; // 0-1, default based on mode
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseX: number;
  baseY: number;
  type: "dot" | "ink" | "grain";
}

const ComicParticles = ({ mode, intensity }: ComicParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });
  const scrollRef = useRef(0);
  const lastScrollRef = useRef(0);

  // Mode-based defaults
  const getModeConfig = () => {
    switch (mode) {
      case "think":
        return {
          particleCount: 80,
          baseSpeed: 0.3,
          maxSpeed: 0.8,
          sizeRange: [1, 3],
          opacityRange: [0.15, 0.35],
          interactionRadius: 120,
          scrollSensitivity: 0.5,
        };
      case "creative":
        return {
          particleCount: 120,
          baseSpeed: 0.8,
          maxSpeed: 2.0,
          sizeRange: [1, 4],
          opacityRange: [0.2, 0.5],
          interactionRadius: 150,
          scrollSensitivity: 1.2,
        };
      case "fusion":
        return {
          particleCount: 100,
          baseSpeed: 0.5,
          maxSpeed: 1.2,
          sizeRange: [1, 3.5],
          opacityRange: [0.18, 0.4],
          interactionRadius: 130,
          scrollSensitivity: 0.8,
        };
    }
  };

  const config = getModeConfig();
  const finalIntensity = intensity ?? 1;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < config.particleCount * finalIntensity; i++) {
        const type = Math.random() < 0.6 ? "dot" : Math.random() < 0.8 ? "ink" : "grain";
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * config.baseSpeed,
          vy: (Math.random() - 0.5) * config.baseSpeed,
          size: config.sizeRange[0] + Math.random() * (config.sizeRange[1] - config.sizeRange[0]),
          opacity: config.opacityRange[0] + Math.random() * (config.opacityRange[1] - config.opacityRange[0]),
          baseX: Math.random() * canvas.width,
          baseY: Math.random() * canvas.height,
          type,
        });
      }
    };
    initParticles();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.isActive = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
    };

    // Scroll tracking
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas with fade for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // For Think mode, use lighter fade
      if (mode === "think") {
        ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      const scrollDelta = scrollRef.current - lastScrollRef.current;
      lastScrollRef.current = scrollRef.current;

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Base movement
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Scroll reaction - parallax effect
        const scrollOffset = scrollDelta * config.scrollSensitivity * 0.1;
        particle.y += scrollOffset;

        // Mouse interaction
        if (mouseRef.current.isActive) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.interactionRadius) {
            const force = (1 - distance / config.interactionRadius) * 2;
            const angle = Math.atan2(dy, dx);
            particle.vx -= Math.cos(angle) * force * 0.1;
            particle.vy -= Math.sin(angle) * force * 0.1;
          }
        }

        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Velocity damping (return to base speed)
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        if (speed > config.maxSpeed) {
          particle.vx = (particle.vx / speed) * config.maxSpeed;
          particle.vy = (particle.vy / speed) * config.maxSpeed;
        } else if (speed < config.baseSpeed && !mouseRef.current.isActive) {
          particle.vx *= 1.02;
          particle.vy *= 1.02;
        }

        // Draw particle based on type
        ctx.save();
        ctx.globalAlpha = particle.opacity;

        if (particle.type === "dot") {
          // Halftone dot
          ctx.fillStyle = mode === "think" ? "hsl(var(--think-fg))" : "hsl(var(--creative-fg))";
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (particle.type === "ink") {
          // Ink splatter shape
          ctx.fillStyle = mode === "think" ? "hsl(var(--think-accent))" : "hsl(var(--creative-accent))";
          ctx.beginPath();
          ctx.ellipse(particle.x, particle.y, particle.size * 1.5, particle.size, Math.random() * Math.PI, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Grain texture
          ctx.fillStyle = mode === "think" ? "hsl(var(--think-fg))" : "hsl(var(--creative-fg))";
          ctx.fillRect(particle.x, particle.y, particle.size * 0.5, particle.size * 0.5);
        }

        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mode, config, finalIntensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        mixBlendMode: mode === "think" ? "multiply" : mode === "creative" ? "screen" : "normal",
        opacity: mode === "fusion" ? 0.6 : 1
      }}
    />
  );
};

export default ComicParticles;

