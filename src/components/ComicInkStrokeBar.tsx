import { useId } from "react";

/** Irregular comic ink stroke with tiny flecks; vertical = column between panels, horizontal = mobile strip */
export function ComicInkStrokeBar({
  orientation,
}: {
  orientation: "vertical" | "horizontal";
}) {
  const rawId = useId().replace(/:/g, "");
  const roughId = `ink-rough-${rawId}`;

  if (orientation === "vertical") {
    return (
      <svg
        className="pointer-events-none absolute left-1/2 top-0 h-full w-3 -translate-x-1/2 overflow-visible"
        viewBox="0 0 18 1000"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <filter
            id={roughId}
            x="-80%"
            y="-5%"
            width="260%"
            height="110%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.16 0.028"
              numOctaves="2"
              seed="17"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="3.2"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <rect
          x="1"
          y="0"
          width="16"
          height="1000"
          fill="#000000"
          filter={`url(#${roughId})`}
        />
        <VerticalFlecks />
      </svg>
    );
  }

  return (
    <svg
      className="pointer-events-none absolute left-0 top-1/2 h-3 w-full -translate-y-1/2 overflow-visible"
      viewBox="0 0 1000 18"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <filter
          id={roughId}
          x="-5%"
          y="-80%"
          width="110%"
          height="260%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.028 0.16"
            numOctaves="2"
            seed="23"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="3.2"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
      <rect
        x="0"
        y="1"
        width="1000"
        height="16"
        fill="#000000"
        filter={`url(#${roughId})`}
      />
      <HorizontalFlecks />
    </svg>
  );
}

function VerticalFlecks() {
  const paths: string[] = [];
  for (let i = 0; i < 28; i++) {
    const y = 6 + i * 34.2;
    const nudge = (i % 4) * 0.35;
    if (i % 2 === 0) {
      paths.push(
        `M 0 ${y} L -2.4 ${y + 1.2 + nudge} L -2.1 ${y + 4.8} L -0.3 ${y + 3.6} Z`,
      );
    } else {
      paths.push(
        `M 18 ${y + 10} L 20.7 ${y + 11.4 + nudge} L 20.3 ${y + 15} L 18.4 ${y + 13.6} Z`,
      );
    }
  }
  const dots: { cx: number; cy: number; r: number }[] = [];
  for (let i = 0; i < 36; i++) {
    const cy = 12 + i * 27.2;
    const left = i % 2 === 0;
    dots.push({
      cx: left ? -1.1 - (i % 3) * 0.25 : 19.1 + (i % 3) * 0.25,
      cy: cy + (i % 5) * 0.4,
      r: 0.45 + (i % 4) * 0.15,
    });
  }
  return (
    <>
      {paths.map((d, i) => (
        <path key={`p-${i}`} d={d} fill="#000000" />
      ))}
      {dots.map((d, i) => (
        <circle key={`c-${i}`} cx={d.cx} cy={d.cy} r={d.r} fill="#000000" />
      ))}
    </>
  );
}

function HorizontalFlecks() {
  const paths: string[] = [];
  for (let i = 0; i < 28; i++) {
    const x = 6 + i * 34.2;
    const nudge = (i % 4) * 0.35;
    if (i % 2 === 0) {
      paths.push(
        `M ${x} 0 L ${x + 1.2 + nudge} -2.4 L ${x + 4.8} -2.1 L ${x + 3.6} -0.3 Z`,
      );
    } else {
      paths.push(
        `M ${x + 10} 18 L ${x + 11.4 + nudge} 20.7 L ${x + 15} 20.3 L ${x + 13.6} 18.4 Z`,
      );
    }
  }
  const dots: { cx: number; cy: number; r: number }[] = [];
  for (let i = 0; i < 36; i++) {
    const cx = 12 + i * 27.2;
    const top = i % 2 === 0;
    dots.push({
      cx: cx + (i % 5) * 0.4,
      cy: top ? -1.1 - (i % 3) * 0.25 : 19.1 + (i % 3) * 0.25,
      r: 0.45 + (i % 4) * 0.15,
    });
  }
  return (
    <>
      {paths.map((d, i) => (
        <path key={`hp-${i}`} d={d} fill="#000000" />
      ))}
      {dots.map((d, i) => (
        <circle key={`hc-${i}`} cx={d.cx} cy={d.cy} r={d.r} fill="#000000" />
      ))}
    </>
  );
}
