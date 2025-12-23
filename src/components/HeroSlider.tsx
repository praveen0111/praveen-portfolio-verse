import { useEffect, useRef, useState } from "react";
import { Camera, Film, Clapperboard, Briefcase, TrendingUp, Cpu, BarChart2, ChevronLeft, ChevronRight, Video, Palette, Scissors, Music, Globe, Database, LineChart, Rocket, Lightbulb, Code } from "lucide-react";
import { Button } from "./ui/button";
interface HeroSliderProps {
  onNavigateCreative: () => void;
  onNavigateDigital: () => void;
}
const HeroSlider = ({
  onNavigateCreative,
  onNavigateDigital
}: HeroSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const creativeCharRef = useRef<HTMLDivElement>(null);
  const digitalCharRef = useRef<HTMLDivElement>(null);
  const hasIntroPlayed = useRef(false);
  useEffect(() => {
    // Intro animation
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
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
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
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false
      });
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
  const calculateEyePosition = (charRef: React.RefObject<HTMLDivElement>) => {
    if (!charRef.current) return {
      x: 0,
      y: 0
    };
    const rect = charRef.current.getBoundingClientRect();
    const charCenterX = rect.left + rect.width / 2;
    const charCenterY = rect.top + rect.height / 2;
    const deltaX = mousePosition.x - charCenterX;
    const deltaY = mousePosition.y - charCenterY;
    const angle = Math.atan2(deltaY, deltaX);
    const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 50, 8);
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance
    };
  };
  return <div ref={containerRef} className="relative w-full h-screen overflow-hidden select-none">
      {/* Creative Panel (Dark) */}
      <div className="absolute inset-0 bg-[hsl(var(--creative-bg))] text-[hsl(var(--creative-fg))] flex items-center justify-end" style={{
      clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
    }}>
        <div className="max-w-[500px] w-full px-8 md:px-16 text-right">
          <div className="font-bold text-xl mb-8">PE.</div>
          <h1 className="font-extrabold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-none uppercase tracking-tight">
            Creative
          </h1>
          <p className="mt-6 text-base leading-relaxed max-w-md ml-auto">
            Filmmaker with a passion for visual storytelling and expertise in editing and post-production workflow.
          </p>
          <Button onClick={onNavigateCreative} variant="outline" className="mt-8 border-2 border-[hsl(var(--creative-fg))] text-[hsl(var(--creative-fg))] hover:bg-[hsl(var(--creative-fg))] hover:text-[hsl(var(--creative-bg))] rounded-full px-6 py-6 font-semibold transition-all">
            Explore My Work
          </Button>
        </div>

        {/* Filmmaker Character */}
        <div ref={creativeCharRef} className="hidden lg:block absolute left-[30%] top-1/2 -translate-y-1/2 w-48 h-64">
          <div className="animate-[float_6s_ease-in-out_infinite]">
            {/* Character SVG */}
            <svg viewBox="0 0 200 280" className="w-full h-full my-[100px] py-[100px] px-0 rounded-xl mx-0">
              {/* Head */}
              <circle cx="100" cy="80" r="45" fill="hsl(var(--skin-tone))" />
              {/* Hair */}
              <path d="M 65 60 Q 55 40 65 30 Q 80 25 100 25 Q 120 25 135 30 Q 145 40 135 60 Z" fill="hsl(var(--hair-dark))" />
              {/* Body */}
              <rect x="70" y="120" width="60" height="80" rx="8" fill="hsl(var(--suit-gray))" />
              {/* Arms */}
              <rect x="45" y="130" width="25" height="60" rx="12" fill="hsl(var(--skin-tone))" />
              <rect x="130" y="130" width="25" height="60" rx="12" fill="hsl(var(--skin-tone))" />
              {/* Eyes with tracking and blinking animation */}
              {/* BLINKING EFFECT: The animation makes characters feel alive */}
              {/* TO ADJUST: Modify animation duration in index.css @keyframes blink */}
              <g className="animate-[blink_4s_ease-in-out_infinite]">
                <ellipse cx="85" cy="75" rx="8" ry="12" fill="white" />
                <ellipse cx="115" cy="75" rx="8" ry="12" fill="white" />
                <circle cx={85 + calculateEyePosition(creativeCharRef).x} cy={75 + calculateEyePosition(creativeCharRef).y} r="4" fill="hsl(var(--creative-bg))" className="transition-all duration-100 ease-out" />
                <circle cx={115 + calculateEyePosition(creativeCharRef).x} cy={75 + calculateEyePosition(creativeCharRef).y} r="4" fill="hsl(var(--creative-bg))" className="transition-all duration-100 ease-out" />
              </g>
              {/* Mouth */}
              <path d="M 85 95 Q 100 102 115 95" stroke="hsl(var(--creative-bg))" strokeWidth="2" fill="none" />
            </svg>
            
            {/* Floating icons */}
            <div className="absolute top-0 left-0 animate-[float-icon_8s_ease-in-out_infinite]">
              <Camera className="w-8 h-8" />
            </div>
            <div className="absolute bottom-5 right-0 animate-[float-icon_8s_ease-in-out_infinite] [animation-delay:-2s]">
              <Film className="w-8 h-8" />
            </div>
            <div className="absolute top-[10%] right-[-15%] w-12 h-12 rounded-full bg-[hsl(var(--premiere))] flex items-center justify-center text-white font-extrabold text-xl border-2 border-white/50 animate-[float-icon_8s_ease-in-out_infinite] [animation-delay:-1s]">
              Pr
            </div>
            <div className="absolute bottom-12 left-[-20%] w-12 h-12 rounded-full bg-[hsl(var(--after-effects))] flex items-center justify-center text-white font-extrabold text-xl border-2 border-white/50 animate-[float-icon_8s_ease-in-out_infinite] [animation-delay:-3s]">
              Ae
            </div>
            <div className="absolute top-[60%] left-[-10%] animate-[float-icon_8s_ease-in-out_infinite] [animation-delay:-5s]">
              <Clapperboard className="w-8 h-8" />
            </div>
            <div className="absolute top-[25%] left-[-25%] animate-[float-icon_8s_ease-in-out_infinite] [animation-delay:-4s]">
              <Video className="w-8 h-8" />
            </div>
            <div className="absolute bottom-[30%] right-[-10%] animate-[float-icon_8s_ease-in-out_infinite] [animation-delay:-6s]">
              <Palette className="w-8 h-8" />
            </div>
            <div className="absolute top-[45%] right-[-20%] w-12 h-12 rounded-full bg-[hsl(var(--photoshop))] flex items-center justify-center text-white font-extrabold text-xl border-2 border-white/50 animate-[float-icon_8s_ease-in-out_infinite] [animation-delay:-2.5s]">
              Ps
            </div>
            <div className="absolute bottom-[50%] left-[-15%] animate-[float-icon_8s_ease-in-out_infinite] [animation-delay:-7s]">
              <Scissors className="w-8 h-8" />
            </div>
            <div className="absolute top-[80%] right-[-5%] animate-[float-icon_8s_ease-in-out_infinite] [animation-delay:-3.5s]">
              <Music className="w-7 h-7" />
            </div>
          </div>
        </div>
      </div>

      {/* Digital Panel (Light) */}
      <div className="absolute inset-0 bg-[hsl(var(--digital-bg))] text-[hsl(var(--digital-fg))] flex items-center justify-start" style={{
      clipPath: `inset(0 0 0 ${sliderPosition}%)`
    }}>
        <div className="max-w-[500px] w-full px-8 md:px-16 text-left">
          <div className="font-bold text-xl mb-8">PE.</div>
          <h1 className="font-extrabold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-none uppercase tracking-tight text-[hsl(var(--digital-accent))]">
            Digital
          </h1>
          <p className="mt-6 text-base leading-relaxed max-w-md">
            MBA candidate specializing in the intersection of technology, marketing, and product design.
          </p>
          <Button onClick={onNavigateDigital} variant="outline" className="mt-8 border-2 border-[hsl(var(--creative-accent))] text-[hsl(var(--creative-accent))] hover:bg-[hsl(var(--creative-accent))] hover:text-[hsl(var(--digital-bg))] rounded-full px-6 py-6 font-semibold transition-all">
            View My Profile
          </Button>
        </div>

        {/* Business Character */}
        <div ref={digitalCharRef} className="hidden lg:block absolute right-[30%] top-1/2 -translate-y-1/2 w-48 h-64">
          <div className="animate-[float_6s_ease-in-out_infinite]">
            {/* Character SVG */}
            <svg viewBox="0 0 200 280" className="w-full h-full my-[100px] py-[100px] mx-[100px]">
              {/* Head */}
              <circle cx="100" cy="80" r="45" fill="hsl(var(--skin-tone))" />
              {/* Hair */}
              <path d="M 60 65 Q 55 35 75 28 Q 90 25 100 25 Q 110 25 125 28 Q 145 35 140 65 Z" fill="hsl(var(--hair-dark))" />
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
              {/* Eyes with tracking and blinking animation */}
              {/* BLINKING EFFECT: The animation makes characters feel alive */}
              {/* TO ADJUST: Modify animation duration in index.css @keyframes blink */}
              <g className="animate-[blink_4s_ease-in-out_infinite]">
                <ellipse cx="85" cy="75" rx="8" ry="12" fill="white" />
                <ellipse cx="115" cy="75" rx="8" ry="12" fill="white" />
                <circle cx={85 + calculateEyePosition(digitalCharRef).x} cy={75 + calculateEyePosition(digitalCharRef).y} r="4" fill="hsl(var(--digital-fg))" className="transition-all duration-100 ease-out" />
                <circle cx={115 + calculateEyePosition(digitalCharRef).x} cy={75 + calculateEyePosition(digitalCharRef).y} r="4" fill="hsl(var(--digital-fg))" className="transition-all duration-100 ease-out" />
              </g>
              {/* Smile */}
              <path d="M 85 95 Q 100 105 115 95" stroke="hsl(var(--digital-fg))" strokeWidth="2" fill="none" />
            </svg>
            
            {/* Floating icons */}
            <div className="absolute top-[10%] left-[-10%] text-[hsl(var(--creative-accent))] animate-[float-icon_8s_ease-in-out_infinite] [animation-delay:-0.5s]">
              <Briefcase className="w-10 h-10" />
            </div>
            <div className="absolute top-[15%] right-[-15%] text-[hsl(var(--creative-accent))] animate-[float-icon_8s_ease-in-out_infinite] [animation-delay:-2.5s]">
              <TrendingUp className="w-10 h-10" />
            </div>
            <div className="absolute bottom-14 left-[-20%] text-[hsl(var(--creative-accent))] animate-[float-icon_8s_ease-in-out_infinite] [animation-delay:-4.5s]">
              <Cpu className="w-10 h-10" />
            </div>
            <div className="absolute bottom-6 right-[-5%] text-[hsl(var(--creative-accent))] animate-[float-icon_8s_ease-in-out_infinite] [animation-delay:-1.5s]">
              <BarChart2 className="w-10 h-10" />
            </div>
            <div className="absolute top-[35%] left-[-15%] text-[hsl(var(--creative-accent))] animate-[float-icon_8s_ease-in-out_infinite] [animation-delay:-3.5s]">
              <Database className="w-9 h-9" />
            </div>
            <div className="absolute top-[55%] right-[-10%] text-[hsl(var(--creative-accent))] animate-[float-icon_8s_ease-in-out_infinite] [animation-delay:-5.5s]">
              <LineChart className="w-9 h-9" />
            </div>
            <div className="absolute bottom-[35%] left-[-5%] text-[hsl(var(--creative-accent))] animate-[float-icon_8s_ease-in-out_infinite] [animation-delay:-6.5s]">
              <Globe className="w-9 h-9" />
            </div>
            <div className="absolute top-[75%] right-[-20%] text-[hsl(var(--creative-accent))] animate-[float-icon_8s_ease-in-out_infinite] [animation-delay:-7.5s]">
              <Rocket className="w-8 h-8" />
            </div>
            <div className="absolute bottom-[55%] right-[-25%] text-[hsl(var(--creative-accent))] animate-[float-icon_8s_ease-in-out_infinite] [animation-delay:-1s]">
              <Lightbulb className="w-9 h-9" />
            </div>
            <div className="absolute top-[25%] left-[-25%] text-[hsl(var(--creative-accent))] animate-[float-icon_8s_ease-in-out_infinite] [animation-delay:-8s]">
              <Code className="w-9 h-9" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Slider Handle with gradient and glow */}
      {/* CUSTOMIZE DIVIDER: */}
      {/* - Change width (w-*) for thickness */}
      {/* - Adjust gradient colors in bg-gradient-to-b */}
      {/* - Modify animation duration in animate-[divider-pulse_*] */}
      {/* - Edit glow colors in @keyframes divider-pulse in index.css */}
      <div 
        className="absolute top-0 w-2 h-full cursor-grab active:cursor-grabbing z-10 bg-gradient-to-b from-[hsl(var(--creative-accent))] via-[hsl(var(--digital-accent))] to-[hsl(var(--creative-accent))] animate-[divider-pulse_2s_ease-in-out_infinite]" 
        style={{
          left: `${sliderPosition}%`,
          transform: 'translateX(-50%)'
        }} 
        onMouseDown={() => setIsDragging(true)} 
        onTouchStart={() => setIsDragging(true)}
      >
        {/* Draggable handle circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-[hsl(var(--creative-accent))] to-[hsl(var(--digital-accent))] rounded-full flex items-center justify-between px-2 shadow-xl border-2 border-white/30">
          <ChevronLeft className="w-5 h-5 text-white" />
          <ChevronRight className="w-5 h-5 text-white/90" />
        </div>
      </div>
    </div>;
};
export default HeroSlider;