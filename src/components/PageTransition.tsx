import { ReactNode } from "react";

type TransitionType = "think" | "creative" | "fusion" | "home";

interface PageTransitionProps {
  children: ReactNode;
  type: TransitionType;
  isVisible: boolean;
}

const PageTransition = ({ children, isVisible }: PageTransitionProps) => {
  if (!isVisible) return null;

  return (
    <div
      className="w-full min-h-screen min-h-screen-mobile"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
      }}
    >
      {children}
    </div>
  );
};

export default PageTransition;
