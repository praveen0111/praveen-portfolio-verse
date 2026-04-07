import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
//
// `base` must match where the app is hosted:
// - Vercel (default): leave VITE_BASE_PATH unset → "/"
// - GitHub Pages project site: CI sets VITE_BASE_PATH=/praveen-portfolio-verse
// - Dev server: always "/"
function viteBase(mode: string): string {
  if (mode === "development") return "/";
  const raw = process.env.VITE_BASE_PATH?.trim();
  if (!raw) return "/";
  const withLeading = raw.startsWith("/") ? raw : `/${raw}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

export default defineConfig(({ mode }) => ({
  base: viteBase(mode),
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/gsap")) return "gsap";
        },
      },
    },
  },
}));
