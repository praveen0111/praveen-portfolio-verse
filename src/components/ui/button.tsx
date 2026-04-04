import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-bold uppercase tracking-wide ring-offset-background touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-2 border-primary shadow-[0_0_12px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_20px_hsl(var(--primary)/0.6)] hover:brightness-110 active:shadow-[0_0_20px_hsl(var(--primary)/0.6)] active:brightness-110",
        destructive:
          "bg-destructive text-destructive-foreground border-2 border-destructive shadow-[0_0_12px_hsl(var(--destructive)/0.4)] hover:shadow-[0_0_20px_hsl(var(--destructive)/0.6)] active:shadow-[0_0_20px_hsl(var(--destructive)/0.6)]",
        outline:
          "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_16px_hsl(var(--primary)/0.5)] active:bg-primary active:text-primary-foreground active:shadow-[0_0_16px_hsl(var(--primary)/0.5)]",
        secondary:
          "bg-secondary text-secondary-foreground border-2 border-secondary hover:shadow-[0_0_12px_hsl(var(--primary)/0.3)] active:shadow-[0_0_12px_hsl(var(--primary)/0.3)]",
        ghost:
          "hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_12px_hsl(var(--accent)/0.4)] active:bg-accent active:text-accent-foreground active:shadow-[0_0_12px_hsl(var(--accent)/0.4)]",
        link:
          "text-primary underline-offset-4 hover:underline hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)] active:underline active:drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]",
      },
      size: {
        default: "h-11 min-h-11 px-5 py-2",
        sm: "h-10 min-h-10 rounded-none px-4",
        lg: "h-12 min-h-12 rounded-none px-10",
        icon: "h-11 min-h-11 w-11 min-w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
