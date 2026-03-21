import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-none border-2 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-accent bg-accent/20 text-accent shadow-[0_0_8px_hsl(var(--accent)/0.3)] hover:bg-accent/30",
        secondary:
          "border-primary bg-primary/20 text-primary shadow-[0_0_8px_hsl(var(--primary)/0.2)] hover:bg-primary/30",
        destructive:
          "border-destructive bg-destructive/20 text-destructive shadow-[0_0_8px_hsl(var(--destructive)/0.3)]",
        outline: "border-primary text-foreground hover:bg-primary/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
