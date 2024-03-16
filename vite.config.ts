// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    minify: true,
    sourcemap: false,
    outDir: "dist",
    assetsDir: ".",
    cssCodeSplit: true,
    rollupOptions: {
      external: ["react", "react-dom"],
    },
  },
});