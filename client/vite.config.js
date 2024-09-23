import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Ensure this is set correctly for the deployed environment
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5500/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    outDir: "dist", // Ensure the output directory is correctly set
  },
});
