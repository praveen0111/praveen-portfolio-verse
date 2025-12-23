import { CSSProperties } from "react";

interface CharacterProps {
  type: "creative" | "digital";
  className?: string;
  style?: CSSProperties;
}

const Character = ({ type, className = "", style }: CharacterProps) => {
  if (type === "creative") {
    return (
      <svg
        viewBox="0 0 200 300"
        className={className}
        style={style}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Body */}
        <rect x="70" y="140" width="60" height="100" fill="hsl(0 0% 15%)" />
        
        {/* Head */}
        <ellipse cx="100" cy="80" rx="40" ry="45" fill="hsl(0 0% 85%)" />
        
        {/* Hair */}
        <path
          d="M60 70 Q60 30 100 30 Q140 30 140 70 Q140 50 100 45 Q60 50 60 70"
          fill="hsl(0 0% 10%)"
        />
        
        {/* Sunglasses */}
        <rect x="65" y="65" width="30" height="18" rx="2" fill="hsl(0 0% 5%)" />
        <rect x="105" y="65" width="30" height="18" rx="2" fill="hsl(0 0% 5%)" />
        <line x1="95" y1="74" x2="105" y2="74" stroke="hsl(0 0% 20%)" strokeWidth="2" />
        <line x1="65" y1="74" x2="55" y2="70" stroke="hsl(0 0% 20%)" strokeWidth="2" />
        <line x1="135" y1="74" x2="145" y2="70" stroke="hsl(0 0% 20%)" strokeWidth="2" />
        
        {/* Nose */}
        <path d="M100 85 L103 95 L97 95 Z" fill="hsl(0 0% 75%)" />
        
        {/* Mouth */}
        <path
          d="M90 108 Q100 115 110 108"
          stroke="hsl(0 0% 40%)"
          strokeWidth="2"
          fill="none"
        />
        
        {/* Arms */}
        <rect x="50" y="145" width="20" height="60" fill="hsl(0 0% 15%)" />
        <rect x="130" y="145" width="20" height="60" fill="hsl(0 0% 15%)" />
        
        {/* Hands */}
        <ellipse cx="60" cy="210" rx="12" ry="10" fill="hsl(0 0% 85%)" />
        <ellipse cx="140" cy="210" rx="12" ry="10" fill="hsl(0 0% 85%)" />
        
        {/* Legs */}
        <rect x="75" y="240" width="20" height="50" fill="hsl(0 0% 20%)" />
        <rect x="105" y="240" width="20" height="50" fill="hsl(0 0% 20%)" />
        
        {/* Shoes */}
        <rect x="70" y="285" width="30" height="12" rx="4" fill="hsl(0 0% 8%)" />
        <rect x="100" y="285" width="30" height="12" rx="4" fill="hsl(0 0% 8%)" />
        
        {/* Camera in hand */}
        <rect x="125" y="195" width="30" height="20" rx="2" fill="hsl(0 0% 25%)" />
        <circle cx="145" cy="205" r="6" fill="hsl(0 0% 15%)" />
        <circle cx="145" cy="205" r="3" fill="hsl(0 0% 35%)" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 200 300"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body - Suit */}
      <rect x="70" y="140" width="60" height="100" fill="hsl(0 0% 20%)" />
      
      {/* Shirt */}
      <rect x="85" y="140" width="30" height="50" fill="hsl(0 0% 95%)" />
      
      {/* Tie */}
      <polygon points="100,145 95,160 100,200 105,160" fill="hsl(0 0% 30%)" />
      
      {/* Head */}
      <ellipse cx="100" cy="80" rx="40" ry="45" fill="hsl(0 0% 85%)" />
      
      {/* Hair */}
      <path
        d="M60 65 Q60 25 100 25 Q140 25 140 65 L135 65 Q135 35 100 35 Q65 35 65 65 Z"
        fill="hsl(0 0% 12%)"
      />
      
      {/* Eyes */}
      <g className="animate-blink">
        <ellipse cx="82" cy="75" rx="6" ry="4" fill="hsl(0 0% 10%)" />
        <ellipse cx="118" cy="75" rx="6" ry="4" fill="hsl(0 0% 10%)" />
        <circle cx="83" cy="74" r="1.5" fill="hsl(0 0% 100%)" />
        <circle cx="119" cy="74" r="1.5" fill="hsl(0 0% 100%)" />
      </g>
      
      {/* Eyebrows */}
      <path d="M74 65 Q82 62 90 65" stroke="hsl(0 0% 15%)" strokeWidth="2" fill="none" />
      <path d="M110 65 Q118 62 126 65" stroke="hsl(0 0% 15%)" strokeWidth="2" fill="none" />
      
      {/* Nose */}
      <path d="M100 80 L103 92 L97 92 Z" fill="hsl(0 0% 75%)" />
      
      {/* Mouth */}
      <path
        d="M90 105 Q100 112 110 105"
        stroke="hsl(0 0% 40%)"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Arms */}
      <rect x="50" y="145" width="20" height="60" fill="hsl(0 0% 20%)" />
      <rect x="130" y="145" width="20" height="60" fill="hsl(0 0% 20%)" />
      
      {/* Hands */}
      <ellipse cx="60" cy="210" rx="12" ry="10" fill="hsl(0 0% 85%)" />
      <ellipse cx="140" cy="210" rx="12" ry="10" fill="hsl(0 0% 85%)" />
      
      {/* Laptop in hand */}
      <rect x="45" y="195" width="35" height="25" rx="2" fill="hsl(0 0% 25%)" />
      <rect x="48" y="198" width="29" height="16" fill="hsl(0 0% 15%)" />
      <rect x="50" y="200" width="25" height="12" fill="hsl(0 0% 35%)" />
      
      {/* Legs */}
      <rect x="75" y="240" width="20" height="50" fill="hsl(0 0% 18%)" />
      <rect x="105" y="240" width="20" height="50" fill="hsl(0 0% 18%)" />
      
      {/* Shoes */}
      <rect x="70" y="285" width="30" height="12" rx="2" fill="hsl(0 0% 8%)" />
      <rect x="100" y="285" width="30" height="12" rx="2" fill="hsl(0 0% 8%)" />
    </svg>
  );
};

export default Character;
