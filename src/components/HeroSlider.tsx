import { useEffect, useRef, useState } from "react";
import { 
  Camera, Film, Clapperboard, Video, Palette, Scissors, Music,
  BookOpen, GraduationCap, Lightbulb, Brain, TrendingUp, BarChart2, 
  PenTool, Target, ChevronLeft, ChevronRight 
} from "lucide-react";
import { Button } from "./ui/button";

/**
 * ============================================
 * HERO SLIDER COMPONENT
 * ============================================
 * 
 * Split-screen homepage with:
 * - LEFT: THINK side (daylight, warm, academic)
 * - RIGHT: CREATIVE side (nighttime, moody, cinematic)
 * 
 * Features:
 * - Draggable slider divider
 * - Eye-tracking animated characters
 * - Floating tool/software icons
 * - Intro animation on load
 * 
 * HOW TO CUSTOMIZE:
 * 1. Edit colors in index.css (--think-* and --creative-*)
 * 2. Modify character SVGs below
 * 3. Add/remove floating icons
 * 4. Adjust divider appearance and animation
 * 
 * LAYOUT:
 * - Think (LEFT) = Represents intellect, academics, analysis
 * - Creative (RIGHT) = Represents expression, storytelling, film
 */

interface HeroSliderProps {
  onNavigateCreative: () => void;
  onNavigateThink: () => void;
}

