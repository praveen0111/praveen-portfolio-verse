import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * ============================================
 * COMIC POP HEADLINE PLATE
 * ============================================
 * Hand-made comic caption backgrounds with tactile pop-out effect,
 * inspired by offset print and cut-paper aesthetics.
 *
 * Use for: homepage headlines, section headings, feature titles, editorial callouts.
 * Style: authentic, analog, editorial, comic-book, hand-crafted.
 */

export type PlateVariant = "primary" | "secondary";

export interface ComicPopHeadlinePlateProps {
  children: ReactNode;
  /** Background: primary (#DCEBF2) or secondary (rgba(167, 214, 236, 1)) */
  variant?: PlateVariant;
  /** center | left */
  align?: "center" | "left";
  /** Optional extra class for the outer wrapper */
  className?: string;
  /** Optional class for the inner text */
  textClassName?: string;
  /** Optional class for the plate span (e.g. comic-pop-plate--contact-header) */
  plateClassName?: string;
  /** Optional inline style for the plate span (e.g. left, top for hero plates) */
  plateStyle?: React.CSSProperties;
  /** Render as inline so the plate only wraps content width */
  inline?: boolean;
}

const VARIANT_BG = {
  primary: "#DCEBF2",
  secondary: "rgba(167, 214, 236, 1)",
} as const;

export function ComicPopHeadlinePlate({
  children,
  variant = "primary",
  align = "center",
  className,
  textClassName,
  plateClassName,
  plateStyle,
  inline = false,
}: ComicPopHeadlinePlateProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <span
      className={cn(inline ? "inline-block" : "block", className)}
      style={{ width: inline ? undefined : "100%" }}
    >
      <span
        className={cn(
          "comic-pop-plate",
          "comic-pop-plate--paper-grain",
          !inline && "comic-pop-plate--full-width",
          mounted && "comic-pop-plate--visible",
          plateClassName
        )}
        style={
          {
            "--plate-bg": VARIANT_BG[variant],
            "--plate-border": "rgba(0, 0, 0, 1)",
            ...plateStyle,
          } as React.CSSProperties
        }
      >
        <span
          className={cn(
            "comic-pop-plate__text",
            align === "center" ? "text-center" : "text-left",
            textClassName
          )}
        >
          {children}
        </span>
      </span>
    </span>
  );
}
