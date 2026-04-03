/**
 * Magic UI — Line Shadow Text
 * https://magicui.design/docs/components/line-shadow-text
 */
import { type CSSProperties, type HTMLAttributes } from "react";
import { motion, type DOMMotionComponents, type MotionProps } from "motion/react";

import { cn } from "@/lib/utils";

const motionElements = {
  article: motion.article,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  li: motion.li,
  p: motion.p,
  section: motion.section,
  span: motion.span,
} as const;

type MotionElementType = Extract<keyof DOMMotionComponents, keyof typeof motionElements>;

export interface LineShadowTextProps
  extends Omit<HTMLAttributes<HTMLElement>, keyof MotionProps>,
    MotionProps {
  children: string;
  shadowColor?: string;
  as?: MotionElementType;
}

export function LineShadowText({
  children,
  shadowColor = "black",
  className,
  as: Component = "span",
  ...props
}: LineShadowTextProps) {
  const MotionComponent = motionElements[Component];

  return (
    <MotionComponent
      style={{ "--shadow-color": shadowColor } as CSSProperties}
      className={cn(
        "relative z-0 max-w-full whitespace-nowrap",
        /* `inline-flex` keeps foreground + ::after aligned; `block` from consumers breaks Magic UI (twMerge). */
        "inline-flex",
        "after:pointer-events-none after:absolute after:left-0 after:top-0 after:-z-10 after:whitespace-nowrap after:bg-[length:0.06em_0.06em] after:bg-clip-text after:font-inherit after:leading-[inherit] after:tracking-[inherit] after:text-transparent after:content-[attr(data-text)]",
        "after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_0)]",
        "after:animate-line-shadow",
        className,
        /* Last: win over consumer `block` from twMerge */
        "!inline-flex",
      )}
      data-text={children}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
