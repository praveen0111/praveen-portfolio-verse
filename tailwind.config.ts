import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        think: {
          bg: "hsl(var(--think-bg))", "bg-alt": "hsl(var(--think-bg-alt))",
          fg: "hsl(var(--think-fg))", "fg-muted": "hsl(var(--think-fg-muted))",
          accent: "hsl(var(--think-accent))", "accent-alt": "hsl(var(--think-accent-alt))",
          glow: "hsl(var(--think-glow))", border: "hsl(var(--think-border))",
        },
        creative: {
          bg: "hsl(var(--creative-bg))", "bg-alt": "hsl(var(--creative-bg-alt))",
          fg: "hsl(var(--creative-fg))", "fg-muted": "hsl(var(--creative-fg-muted))",
          accent: "hsl(var(--creative-accent))", "accent-alt": "hsl(var(--creative-accent-alt))",
          glow: "hsl(var(--creative-glow))", "glow-warm": "hsl(var(--creative-glow-warm))",
        },
        fusion: { bg: "hsl(var(--fusion-bg))", fg: "hsl(var(--fusion-fg))" },
        divider: { think: "hsl(var(--divider-think))", creative: "hsl(var(--divider-creative))" },
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
      fontFamily: {
        comic: ["Tiny5", "sans-serif"],
        "comic-secondary": ["Tiny5", "sans-serif"],
        content: ["Jersey 15", "sans-serif"],
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        blink: { "0%, 90%, 100%": { opacity: "1" }, "93%, 97%": { opacity: "0" } },
        "divider-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(var(--think-accent)), 0 0 40px hsl(var(--think-accent) / 0.4)" },
          "50%": { boxShadow: "0 0 30px hsl(var(--creative-accent)), 0 0 60px hsl(var(--creative-accent) / 0.5)" },
        },
        "panel-shift-left": { from: { transform: "translateX(-100%) skewX(-5deg)", opacity: "0" }, to: { transform: "translateX(0) skewX(0deg)", opacity: "1" } },
        "panel-shift-right": { from: { transform: "translateX(100%) skewX(5deg)", opacity: "0" }, to: { transform: "translateX(0) skewX(0deg)", opacity: "1" } },
        "parallax-reveal": { from: { transform: "translateY(50px) scale(0.95)", opacity: "0" }, to: { transform: "translateY(0) scale(1)", opacity: "1" } },
        "slide-up": { from: { transform: "translateY(100%)", opacity: "0" }, to: { transform: "translateY(0)", opacity: "1" } },
        "scale-fade-in": { from: { transform: "scale(0.9)", opacity: "0" }, to: { transform: "scale(1)", opacity: "1" } },
        "lightbox-open": { from: { transform: "scale(0.8)", opacity: "0" }, to: { transform: "scale(1)", opacity: "1" } },
        "overlay-fade": { from: { opacity: "0" }, to: { opacity: "1" } },
        "page-turn-left": {
          "0%": { 
            transform: "perspective(2000px) rotateY(90deg) translateX(100%) rotateZ(-25deg)", 
            opacity: "0", 
            transformOrigin: "left center",
            filter: "brightness(0.3)"
          },
          "20%": { 
            transform: "perspective(2000px) rotateY(70deg) translateX(80%) rotateZ(-18deg)", 
            opacity: "0.2", 
            transformOrigin: "left center",
            filter: "brightness(0.4)"
          },
          "40%": { 
            transform: "perspective(2000px) rotateY(45deg) translateX(50%) rotateZ(-10deg)", 
            opacity: "0.5", 
            transformOrigin: "left center",
            filter: "brightness(0.6)"
          },
          "60%": { 
            transform: "perspective(2000px) rotateY(25deg) translateX(25%) rotateZ(-5deg)", 
            opacity: "0.75", 
            transformOrigin: "left center",
            filter: "brightness(0.8)"
          },
          "80%": { 
            transform: "perspective(2000px) rotateY(8deg) translateX(5%) rotateZ(-2deg)", 
            opacity: "0.9", 
            transformOrigin: "left center",
            filter: "brightness(0.95)"
          },
          "100%": { 
            transform: "perspective(2000px) rotateY(0deg) translateX(0) rotateZ(0deg)", 
            opacity: "1", 
            transformOrigin: "left center",
            filter: "brightness(1)"
          },
        },
        "page-turn-right": {
          "0%": { 
            transform: "perspective(2000px) rotateY(-90deg) translateX(-100%) rotateZ(25deg)", 
            opacity: "0", 
            transformOrigin: "right center",
            filter: "brightness(0.3)"
          },
          "20%": { 
            transform: "perspective(2000px) rotateY(-70deg) translateX(-80%) rotateZ(18deg)", 
            opacity: "0.2", 
            transformOrigin: "right center",
            filter: "brightness(0.4)"
          },
          "40%": { 
            transform: "perspective(2000px) rotateY(-45deg) translateX(-50%) rotateZ(10deg)", 
            opacity: "0.5", 
            transformOrigin: "right center",
            filter: "brightness(0.6)"
          },
          "60%": { 
            transform: "perspective(2000px) rotateY(-25deg) translateX(-25%) rotateZ(5deg)", 
            opacity: "0.75", 
            transformOrigin: "right center",
            filter: "brightness(0.8)"
          },
          "80%": { 
            transform: "perspective(2000px) rotateY(-8deg) translateX(-5%) rotateZ(2deg)", 
            opacity: "0.9", 
            transformOrigin: "right center",
            filter: "brightness(0.95)"
          },
          "100%": { 
            transform: "perspective(2000px) rotateY(0deg) translateX(0) rotateZ(0deg)", 
            opacity: "1", 
            transformOrigin: "right center",
            filter: "brightness(1)"
          },
        },
        "page-turn-up": {
          "0%": { 
            transform: "perspective(2000px) rotateX(90deg) translateY(100%) rotateZ(15deg)", 
            opacity: "0", 
            transformOrigin: "center bottom",
            filter: "brightness(0.3)"
          },
          "20%": { 
            transform: "perspective(2000px) rotateX(70deg) translateY(80%) rotateZ(12deg)", 
            opacity: "0.2", 
            transformOrigin: "center bottom",
            filter: "brightness(0.4)"
          },
          "40%": { 
            transform: "perspective(2000px) rotateX(45deg) translateY(50%) rotateZ(8deg)", 
            opacity: "0.5", 
            transformOrigin: "center bottom",
            filter: "brightness(0.6)"
          },
          "60%": { 
            transform: "perspective(2000px) rotateX(25deg) translateY(25%) rotateZ(4deg)", 
            opacity: "0.75", 
            transformOrigin: "center bottom",
            filter: "brightness(0.8)"
          },
          "80%": { 
            transform: "perspective(2000px) rotateX(8deg) translateY(5%) rotateZ(1deg)", 
            opacity: "0.9", 
            transformOrigin: "center bottom",
            filter: "brightness(0.95)"
          },
          "100%": { 
            transform: "perspective(2000px) rotateX(0deg) translateY(0) rotateZ(0deg)", 
            opacity: "1", 
            transformOrigin: "center bottom",
            filter: "brightness(1)"
          },
        },
        "page-turn-out-left": {
          "0%": { 
            transform: "perspective(2000px) rotateY(0deg) translateX(0) rotateZ(0deg)", 
            opacity: "1", 
            transformOrigin: "left center",
            filter: "brightness(1)"
          },
          "20%": { 
            transform: "perspective(2000px) rotateY(-15deg) translateX(-15%) rotateZ(3deg)", 
            opacity: "0.9", 
            transformOrigin: "left center",
            filter: "brightness(0.95)"
          },
          "40%": { 
            transform: "perspective(2000px) rotateY(-35deg) translateX(-35%) rotateZ(8deg)", 
            opacity: "0.75", 
            transformOrigin: "left center",
            filter: "brightness(0.8)"
          },
          "60%": { 
            transform: "perspective(2000px) rotateY(-55deg) translateX(-60%) rotateZ(12deg)", 
            opacity: "0.5", 
            transformOrigin: "left center",
            filter: "brightness(0.6)"
          },
          "80%": { 
            transform: "perspective(2000px) rotateY(-75deg) translateX(-85%) rotateZ(18deg)", 
            opacity: "0.2", 
            transformOrigin: "left center",
            filter: "brightness(0.4)"
          },
          "100%": { 
            transform: "perspective(2000px) rotateY(-90deg) translateX(-100%) rotateZ(25deg)", 
            opacity: "0", 
            transformOrigin: "left center",
            filter: "brightness(0.3)"
          },
        },
        "page-turn-out-right": {
          "0%": { 
            transform: "perspective(2000px) rotateY(0deg) translateX(0) rotateZ(0deg)", 
            opacity: "1", 
            transformOrigin: "right center",
            filter: "brightness(1)"
          },
          "20%": { 
            transform: "perspective(2000px) rotateY(15deg) translateX(15%) rotateZ(-3deg)", 
            opacity: "0.9", 
            transformOrigin: "right center",
            filter: "brightness(0.95)"
          },
          "40%": { 
            transform: "perspective(2000px) rotateY(35deg) translateX(35%) rotateZ(-8deg)", 
            opacity: "0.75", 
            transformOrigin: "right center",
            filter: "brightness(0.8)"
          },
          "60%": { 
            transform: "perspective(2000px) rotateY(55deg) translateX(60%) rotateZ(-12deg)", 
            opacity: "0.5", 
            transformOrigin: "right center",
            filter: "brightness(0.6)"
          },
          "80%": { 
            transform: "perspective(2000px) rotateY(75deg) translateX(85%) rotateZ(-18deg)", 
            opacity: "0.2", 
            transformOrigin: "right center",
            filter: "brightness(0.4)"
          },
          "100%": { 
            transform: "perspective(2000px) rotateY(90deg) translateX(100%) rotateZ(-25deg)", 
            opacity: "0", 
            transformOrigin: "right center",
            filter: "brightness(0.3)"
          },
        },
        "page-turn-out-up": {
          "0%": { 
            transform: "perspective(2000px) rotateX(0deg) translateY(0) rotateZ(0deg)", 
            opacity: "1", 
            transformOrigin: "center bottom",
            filter: "brightness(1)"
          },
          "20%": { 
            transform: "perspective(2000px) rotateX(-15deg) translateY(-15%) rotateZ(-3deg)", 
            opacity: "0.9", 
            transformOrigin: "center bottom",
            filter: "brightness(0.95)"
          },
          "40%": { 
            transform: "perspective(2000px) rotateX(-35deg) translateY(-35%) rotateZ(-8deg)", 
            opacity: "0.75", 
            transformOrigin: "center bottom",
            filter: "brightness(0.8)"
          },
          "60%": { 
            transform: "perspective(2000px) rotateX(-55deg) translateY(-60%) rotateZ(-12deg)", 
            opacity: "0.5", 
            transformOrigin: "center bottom",
            filter: "brightness(0.6)"
          },
          "80%": { 
            transform: "perspective(2000px) rotateX(-75deg) translateY(-85%) rotateZ(-18deg)", 
            opacity: "0.2", 
            transformOrigin: "center bottom",
            filter: "brightness(0.4)"
          },
          "100%": { 
            transform: "perspective(2000px) rotateX(-90deg) translateY(-100%) rotateZ(-25deg)", 
            opacity: "0", 
            transformOrigin: "center bottom",
            filter: "brightness(0.3)"
          },
        },
        "page-curl-from-right": {
          "0%": { 
            transform: "perspective(2000px) rotateY(0deg) rotateZ(0deg) translateZ(0px)", 
            opacity: "1", 
            transformOrigin: "right center",
            filter: "brightness(1)",
            clipPath: "inset(0 0 0 0)"
          },
          "3%": { 
            transform: "perspective(2000px) rotateY(-1deg) rotateZ(-2deg) translateZ(2px)", 
            opacity: "1", 
            transformOrigin: "right center",
            filter: "brightness(0.99)",
            clipPath: "inset(0 0 0 0)"
          },
          "8%": { 
            transform: "perspective(2000px) rotateY(-5deg) rotateZ(-5deg) translateZ(5px)", 
            opacity: "1", 
            transformOrigin: "right center",
            filter: "brightness(0.96)",
            clipPath: "inset(0 2% 0 0)"
          },
          "15%": { 
            transform: "perspective(2000px) rotateY(-15deg) rotateZ(-8deg) translateZ(10px)", 
            opacity: "1", 
            transformOrigin: "right center",
            filter: "brightness(0.9)",
            clipPath: "inset(0 5% 0 0)"
          },
          "25%": { 
            transform: "perspective(2000px) rotateY(-25deg) rotateZ(-10deg) translateZ(15px)", 
            opacity: "1", 
            transformOrigin: "right center",
            filter: "brightness(0.82)",
            clipPath: "inset(0 10% 0 0)"
          },
          "40%": { 
            transform: "perspective(2000px) rotateY(-40deg) rotateZ(-12deg) translateZ(20px)", 
            opacity: "0.98", 
            transformOrigin: "right center",
            filter: "brightness(0.7)",
            clipPath: "inset(0 20% 0 0)"
          },
          "55%": { 
            transform: "perspective(2000px) rotateY(-60deg) rotateZ(-15deg) translateZ(25px)", 
            opacity: "0.95", 
            transformOrigin: "right center",
            filter: "brightness(0.55)",
            clipPath: "inset(0 35% 0 0)"
          },
          "70%": { 
            transform: "perspective(2000px) rotateY(-78deg) rotateZ(-18deg) translateZ(30px)", 
            opacity: "0.85", 
            transformOrigin: "right center",
            filter: "brightness(0.4)",
            clipPath: "inset(0 55% 0 0)"
          },
          "85%": { 
            transform: "perspective(2000px) rotateY(-88deg) rotateZ(-22deg) translateZ(35px)", 
            opacity: "0.5", 
            transformOrigin: "right center",
            filter: "brightness(0.25)",
            clipPath: "inset(0 80% 0 0)"
          },
          "100%": { 
            transform: "perspective(2000px) rotateY(-90deg) rotateZ(-25deg) translateZ(40px)", 
            opacity: "0", 
            transformOrigin: "right center",
            filter: "brightness(0.15)",
            clipPath: "inset(0 100% 0 0)"
          },
        },
        "page-curl-from-left": {
          "0%": { 
            transform: "perspective(2000px) rotateY(0deg) rotateZ(0deg) translateZ(0px)", 
            opacity: "1", 
            transformOrigin: "left center",
            filter: "brightness(1)",
            clipPath: "inset(0 0 0 0)"
          },
          "3%": { 
            transform: "perspective(2000px) rotateY(1deg) rotateZ(2deg) translateZ(2px)", 
            opacity: "1", 
            transformOrigin: "left center",
            filter: "brightness(0.99)",
            clipPath: "inset(0 0 0 0)"
          },
          "8%": { 
            transform: "perspective(2000px) rotateY(5deg) rotateZ(5deg) translateZ(5px)", 
            opacity: "1", 
            transformOrigin: "left center",
            filter: "brightness(0.96)",
            clipPath: "inset(0 0 0 2%)"
          },
          "15%": { 
            transform: "perspective(2000px) rotateY(15deg) rotateZ(8deg) translateZ(10px)", 
            opacity: "1", 
            transformOrigin: "left center",
            filter: "brightness(0.9)",
            clipPath: "inset(0 0 0 5%)"
          },
          "25%": { 
            transform: "perspective(2000px) rotateY(25deg) rotateZ(10deg) translateZ(15px)", 
            opacity: "1", 
            transformOrigin: "left center",
            filter: "brightness(0.82)",
            clipPath: "inset(0 0 0 10%)"
          },
          "40%": { 
            transform: "perspective(2000px) rotateY(40deg) rotateZ(12deg) translateZ(20px)", 
            opacity: "0.98", 
            transformOrigin: "left center",
            filter: "brightness(0.7)",
            clipPath: "inset(0 0 0 20%)"
          },
          "55%": { 
            transform: "perspective(2000px) rotateY(60deg) rotateZ(15deg) translateZ(25px)", 
            opacity: "0.95", 
            transformOrigin: "left center",
            filter: "brightness(0.55)",
            clipPath: "inset(0 0 0 35%)"
          },
          "70%": { 
            transform: "perspective(2000px) rotateY(78deg) rotateZ(18deg) translateZ(30px)", 
            opacity: "0.85", 
            transformOrigin: "left center",
            filter: "brightness(0.4)",
            clipPath: "inset(0 0 0 55%)"
          },
          "85%": { 
            transform: "perspective(2000px) rotateY(88deg) rotateZ(22deg) translateZ(35px)", 
            opacity: "0.5", 
            transformOrigin: "left center",
            filter: "brightness(0.25)",
            clipPath: "inset(0 0 0 80%)"
          },
          "100%": { 
            transform: "perspective(2000px) rotateY(90deg) rotateZ(25deg) translateZ(40px)", 
            opacity: "0", 
            transformOrigin: "left center",
            filter: "brightness(0.15)",
            clipPath: "inset(0 0 0 100%)"
          },
        },
        "page-reveal-from-right": {
          "0%": { 
            transform: "perspective(2000px) rotateY(90deg) rotateZ(25deg) translateZ(40px)", 
            opacity: "0", 
            transformOrigin: "left center",
            filter: "brightness(0.15)",
            clipPath: "inset(0 100% 0 0)"
          },
          "15%": { 
            transform: "perspective(2000px) rotateY(88deg) rotateZ(22deg) translateZ(35px)", 
            opacity: "0.5", 
            transformOrigin: "left center",
            filter: "brightness(0.25)",
            clipPath: "inset(0 80% 0 0)"
          },
          "30%": { 
            transform: "perspective(2000px) rotateY(78deg) rotateZ(18deg) translateZ(30px)", 
            opacity: "0.85", 
            transformOrigin: "left center",
            filter: "brightness(0.4)",
            clipPath: "inset(0 55% 0 0)"
          },
          "45%": { 
            transform: "perspective(2000px) rotateY(60deg) rotateZ(15deg) translateZ(25px)", 
            opacity: "0.95", 
            transformOrigin: "left center",
            filter: "brightness(0.55)",
            clipPath: "inset(0 35% 0 0)"
          },
          "60%": { 
            transform: "perspective(2000px) rotateY(40deg) rotateZ(12deg) translateZ(20px)", 
            opacity: "0.98", 
            transformOrigin: "left center",
            filter: "brightness(0.7)",
            clipPath: "inset(0 20% 0 0)"
          },
          "75%": { 
            transform: "perspective(2000px) rotateY(25deg) rotateZ(10deg) translateZ(15px)", 
            opacity: "1", 
            transformOrigin: "left center",
            filter: "brightness(0.82)",
            clipPath: "inset(0 10% 0 0)"
          },
          "85%": { 
            transform: "perspective(2000px) rotateY(15deg) rotateZ(8deg) translateZ(10px)", 
            opacity: "1", 
            transformOrigin: "left center",
            filter: "brightness(0.9)",
            clipPath: "inset(0 5% 0 0)"
          },
          "92%": { 
            transform: "perspective(2000px) rotateY(5deg) rotateZ(5deg) translateZ(5px)", 
            opacity: "1", 
            transformOrigin: "left center",
            filter: "brightness(0.96)",
            clipPath: "inset(0 2% 0 0)"
          },
          "97%": { 
            transform: "perspective(2000px) rotateY(1deg) rotateZ(2deg) translateZ(2px)", 
            opacity: "1", 
            transformOrigin: "left center",
            filter: "brightness(0.99)",
            clipPath: "inset(0 0 0 0)"
          },
          "100%": { 
            transform: "perspective(2000px) rotateY(0deg) rotateZ(0deg) translateZ(0px)", 
            opacity: "1", 
            transformOrigin: "left center",
            filter: "brightness(1)",
            clipPath: "inset(0 0 0 0)"
          },
        },
        "page-reveal-from-left": {
          "0%": { 
            transform: "perspective(2000px) rotateY(-90deg) rotateZ(-25deg) translateZ(40px)", 
            opacity: "0", 
            transformOrigin: "right center",
            filter: "brightness(0.15)",
            clipPath: "inset(0 0 0 100%)"
          },
          "15%": { 
            transform: "perspective(2000px) rotateY(-88deg) rotateZ(-22deg) translateZ(35px)", 
            opacity: "0.5", 
            transformOrigin: "right center",
            filter: "brightness(0.25)",
            clipPath: "inset(0 0 0 80%)"
          },
          "30%": { 
            transform: "perspective(2000px) rotateY(-78deg) rotateZ(-18deg) translateZ(30px)", 
            opacity: "0.85", 
            transformOrigin: "right center",
            filter: "brightness(0.4)",
            clipPath: "inset(0 0 0 55%)"
          },
          "45%": { 
            transform: "perspective(2000px) rotateY(-60deg) rotateZ(-15deg) translateZ(25px)", 
            opacity: "0.95", 
            transformOrigin: "right center",
            filter: "brightness(0.55)",
            clipPath: "inset(0 0 0 35%)"
          },
          "60%": { 
            transform: "perspective(2000px) rotateY(-40deg) rotateZ(-12deg) translateZ(20px)", 
            opacity: "0.98", 
            transformOrigin: "right center",
            filter: "brightness(0.7)",
            clipPath: "inset(0 0 0 20%)"
          },
          "75%": { 
            transform: "perspective(2000px) rotateY(-25deg) rotateZ(-10deg) translateZ(15px)", 
            opacity: "1", 
            transformOrigin: "right center",
            filter: "brightness(0.82)",
            clipPath: "inset(0 0 0 10%)"
          },
          "85%": { 
            transform: "perspective(2000px) rotateY(-15deg) rotateZ(-8deg) translateZ(10px)", 
            opacity: "1", 
            transformOrigin: "right center",
            filter: "brightness(0.9)",
            clipPath: "inset(0 0 0 5%)"
          },
          "92%": { 
            transform: "perspective(2000px) rotateY(-5deg) rotateZ(-5deg) translateZ(5px)", 
            opacity: "1", 
            transformOrigin: "right center",
            filter: "brightness(0.96)",
            clipPath: "inset(0 0 0 2%)"
          },
          "97%": { 
            transform: "perspective(2000px) rotateY(-1deg) rotateZ(-2deg) translateZ(2px)", 
            opacity: "1", 
            transformOrigin: "right center",
            filter: "brightness(0.99)",
            clipPath: "inset(0 0 0 0)"
          },
          "100%": { 
            transform: "perspective(2000px) rotateY(0deg) rotateZ(0deg) translateZ(0px)", 
            opacity: "1", 
            transformOrigin: "right center",
            filter: "brightness(1)",
            clipPath: "inset(0 0 0 0)"
          },
        },
        /** Homepage THINK / CREATE headline plates — hover bounce */
        "hero-plate-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "18%": { transform: "translateY(-11px)" },
          "36%": { transform: "translateY(0)" },
          "54%": { transform: "translateY(-7px)" },
          "72%": { transform: "translateY(0)" },
          "86%": { transform: "translateY(-3px)" },
        },
        /** Magic UI — Line Shadow Text */
        "line-shadow": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "100% -100%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "float-icon": "float-icon 8s ease-in-out infinite",
        blink: "blink 4s ease-in-out infinite",
        "divider-pulse": "divider-pulse 2s ease-in-out infinite",
        "think-enter": "panel-shift-left 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        "think-reveal": "parallax-reveal 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
        "creative-enter": "panel-shift-right 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "creative-reveal": "parallax-reveal 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "slide-up": "slide-up 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        "scale-fade": "scale-fade-in 0.3s ease-out",
        fadeIn: "fadeIn 0.5s ease-in-out",
        "lightbox-open": "lightbox-open 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        "overlay-fade": "overlay-fade 0.2s ease-out",
        "comic-page-turn-left": "page-turn-left 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "comic-page-turn-right": "page-turn-right 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "comic-page-turn-up": "page-turn-up 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "comic-page-turn-out-left": "page-turn-out-left 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "comic-page-turn-out-right": "page-turn-out-right 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "comic-page-turn-out-up": "page-turn-out-up 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "book-curl-from-right": "page-curl-from-right 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        "book-curl-from-left": "page-curl-from-left 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        "book-reveal-from-right": "page-reveal-from-right 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        "book-reveal-from-left": "page-reveal-from-left 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        "hero-plate-bounce": "hero-plate-bounce 0.75s ease-in-out infinite",
        "line-shadow": "line-shadow 15s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
