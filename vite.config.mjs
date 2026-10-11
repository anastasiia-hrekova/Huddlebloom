import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {handleStoreImport} from "./server/store-import.js";
const storeImportApi = {name:"store-import-api", configureServer(server) {server.middlewares.use(async (req,res,next)=>{
  if(req.url.split("?")[0] !== "/api/store-import") return next();
  const response=await handleStoreImport(new Request(new URL(req.url,"http://localhost"),{method:req.method}));
  res.writeHead(response.status,Object.fromEntries(response.headers));res.end(await response.text());
});}};

export default defineConfig({
  build: {
    outDir: "dist/client",
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react(), storeImportApi],
});
