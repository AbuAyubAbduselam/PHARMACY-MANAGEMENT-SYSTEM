import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Ensure this is set correctly for the deployed environment
  server: {
    proxy: {
      "/api": {
        target: "https://pharmacy-management-4omz.vercel.app/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    outDir: "dist", // Ensure the output directory is correctly set
  },
});
