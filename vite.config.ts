import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";

// ⚠️ Este proxy solo corre en DEV (vite dev server).
// Redirige /cloudinary/* al backend evitando CORS para esa ruta.
export default defineConfig({
  plugins: [react(), tailwind()],
  resolve: { alias: { "@": "/src" } },
  server: {
    proxy: {
      "/cloudinary": {
        target: "http://18.211.110.58", // tu backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
