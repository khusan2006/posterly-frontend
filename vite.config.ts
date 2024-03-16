import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: true, // Enable minification
    sourcemap: false, // Disable source maps
    target: "esnext", // Set the target environment to ESNext
    outDir: "dist", // Output directory for the production build
    assetsDir: ".", // Directory for static assets
    cssCodeSplit: true, // Enable CSS code splitting
    rollupOptions: {
      // Make sure to externalize dependencies not bundled by Vite
      external: ["react", "react-dom"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
