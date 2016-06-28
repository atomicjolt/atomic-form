import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts({ include: ["lib"], copyDtsFiles: true })],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react-hook-form",
        "@atomicjolt/atomic-elements",
        "@hookform/error-message",
      ],
      output: {
        globals: {
          react: "React",
          jsx: "React",
          "react/jsx-runtime": "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
      },
    },
  },
});
