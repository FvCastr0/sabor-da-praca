import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import electron from "vite-plugin-electron/simple";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../")
    }
  },
  plugins: [
    react(),
    tsconfigPaths(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: "electron/main.ts"
      },
      preload: {
        input: path.join(__dirname, "electron/preload.ts")
      },
      renderer: process.env.NODE_ENV === "test" ? undefined : {}
    })
  ]
});
