import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Vite React plugin

// Vite configuration
export default defineConfig({
  plugins: [react()], // Using both React and SVGR plugins
});
