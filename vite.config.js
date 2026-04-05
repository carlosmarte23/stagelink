import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    enviromenent: "jsdom",
    setupFiles: "./src/test/setup.js",
    css: true,
  },
});
