import { useState, useRef, useEffect } from "react";
import Character from "./Character";
import { content } from "@/config/placeholders";
import { desktopAlignment, mobileAlignment } from "@/config/alignment";
import { Film, Camera, Clapperboard, Code, Database, Cpu } from "lucide-react";

interface HeroSectionProps {
  onNavigateCreative: () => void;
  onNavigateDigital: () => void;
}

const HeroSection = ({ onNavigateCreative, onNavigateDigital }: HeroSectionProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    if (isMobile) {
      const y = clientY - rect.top;
      const percentage = Math.max(20, Math.min(80, (y / rect.height) * 100));
      setSliderPosition(percentage);
    } else {
      const x = clientX - rect.left;
      const percentage = Math.max(20, Math.min(80, (x / rect.width) * 100));
      setSliderPosition(percentage);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX, e.clientY);
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleStart = () => setIsDragging(true);
  const handleEnd = () => setIsDragging(false);

  const creativeIcons = [
    { Icon: Film, delay: 0 },
    { Icon: Camera, delay: 0.5 },
    { Icon: Clapperboard, delay: 1 },
  ];

  const digitalIcons = [
    { Icon: Code, delay: 0.2 },
    { Icon: Database, delay: 0.7 },
    { Icon: Cpu, delay: 1.2 },
  ];

  const alignment = isMobile ? mobileAlignment : desktopAlignment;

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleEnd}
    >
      {/* Creative Side */}
      <div
        className="absolute inset-0 bg-background flex flex-col items-center justify-center transition-all duration-100"
        style={
          isMobile
            ? { clipPath: `inset(0 0 ${100 - sliderPosition}% 0)` }
            : { clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }
        }
      >
        <div className="dot-matrix absolute inset-0 opacity-50" />
        
        {/* Floating Icons - Creative */}
        {!isMobile && creativeIcons.map(({ Icon, delay }, index) => {
          const positions = alignment.floatingIcons.creative;
          const pos = positions[index] || positions[0];
          return (
            <div
              key={index}
              className="absolute text-foreground/30 animate-float"
              style={{
                ...pos,
                animationDelay: `${delay}s`,
              }}
            >
              <Icon size={20} strokeWidth={1} />
            </div>
          );
        })}

        <div className="relative z-10 text-center px-4">
          <h2
            className="font-mono text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.2em] text-foreground mb-2"
            data-text={content.hero.creative.title}
          >
            {content.hero.creative.title}
          </h2>
          <p className="font-mono text-sm md:text-base text-muted-foreground tracking-[0.3em] uppercase mb-8">
            {content.hero.creative.subtitle}
          </p>
          <button onClick={onNavigateCreative} className="btn-outline">
            {content.hero.creative.cta}
          </button>
        </div>

        {/* Character */}
        <div
          className="absolute"
          style={{
            bottom: alignment.character.creative.bottom,
            left: alignment.character.creative.left,
            transform: isMobile ? "translateX(-50%)" : "none",
            maxWidth: alignment.character.creative.maxWidth,
          }}
        >
          <Character type="creative" className="w-full animate-float" />
        </div>
      </div>

      {/* Digital Side */}
      <div
        className="absolute inset-0 bg-foreground flex flex-col items-center justify-center transition-all duration-100"
        style={
          isMobile
            ? { clipPath: `inset(${sliderPosition}% 0 0 0)` }
            : { clipPath: `inset(0 0 0 ${sliderPosition}%)` }
        }
      >
        <div className="dot-matrix absolute inset-0 opacity-20" style={{ filter: "invert(1)" }} />
        
        {/* Floating Icons - Digital */}
        {!isMobile && digitalIcons.map(({ Icon, delay }, index) => {
          const positions = alignment.floatingIcons.digital;
          const pos = positions[index] || positions[0];
          return (
            <div
              key={index}
              className="absolute text-background/20 animate-float"
              style={{
                ...pos,
                animationDelay: `${delay}s`,
              }}
            >
              <Icon size={20} strokeWidth={1} />
            </div>
          );
        })}

        <div className="relative z-10 text-center px-4">
          <h2
            className="font-mono text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.2em] text-background mb-2"
            data-text={content.hero.digital.title}
          >
            {content.hero.digital.title}
          </h2>
          <p className="font-mono text-sm md:text-base text-background/60 tracking-[0.3em] uppercase mb-8">
            {content.hero.digital.subtitle}
          </p>
          <button
            onClick={onNavigateDigital}
            className="px-6 py-3 bg-background text-foreground font-mono text-xs uppercase tracking-[0.2em] border border-background transition-all duration-300 hover:bg-transparent hover:text-background"
          >
            {content.hero.digital.cta}
          </button>
        </div>

        {/* Character */}
        <div
          className="absolute"
          style={{
            bottom: alignment.character.digital.bottom,
            right: isMobile ? "auto" : (alignment.character.digital as { right?: string }).right,
            left: isMobile ? "50%" : "auto",
            transform: isMobile ? "translateX(-50%)" : "none",
            maxWidth: alignment.character.digital.maxWidth,
          }}
        >
          <Character type="digital" className="w-full animate-float" style={{ animationDelay: "0.5s" }} />
        </div>
      </div>

      {/* Slider */}
      <div
        className={`absolute z-20 ${
          isMobile
            ? "left-0 right-0 h-1 cursor-row-resize"
            : "top-0 bottom-0 w-1 cursor-col-resize"
        }`}
        style={
          isMobile
            ? { top: `${sliderPosition}%`, transform: "translateY(-50%)" }
            : { left: `${sliderPosition}%`, transform: "translateX(-50%)" }
        }
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        {/* Line */}
        <div
          className={`absolute bg-gradient-to-b from-foreground via-muted-foreground to-foreground ${
            isMobile ? "inset-x-0 h-px top-1/2" : "inset-y-0 w-px left-1/2"
          }`}
        />
        
        {/* Handle */}
        <div
          className={`absolute bg-background border-2 border-foreground flex items-center justify-center ${
            isMobile
              ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-8"
              : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-14"
          }`}
          style={{ boxShadow: "0 0 20px rgba(255,255,255,0.3)" }}
        >
          <div className={`flex ${isMobile ? "flex-row" : "flex-col"} gap-1`}>
            <div className="w-1 h-1 bg-foreground rounded-full animate-pulse-dot" />
            <div className="w-1 h-1 bg-foreground rounded-full animate-pulse-dot delay-100" />
            <div className="w-1 h-1 bg-foreground rounded-full animate-pulse-dot delay-200" />
          </div>
        </div>
      </div>

      {/* Instruction */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
        <p className="font-mono text-[10px] text-muted-foreground tracking-[0.3em] uppercase animate-pulse">
          {isMobile ? "Swipe to explore" : "Drag to explore"}
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
