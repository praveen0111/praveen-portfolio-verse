import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
// Served from site root on Vercel (`/`). `publicUrl()` uses `import.meta.env.BASE_URL`.
export default defineConfig({
  base: "/",
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
});
