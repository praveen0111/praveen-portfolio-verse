import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type TransitionType = "think" | "creative" | "fusion" | "home";

interface PageTransitionProps {
  children: ReactNode;
  type: TransitionType;
  isVisible: boolean;
  /** One viewport tall, no overflow scroll — use for the home hero only */
  fitViewport?: boolean;
}

const PageTransition = ({ children, isVisible, fitViewport }: PageTransitionProps) => {
  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "w-full",
        fitViewport
          ? "absolute inset-0 z-10 flex h-full min-h-0 flex-col overflow-hidden overscroll-none"
          : "absolute top-0 left-0 right-0 z-10 min-h-screen min-h-screen-mobile",
      )}
    >
      {children}
    </div>
  );
};

export default PageTransition;
