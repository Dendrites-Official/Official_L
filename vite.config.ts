
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  },
  server: { 
    host: '0.0.0.0', 
    port: 5173, 
    strictPort: true,
    allowedHosts: [
      'unclearing-ferly-delorse.ngrok-free.dev',
      '.ngrok-free.dev',
      '.ngrok.io',
      '.trycloudflare.com'
    ]
  },
  preview: { 
    host: '0.0.0.0', 
    port: 5173, 
    strictPort: true,
    allowedHosts: [
      'unclearing-ferly-delorse.ngrok-free.dev',
      '.ngrok-free.dev',
      '.ngrok.io',
      '.trycloudflare.com'
    ]
  },
})
