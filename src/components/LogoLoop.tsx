import { ReactNode, useEffect, useRef, useState } from "react";

export type LogoItem =
  | { node: ReactNode; title?: string; href?: string }
  | { src: string; alt: string; href?: string };

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right";
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  scaleOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  ariaLabel?: string;
}

const LogoLoop = ({
  logos,
  speed = 80,
  direction = "left",
  logoHeight = 48,
  gap = 48,
  hoverSpeed = 0,
  scaleOnHover = false,
  fadeOut = false,
  fadeOutColor = "#ffffff",
  ariaLabel = "Logo carousel",
}: LogoLoopProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [loopWidth, setLoopWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const effectiveSpeed = isHovered && hoverSpeed > 0 ? hoverSpeed : speed;
  const duration = loopWidth > 0 ? loopWidth / effectiveSpeed : 0;

  useEffect(() => {
    if (!trackRef.current) return;
    const halfWidth = trackRef.current.scrollWidth / 2;
    setLoopWidth(halfWidth);
  }, [logos, gap, logoHeight]);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ minHeight: logoHeight + 16 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={ariaLabel}
    >
      {fadeOut && (
        <>
          <div
            className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{
              width: 80,
              background: `linear-gradient(to right, ${fadeOutColor}, transparent)`,
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{
              width: 80,
              background: `linear-gradient(to left, ${fadeOutColor}, transparent)`,
            }}
          />
        </>
      )}

      <div
        ref={trackRef}
        className="flex items-center"
        style={{
          width: "max-content",
          animation: loopWidth
            ? `logo-loop ${duration}s linear infinite`
            : undefined,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {[...logos, ...logos].map((logo, i) => (
          <a
            key={i}
            href={"href" in logo ? logo.href : undefined}
            target={logo.href ? "_blank" : undefined}
            rel={logo.href ? "noopener noreferrer" : undefined}
            className="flex items-center justify-center flex-shrink-0 transition-transform duration-200"
            style={{
              height: logoHeight,
              width: logoHeight,
              marginRight: gap,
              transform: scaleOnHover && hoveredIndex === i ? "scale(1.1)" : "scale(1)",
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            title={"title" in logo ? logo.title : "src" in logo ? logo.alt : undefined}
          >
            {"node" in logo ? (
              <span className="inline-flex w-full h-full [&>svg]:w-full [&>svg]:h-full">
                {logo.node}
              </span>
            ) : (
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-full max-w-full object-contain"
              />
            )}
          </a>
        ))}
      </div>

      <style>{`
        @keyframes logo-loop {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-${loopWidth}px);
          }
        }
      `}</style>
    </div>
  );
};

export default LogoLoop;
