import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: "tinyblog",
      project: "api",
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve("src"), // Replace 'src' with your actual source folder
    },
  },

  build: {
    sourcemap: true,
  },
});
