import type { Config } from "tailwindcss";

/**
 * ============================================
 * TAILWIND CONFIGURATION - SPIDER-VERSE THEME
 * ============================================
 * 
 * COLOR SYSTEM:
 * - think.* = Daylight, warm, academic palette
 * - creative.* = Nighttime, bold, cinematic palette
 * - fusion.* = Contact page neutral blend
 * 
 * ANIMATIONS:
 * - THINK: Slower, calmer (0.5-0.7s)
 * - CREATIVE: Faster, bolder (0.3-0.4s)
 */

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        /* ============================================
         * SEMANTIC COLORS - Use these in components
         * ============================================ */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
        /* ============================================
         * THINK SIDE COLORS (Daylight, warm, academic)
         * 
         * HOW TO CUSTOMIZE:
         * Edit HSL values in index.css :root section
         * ============================================ */
        think: {
          bg: "hsl(var(--think-bg))",
          "bg-alt": "hsl(var(--think-bg-alt))",
          fg: "hsl(var(--think-fg))",
          "fg-muted": "hsl(var(--think-fg-muted))",
          accent: "hsl(var(--think-accent))",
          "accent-alt": "hsl(var(--think-accent-alt))",
          glow: "hsl(var(--think-glow))",
          border: "hsl(var(--think-border))",
        },
        
        /* ============================================
         * CREATIVE SIDE COLORS (Nighttime, bold, cinematic)
         * 
         * HOW TO CUSTOMIZE:
         * Edit HSL values in index.css :root section
         * ============================================ */
        creative: {
          bg: "hsl(var(--creative-bg))",
          "bg-alt": "hsl(var(--creative-bg-alt))",
          fg: "hsl(var(--creative-fg))",
          "fg-muted": "hsl(var(--creative-fg-muted))",
          accent: "hsl(var(--creative-accent))",
          "accent-alt": "hsl(var(--creative-accent-alt))",
          glow: "hsl(var(--creative-glow))",
          "glow-warm": "hsl(var(--creative-glow-warm))",
        },
        
        /* ============================================
         * FUSION COLORS (Contact page blend)
         * ============================================ */
        fusion: {
          bg: "hsl(var(--fusion-bg))",
          fg: "hsl(var(--fusion-fg))",
        },
        
        /* ============================================
         * DIVIDER GRADIENT COLORS
         * ============================================ */
        divider: {
          think: "hsl(var(--divider-think))",
          creative: "hsl(var(--divider-creative))",
        },
      },
      
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      
      /* ============================================
       * KEYFRAME ANIMATIONS
       * 
       * HOW TO CUSTOMIZE:
       * - Edit keyframe definitions in index.css
       * - Adjust timing/easing in animation definitions below
       * ============================================ */
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        blink: {
          "0%, 90%, 100%": { opacity: "1" },
          "93%, 97%": { opacity: "0" },
        },
        "divider-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 20px hsl(var(--think-accent)), 0 0 40px hsl(var(--think-accent) / 0.4)",
          },
          "50%": {
            boxShadow: "0 0 30px hsl(var(--creative-accent)), 0 0 60px hsl(var(--creative-accent) / 0.5)",
          },
        },
        /* Page transition keyframes */
        "panel-shift-left": {
          from: { transform: "translateX(-100%) skewX(-5deg)", opacity: "0" },
          to: { transform: "translateX(0) skewX(0deg)", opacity: "1" },
        },
        "panel-shift-right": {
          from: { transform: "translateX(100%) skewX(5deg)", opacity: "0" },
          to: { transform: "translateX(0) skewX(0deg)", opacity: "1" },
        },
        "frame-snap": {
          "0%": { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
          "100%": { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
        },
        "parallax-reveal": {
          from: { transform: "translateY(50px) scale(0.95)", opacity: "0" },
          to: { transform: "translateY(0) scale(1)", opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "scale-fade-in": {
          from: { transform: "scale(0.9)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        "lightbox-open": {
          from: { transform: "scale(0.8)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        "overlay-fade": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        
        /* Character animations */
        float: "float 6s ease-in-out infinite",
        "float-icon": "float-icon 8s ease-in-out infinite",
        wiggle: "wiggle 0.5s ease-in-out infinite",
        blink: "blink 4s ease-in-out infinite",
        
        /* Divider animation */
        "divider-pulse": "divider-pulse 2s ease-in-out infinite",
        
        /* Page transitions - THINK (slower, calmer) */
        "think-enter": "panel-shift-left 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        "think-reveal": "parallax-reveal 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
        
        /* Page transitions - CREATIVE (faster, bolder) */
        "creative-enter": "panel-shift-right 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "creative-reveal": "parallax-reveal 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        
        /* Shared transitions */
        "frame-snap": "frame-snap 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        "slide-up": "slide-up 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        "scale-fade": "scale-fade-in 0.3s ease-out",
        fadeIn: "fadeIn 0.5s ease-in-out",
        
        /* Lightbox */
        "lightbox-open": "lightbox-open 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        "overlay-fade": "overlay-fade 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
