import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

interface HeroSliderProps {
  onNavigateCreative: () => void;
  onNavigateThink: () => void;
}

const HeroSlider = ({ onNavigateCreative, onNavigateThink }: HeroSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredSide, setHoveredSide] = useState<"think" | "creative" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasIntroPlayed = useRef(false);

  // Intro animation - subtle bounce
  useEffect(() => {
    if (!hasIntroPlayed.current) {
      hasIntroPlayed.current = true;
      const duration = 1200;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const amplitude = 8 * (1 - easeOut);
        const position = 50 + amplitude * Math.sin(progress * Math.PI * 3);
        setSliderPosition(position);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setSliderPosition(50);
        }
      };

      requestAnimationFrame(animate);
    }
  }, []);

  // Mouse/Touch handling
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      e.preventDefault();
      const rect = containerRef.current.getBoundingClientRect();
      const pos = Math.max(20, Math.min(80, ((e.clientX - rect.left) / rect.width) * 100));
      setSliderPosition(pos);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !containerRef.current) return;
      e.preventDefault();
      const rect = containerRef.current.getBoundingClientRect();
      const pos = Math.max(20, Math.min(80, ((e.touches[0].clientX - rect.left) / rect.width) * 100));
      setSliderPosition(pos);
    };

    const handleEnd = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchend", handleEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden select-none">
      {/* THINK PANEL - Left Side - Warm, Light */}
      <div
        className="absolute inset-0 flex items-center"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        onMouseEnter={() => setHoveredSide("think")}
        onMouseLeave={() => setHoveredSide(null)}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F4] via-[#F5F0E8] to-[#EDE6DA]" />
        
        {/* Subtle texture */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #1F1F1F 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Content - Fixed to left side */}
        <div 
          className="relative z-10 w-1/2 flex justify-center"
        >
          <div 
            className="max-w-md px-8 md:px-12 text-center transform transition-all duration-500"
            style={{ transform: hoveredSide === "think" ? "scale(1.02)" : "scale(1)" }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider uppercase bg-[#E39A3B]/10 text-[#C97C2D] rounded-full border border-[#E39A3B]/20">
              Intellect
            </span>
            
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-[#1F1F1F] leading-none mb-6">
              Think
            </h1>
            
            <p className="text-lg text-[#4A5D73] leading-relaxed mb-8 max-w-sm mx-auto">
              MBA candidate at the intersection of technology, strategy, and product design.
            </p>
            
            <button
              onClick={onNavigateThink}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#1F1F1F] text-white font-semibold rounded-full hover:bg-[#E39A3B] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Profile
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-12 left-12 w-32 h-32 border-4 border-[#E39A3B]/20 rounded-full opacity-60" />
        <div className="absolute top-20 left-[15%] w-16 h-16 bg-[#E39A3B]/10 rounded-full blur-xl" />
      </div>

      {/* CREATIVE PANEL - Right Side - Dark, Bold */}
      <div
        className="absolute inset-0 flex items-center justify-end"
        style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        onMouseEnter={() => setHoveredSide("creative")}
        onMouseLeave={() => setHoveredSide(null)}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-bl from-[#0E0E11] via-[#141418] to-[#1A1A1F]" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `linear-gradient(#9EFF00 1px, transparent 1px), linear-gradient(90deg, #9EFF00 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Glow effect */}
        <div 
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #9EFF00 0%, transparent 70%)' }}
        />

        {/* Content - Fixed to right side */}
        <div 
          className="relative z-10 w-1/2 flex justify-center"
        >
          <div 
            className="max-w-md px-8 md:px-12 text-center transform transition-all duration-500"
            style={{ transform: hoveredSide === "creative" ? "scale(1.02)" : "scale(1)" }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider uppercase bg-[#9EFF00]/10 text-[#9EFF00] rounded-full border border-[#9EFF00]/30">
              Expression
            </span>
            
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none mb-6">
              Create
            </h1>
            
            <p className="text-lg text-[#8A8F98] leading-relaxed mb-8 max-w-sm mx-auto">
              Filmmaker crafting visual stories through editing and post-production mastery.
            </p>
            
            <button
              onClick={onNavigateCreative}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#9EFF00] text-[#0E0E11] font-semibold rounded-full hover:bg-[#B7FF3C] transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(158,255,0,0.3)]"
            >
              View Work
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-12 right-12 w-24 h-24 border-2 border-[#9EFF00]/20 rotate-45" />
        <div className="absolute bottom-20 right-[15%] w-20 h-20 bg-[#FF8C1A]/10 rounded-full blur-2xl" />
      </div>

      {/* DIVIDER */}
      <div
        className="absolute top-0 bottom-0 z-20 flex items-center justify-center cursor-ew-resize"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* Divider line */}
        <div className="absolute h-full w-1 bg-gradient-to-b from-[#E39A3B] via-[#FFB347] to-[#9EFF00]" />
        
        {/* Handle */}
        <div 
          className={`relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-[#E39A3B] to-[#9EFF00] flex items-center justify-center shadow-2xl transition-transform duration-200 ${isDragging ? 'scale-110' : 'hover:scale-105'}`}
        >
          <div className="flex gap-1">
            <div className="w-0.5 h-6 bg-white/80 rounded-full" />
            <div className="w-0.5 h-6 bg-white/80 rounded-full" />
          </div>
        </div>

        {/* Glow behind handle */}
        <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-[#E39A3B]/30 to-[#9EFF00]/30 blur-xl" />
      </div>

      {/* Navigation hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-sm text-gray-500">
        <span className="hidden md:inline">Drag to explore</span>
        <div className="w-8 h-0.5 bg-gradient-to-r from-[#E39A3B] to-[#9EFF00] rounded-full" />
      </div>
    </div>
  );
};

export default HeroSlider;
