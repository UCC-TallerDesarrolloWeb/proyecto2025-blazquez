import { fileURLToPath } from 'node:url'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)



export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@utils": path.resolve(__dirname, './src/utils'),
    },
  },
});