const HeroSlider = ({
  onNavigateCreative,
  onNavigateThink,
}: HeroSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const thinkCharRef = useRef<HTMLDivElement>(null);
  const creativeCharRef = useRef<HTMLDivElement>(null);
  const hasIntroPlayed = useRef(false);

  /**
   * INTRO ANIMATION
   * Slider bounces on initial load to draw attention
   * 
   * HOW TO ADJUST:
   * - Duration: Change duration variable (currently 1500ms)
   * - Amplitude: Change amplitude variable (currently 15)
   */
  useEffect(() => {
    if (!hasIntroPlayed.current) {
      hasIntroPlayed.current = true;
      const duration = 1500;
      const startTime = performance.now();
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const amplitude = 15;
        const position = 50 + amplitude * Math.sin(progress * Math.PI * 2);
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

  /**
   * MOUSE/TOUCH INTERACTION
   * Handles dragging the slider divider
   */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (!isDragging || !containerRef.current) return;
      e.preventDefault();
      
      const rect = containerRef.current.getBoundingClientRect();
      const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      setSliderPosition(pos * 100);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !containerRef.current) return;
      e.preventDefault();
      
      const rect = containerRef.current.getBoundingClientRect();
      const pos = Math.max(0, Math.min(1, (e.touches[0].clientX - rect.left) / rect.width));
      setSliderPosition(pos * 100);
    };

    const handleEnd = () => setIsDragging(false);

    document.addEventListener("mousemove", handleMouseMove);
    
    if (isDragging) {
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

  /**
   * EYE TRACKING CALCULATION
   * Makes character eyes follow the cursor
   * 
   * HOW TO ADJUST:
   * - Max distance: Change the divisor (currently 50)
   * - Max eye movement: Change max value (currently 8)
   */
  const calculateEyePosition = (charRef: React.RefObject<HTMLDivElement>) => {
    if (!charRef.current) return { x: 0, y: 0 };
    
    const rect = charRef.current.getBoundingClientRect();
    const charCenterX = rect.left + rect.width / 2;
    const charCenterY = rect.top + rect.height / 2;
    
    const deltaX = mousePosition.x - charCenterX;
    const deltaY = mousePosition.y - charCenterY;
    
    const angle = Math.atan2(deltaY, deltaX);
    const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 50, 8);
    
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    };
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden select-none">
      
      {/* ============================================
       * THINK PANEL (LEFT SIDE)
       * Daylight, warm, academic, intellectual
       * ============================================ */}
      <div
        className="absolute inset-0 bg-think-bg texture-paper flex items-center justify-start"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        {/* Warm daylight gradient overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 30% 20%, hsl(var(--think-glow) / 0.3) 0%, transparent 50%),
              linear-gradient(180deg, hsl(var(--think-bg-alt)) 0%, hsl(var(--think-bg)) 100%)
            `
          }}
        />
        
        {/* Content */}
        <div className="relative max-w-[500px] w-full px-8 md:px-16 text-left z-10">
          <div className="font-bold text-xl mb-8 text-think-accent">PE.</div>
          
          <h1 className="font-extrabold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-none uppercase tracking-tight text-think-fg">
            Think
          </h1>
          
          <p className="mt-6 text-base md:text-lg leading-relaxed max-w-md text-think-fg-muted">
            MBA candidate specializing in the intersection of technology, marketing, and product design.
          </p>
          
          <Button
            onClick={onNavigateThink}
            className="mt-8 bg-think-accent hover:bg-think-accent-alt text-white rounded-full px-8 py-6 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-think-accent/30"
          >
            View My Profile
          </Button>
        </div>

        {/* THINK Character - Academic/Professional */}
        <div
          ref={thinkCharRef}
          className="hidden lg:block absolute right-[15%] top-1/2 -translate-y-1/2 w-48 h-64"
        >
          <div className="animate-float">
            {/* Character SVG - Business Professional */}
            <svg viewBox="0 0 200 280" className="w-full h-full">
              {/* Head */}
              <circle cx="100" cy="80" r="45" fill="hsl(var(--skin-tone))" />
              
              {/* Hair - Professional style */}
              <path
                d="M 60 65 Q 55 35 75 28 Q 90 25 100 25 Q 110 25 125 28 Q 145 35 140 65 Z"
                fill="hsl(var(--hair-dark))"
              />
              
              {/* Body - Business Suit */}
              <rect x="70" y="120" width="60" height="90" rx="8" fill="hsl(var(--suit-gray))" />
              
              {/* Shirt */}
              <path d="M 85 125 L 85 200 L 100 200 L 115 200 L 115 125 Z" fill="hsl(var(--shirt-light))" />
              
              {/* Tie */}
              <path d="M 97 125 L 92 155 L 100 180 L 108 155 L 103 125 Z" fill="hsl(var(--tie-red))" />
              
              {/* Arms */}
              <rect x="45" y="130" width="25" height="65" rx="12" fill="hsl(var(--suit-gray))" />
              <rect x="130" y="130" width="25" height="65" rx="12" fill="hsl(var(--suit-gray))" />
              
              {/* Hands */}
              <circle cx="57" cy="200" r="10" fill="hsl(var(--skin-tone))" />
              <circle cx="143" cy="200" r="10" fill="hsl(var(--skin-tone))" />
              
              {/* Eyes with tracking and blinking */}
              <g className="animate-blink">
                <ellipse cx="85" cy="75" rx="8" ry="12" fill="white" />
                <ellipse cx="115" cy="75" rx="8" ry="12" fill="white" />
                <circle
                  cx={85 + calculateEyePosition(thinkCharRef).x}
                  cy={75 + calculateEyePosition(thinkCharRef).y}
                  r="4"
                  fill="hsl(var(--think-fg))"
                  className="transition-all duration-100 ease-out"
                />
                <circle
                  cx={115 + calculateEyePosition(thinkCharRef).x}
                  cy={75 + calculateEyePosition(thinkCharRef).y}
                  r="4"
                  fill="hsl(var(--think-fg))"
                  className="transition-all duration-100 ease-out"
                />
              </g>
              
              {/* Smile */}
              <path d="M 85 95 Q 100 105 115 95" stroke="hsl(var(--think-fg))" strokeWidth="2" fill="none" />
            </svg>

            {/* Floating Icons - Academic/Business themed */}
            <div className="absolute top-0 left-[-20%] text-think-accent animate-float-icon">
              <BookOpen className="w-10 h-10" />
            </div>
            <div className="absolute top-[20%] right-[-25%] text-think-accent animate-float-icon [animation-delay:-2s]">
              <GraduationCap className="w-10 h-10" />
            </div>
            <div className="absolute bottom-[40%] left-[-25%] text-think-accent-alt animate-float-icon [animation-delay:-4s]">
              <Lightbulb className="w-9 h-9" />
            </div>
            <div className="absolute bottom-[20%] right-[-15%] text-think-accent animate-float-icon [animation-delay:-1s]">
              <Brain className="w-9 h-9" />
            </div>
            <div className="absolute top-[45%] left-[-10%] text-think-accent-alt animate-float-icon [animation-delay:-3s]">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div className="absolute top-[65%] right-[-20%] text-think-accent animate-float-icon [animation-delay:-5s]">
              <BarChart2 className="w-9 h-9" />
            </div>
            <div className="absolute bottom-[60%] right-[-10%] text-think-accent-alt animate-float-icon [animation-delay:-6s]">
              <PenTool className="w-8 h-8" />
            </div>
            <div className="absolute top-[10%] left-[-5%] text-think-accent animate-float-icon [animation-delay:-7s]">
              <Target className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================
       * CREATIVE PANEL (RIGHT SIDE)
       * Nighttime, moody, cinematic, expressive
       * ============================================ */}
      <div
        className="absolute inset-0 bg-creative-bg texture-grain flex items-center justify-end"
        style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
      >
        {/* Moody night gradient overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 70% 30%, hsl(var(--creative-glow) / 0.1) 0%, transparent 40%),
              radial-gradient(ellipse at 80% 80%, hsl(var(--creative-glow-warm) / 0.08) 0%, transparent 30%),
              linear-gradient(180deg, hsl(var(--creative-bg-alt)) 0%, hsl(var(--creative-bg)) 100%)
            `
          }}
        />
        
        {/* Content */}
        <div className="relative max-w-[500px] w-full px-8 md:px-16 text-right z-10">
          <div className="font-bold text-xl mb-8 text-creative-accent">PE.</div>
          
          <h1 className="font-extrabold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-none uppercase tracking-tight text-creative-fg">
            Creative
          </h1>
          
          <p className="mt-6 text-base md:text-lg leading-relaxed max-w-md ml-auto text-creative-fg-muted">
            Filmmaker with a passion for visual storytelling and expertise in editing and post-production workflow.
          </p>
          
          <Button
            onClick={onNavigateCreative}
            className="mt-8 bg-creative-accent hover:bg-creative-glow text-creative-bg rounded-full px-8 py-6 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-creative-accent/40"
          >
            Explore My Work
          </Button>
        </div>

        {/* CREATIVE Character - Filmmaker */}
        <div
          ref={creativeCharRef}
          className="hidden lg:block absolute left-[15%] top-1/2 -translate-y-1/2 w-48 h-64"
        >
          <div className="animate-float">
            {/* Character SVG - Filmmaker */}
            <svg viewBox="0 0 200 280" className="w-full h-full">
              {/* Head */}
              <circle cx="100" cy="80" r="45" fill="hsl(var(--skin-tone))" />
              
              {/* Hair - Creative style */}
              <path
                d="M 65 60 Q 55 40 65 30 Q 80 25 100 25 Q 120 25 135 30 Q 145 40 135 60 Z"
                fill="hsl(var(--hair-dark))"
              />
              
              {/* Body - Casual jacket */}
              <rect x="70" y="120" width="60" height="80" rx="8" fill="hsl(var(--suit-gray))" />
              
              {/* Arms */}
              <rect x="45" y="130" width="25" height="60" rx="12" fill="hsl(var(--skin-tone))" />
              <rect x="130" y="130" width="25" height="60" rx="12" fill="hsl(var(--skin-tone))" />
              
              {/* Eyes with tracking and blinking */}
              <g className="animate-blink">
                <ellipse cx="85" cy="75" rx="8" ry="12" fill="white" />
                <ellipse cx="115" cy="75" rx="8" ry="12" fill="white" />
                <circle
                  cx={85 + calculateEyePosition(creativeCharRef).x}
                  cy={75 + calculateEyePosition(creativeCharRef).y}
                  r="4"
                  fill="hsl(var(--creative-bg))"
                  className="transition-all duration-100 ease-out"
                />
                <circle
                  cx={115 + calculateEyePosition(creativeCharRef).x}
                  cy={75 + calculateEyePosition(creativeCharRef).y}
                  r="4"
                  fill="hsl(var(--creative-bg))"
                  className="transition-all duration-100 ease-out"
                />
              </g>
              
              {/* Mouth */}
              <path d="M 85 95 Q 100 102 115 95" stroke="hsl(var(--creative-bg))" strokeWidth="2" fill="none" />
            </svg>

            {/* Floating Icons - Filmmaking themed */}
            <div className="absolute top-0 right-[-20%] text-creative-accent animate-float-icon">
              <Camera className="w-10 h-10" />
            </div>
            <div className="absolute bottom-[30%] left-[-25%] text-creative-accent animate-float-icon [animation-delay:-2s]">
              <Film className="w-10 h-10" />
            </div>
            
            {/* Adobe Premiere Pro */}
            <div className="absolute top-[20%] left-[-15%] w-12 h-12 rounded-lg bg-[hsl(var(--premiere))] flex items-center justify-center text-white font-extrabold text-lg border-2 border-white/30 animate-float-icon [animation-delay:-1s]">
              Pr
            </div>
            
            {/* Adobe After Effects */}
            <div className="absolute bottom-[50%] right-[-20%] w-12 h-12 rounded-lg bg-[hsl(var(--after-effects))] flex items-center justify-center text-white font-extrabold text-lg border-2 border-white/30 animate-float-icon [animation-delay:-3s]">
              Ae
            </div>
            
            {/* Adobe Photoshop */}
            <div className="absolute top-[50%] left-[-25%] w-12 h-12 rounded-lg bg-[hsl(var(--photoshop))] flex items-center justify-center text-white font-extrabold text-lg border-2 border-white/30 animate-float-icon [animation-delay:-5s]">
              Ps
            </div>
            
            <div className="absolute top-[35%] right-[-10%] text-creative-accent-alt animate-float-icon [animation-delay:-4s]">
              <Clapperboard className="w-9 h-9" />
            </div>
            <div className="absolute bottom-[15%] right-[-15%] text-creative-accent animate-float-icon [animation-delay:-6s]">
              <Video className="w-9 h-9" />
            </div>
            <div className="absolute top-[70%] left-[-10%] text-creative-accent-alt animate-float-icon [animation-delay:-7s]">
              <Palette className="w-8 h-8" />
            </div>
            <div className="absolute bottom-[65%] left-[-5%] text-creative-accent animate-float-icon [animation-delay:-2.5s]">
              <Scissors className="w-8 h-8" />
            </div>
            <div className="absolute top-[5%] left-[-5%] text-creative-accent-alt animate-float-icon [animation-delay:-8s]">
              <Music className="w-7 h-7" />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================
       * SLIDER DIVIDER
       * Gradient blend from amber (Think) to lime (Creative)
       * 
       * HOW TO CUSTOMIZE:
       * - Thickness: Change w-* class (currently w-2)
       * - Colors: Edit gradient colors below
       * - Animation: Modify animate-divider-pulse in index.css
       * ============================================ */}
      <div
        className="absolute top-0 w-2 h-full cursor-grab active:cursor-grabbing z-10 bg-gradient-to-b from-divider-think via-white to-divider-creative animate-divider-pulse"
        style={{
          left: `${sliderPosition}%`,
          transform: "translateX(-50%)",
        }}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* Draggable handle circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-br from-divider-think to-divider-creative rounded-full flex items-center justify-between px-2 shadow-2xl border-2 border-white/40 hover:scale-110 transition-transform">
          <ChevronLeft className="w-5 h-5 text-white" />
          <ChevronRight className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
