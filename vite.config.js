import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
 plugins: [react(), tailwindcss()],
 build: {
  chunkSizeWarningLimit: 1000,
  rollupOptions: {
   output: {
    manualChunks(id) {
     if (id.includes("node_modules/antd")) {
      return "antd";
     }
     if (id.includes("@ant-design/icons")) {
      return "antd-icons";
     }
     if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) {
      return "react-vendor";
     }
     if (id.includes("node_modules/react-router-dom")) {
      return "router";
     }
     if (id.includes("node_modules")) {
      return "vendor";
     }
    },
   },
  },
 },
 server: {
  port: 8080,
  host: "0.0.0.0",
  open: true,
 },
});
