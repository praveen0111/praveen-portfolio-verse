import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
// Production: GitHub Pages project site at https://<user>.github.io/praveen-portfolio-verse/
// Development: base "/" so `npm run dev` works at localhost without the subpath.
const GITHUB_PAGES_BASE = "/praveen-portfolio-verse/";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? GITHUB_PAGES_BASE : "/",
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
