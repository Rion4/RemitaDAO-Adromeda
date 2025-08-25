// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // This plugin provides browser-compatible versions of Node.js libraries
    nodePolyfills({
      globals: {
        global: true,
        process: true,
        Buffer: true,
      },
      protocolImports: true,
    }),
  ],
  // This helps the build tool resolve the dependencies correctly
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  resolve: {
    alias: {
      // This is a critical fix for libraries that rely on the 'stream' module
      stream: "stream-browserify",
    },
  },
})