import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./myABV-Deployment/",
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
});
