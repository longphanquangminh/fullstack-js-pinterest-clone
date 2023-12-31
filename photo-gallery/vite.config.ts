import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import WindiCSS from "vite-plugin-windicss";

export default defineConfig({
  plugins: [react(), legacy(), WindiCSS()],
});
