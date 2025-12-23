import { useEffect, useRef, useCallback } from "react";

/**
 * ============================================
 * COMIC PARTICLES COMPONENT
 * ============================================
 * 
 * Dynamic halftone/ink-based particle system that:
 * - Constantly moves (never static)
 * - Reacts to scroll position
 * - Responds to mouse/touch interaction
 * - Adapts intensity based on Think vs Creative side
 * 
 * PARTICLE TYPES:
 * - Halftone dots: Classic comic book dots
 * - Ink dust: Small scattered particles
 * - Paper grain: Subtle texture particles
 * 
 * HOW TO CUSTOMIZE:
 * 1. particleCount: Number of particles
 * 2. baseSpeed: Default movement speed
 * 3. interactionRadius: Mouse effect range
 * 4. variant: "think" | "creative" | "fusion"
 */

interface ComicParticlesProps {
  variant: "think" | "creative" | "fusion";
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  speedX: number;
  speedY: number;
  type: "halftone" | "ink" | "grain";
  opacity: number;
  angle: number;
  angleSpeed: number;
  driftAmplitude: number;
  driftOffset: number;
}

const ComicParticles = ({ variant, className = "" }: ComicParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const scrollRef = useRef(0);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  // Variant-specific settings
  const settings = {
    think: {
      particleCount: 80,
      baseSpeed: 0.15,
      interactionRadius: 120,
      interactionStrength: 0.3,
      colors: ["rgba(227, 154, 59, 0.4)", "rgba(201, 124, 45, 0.3)", "rgba(31, 31, 31, 0.15)"],
      halftoneRatio: 0.6,
      inkRatio: 0.3,
    },
    creative: {
      particleCount: 120,
      baseSpeed: 0.35,
      interactionRadius: 150,
      interactionStrength: 0.6,
      colors: ["rgba(158, 255, 0, 0.5)", "rgba(255, 140, 26, 0.4)", "rgba(237, 237, 237, 0.2)"],
      halftoneRatio: 0.5,
      inkRatio: 0.4,
    },
    fusion: {
      particleCount: 60,
      baseSpeed: 0.2,
      interactionRadius: 100,
      interactionStrength: 0.4,
      colors: ["rgba(227, 154, 59, 0.3)", "rgba(158, 255, 0, 0.3)", "rgba(200, 200, 200, 0.15)"],
      halftoneRatio: 0.5,
      inkRatio: 0.3,
    },
  };

  const config = settings[variant];

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    
    for (let i = 0; i < config.particleCount; i++) {
      const rand = Math.random();
      let type: Particle["type"];
      
      if (rand < config.halftoneRatio) {
        type = "halftone";
      } else if (rand < config.halftoneRatio + config.inkRatio) {
        type = "ink";
      } else {
        type = "grain";
      }

      const x = Math.random() * width;
      const y = Math.random() * height;
      
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        size: type === "halftone" ? 3 + Math.random() * 8 : type === "ink" ? 1 + Math.random() * 3 : 0.5 + Math.random() * 1.5,
        speedX: (Math.random() - 0.5) * config.baseSpeed * 2,
        speedY: (Math.random() - 0.5) * config.baseSpeed * 2,
        type,
        opacity: type === "halftone" ? 0.3 + Math.random() * 0.4 : 0.2 + Math.random() * 0.3,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() - 0.5) * 0.02,
        driftAmplitude: 20 + Math.random() * 40,
        driftOffset: Math.random() * Math.PI * 2,
      });
    }
    
    particlesRef.current = particles;
  }, [config]);

  const drawParticle = useCallback((ctx: CanvasRenderingContext2D, particle: Particle, time: number) => {
    const colorIndex = Math.floor(Math.random() * config.colors.length);
    const baseColor = config.colors[colorIndex];
    
    ctx.save();
    ctx.globalAlpha = particle.opacity;
    
    if (particle.type === "halftone") {
      // Classic halftone dot with slight pulsing
      const pulseSize = particle.size * (1 + Math.sin(time * 0.001 + particle.driftOffset) * 0.1);
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
      ctx.fillStyle = baseColor;
      ctx.fill();
      
      // Inner highlight for depth
      ctx.beginPath();
      ctx.arc(particle.x - pulseSize * 0.2, particle.y - pulseSize * 0.2, pulseSize * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
      ctx.fill();
    } else if (particle.type === "ink") {
      // Ink splatter - irregular shapes
      ctx.beginPath();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.angle);
      
      // Irregular ink blob
      ctx.moveTo(0, -particle.size);
      ctx.bezierCurveTo(
        particle.size, -particle.size * 0.5,
        particle.size * 0.8, particle.size * 0.8,
        0, particle.size
      );
      ctx.bezierCurveTo(
        -particle.size * 0.7, particle.size * 0.6,
        -particle.size, -particle.size * 0.3,
        0, -particle.size
      );
      
      ctx.fillStyle = baseColor;
      ctx.fill();
    } else {
      // Paper grain - tiny specks
      ctx.fillStyle = baseColor;
      ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
    }
    
    ctx.restore();
  }, [config.colors]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear with slight trail effect
    ctx.fillStyle = variant === "creative" 
      ? "rgba(14, 14, 17, 0.15)" 
      : variant === "think" 
        ? "rgba(250, 248, 244, 0.15)" 
        : "rgba(27, 28, 32, 0.15)";
    ctx.fillRect(0, 0, width, height);
    
    timeRef.current += 16;
    const time = timeRef.current;
    
    particlesRef.current.forEach((particle) => {
      // Base drift movement
      const driftX = Math.sin(time * 0.0005 + particle.driftOffset) * particle.driftAmplitude * 0.01;
      const driftY = Math.cos(time * 0.0003 + particle.driftOffset) * particle.driftAmplitude * 0.01;
      
      // Apply base movement
      particle.x += particle.speedX + driftX;
      particle.y += particle.speedY + driftY;
      particle.angle += particle.angleSpeed;
      
      // Scroll reactivity - particles drift with scroll
      const scrollDelta = (scrollRef.current - (scrollRef.current || 0)) * 0.1;
      particle.y += scrollDelta;
      
      // Mouse interaction
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < config.interactionRadius && distance > 0) {
        const force = (config.interactionRadius - distance) / config.interactionRadius;
        const angle = Math.atan2(dy, dx);
        
        // Repel particles from mouse
        particle.x -= Math.cos(angle) * force * config.interactionStrength * 3;
        particle.y -= Math.sin(angle) * force * config.interactionStrength * 3;
        
        // Increase opacity near mouse
        particle.opacity = Math.min(particle.opacity + 0.1, 0.9);
      } else {
        // Gradually return to base opacity
        particle.opacity = Math.max(particle.opacity - 0.01, 0.2);
      }
      
      // Wrap around edges
      if (particle.x < -50) particle.x = width + 50;
      if (particle.x > width + 50) particle.x = -50;
      if (particle.y < -50) particle.y = height + 50;
      if (particle.y > height + 50) particle.y = -50;
      
      drawParticle(ctx, particle, time);
    });
    
    animationRef.current = requestAnimationFrame(animate);
  }, [variant, config, drawParticle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    
    handleResize();
    
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initParticles, animate]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[1] ${className}`}
      style={{ mixBlendMode: variant === "creative" ? "screen" : "multiply" }}
    />
  );
};

export default ComicParticles;
