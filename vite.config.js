import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      // Evita que Rollup intente rastrear fsevents o módulos de Node
      fsevents: 'identity-obj-proxy'
    }
  },
  build: {
    rollupOptions: {
      external: ['fsevents'],
      output: {
        format: 'es', // Fuerza el formato de módulos de JavaScript modernos
      },
    },
  },
  optimizeDeps: {
    exclude: ['fsevents']
  }
})