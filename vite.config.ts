
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import viteCompression from 'vite-plugin-compression'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    // Only enable compression in production builds
    ...(mode === 'production' ? [
      // Brotli compression for maximum compression
      viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 1024,
        deleteOriginFile: false,
      }),
      // Gzip compression as fallback
      viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 1024,
        deleteOriginFile: false,
      }),
    ] : []),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['DX.jpg', 'logo-nobg.png', 'logo_8k.png', 'robots.txt'],
      manifest: {
        name: 'DNDX - Commerce-grade Predictable Fees',
        short_name: 'DNDX',
        description: 'Dendrites Network - Layer 2 blockchain with predictable fees, escrow, and AI-powered commerce tools',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/DX.jpg',
            sizes: '192x192',
            type: 'image/jpeg',
            purpose: 'any'
          },
          {
            src: '/DX.jpg',
            sizes: '512x512',
            type: 'image/jpeg',
            purpose: 'any maskable'
          },
          {
            src: '/logo-nobg.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/logo-nobg.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg,webp,woff,woff2}'],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 MB limit for large assets
        // Aggressive caching for static assets
        navigateFallback: null, // Disable for SPA to avoid conflicts
        runtimeCaching: [
          // Cache JS/CSS files with Network First strategy (always fresh)
          {
            urlPattern: /\.(?:js|css)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          // Cache images with Cache First (save bandwidth)
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 60, // 60 days
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/prod\.spline\.design\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'spline-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true
      },
      devOptions: {
        enabled: false, // Disable PWA in dev mode to avoid conflicts
        type: 'module'
      }
    })
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lodash.debounce', // Fix CommonJS export issue
      'react-fast-marquee', // Ensure marquee library is optimized
    ],
    exclude: [
      '@splinetool/react-spline',
      '@splinetool/runtime',
    ],
  },
  build: {
    rollupOptions: {
      output: {
        // Let Vite handle chunking automatically for better optimization
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
      // Tree shaking disabled for debugging
      // treeshake: {
      //   moduleSideEffects: true,
      //   propertyReadSideEffects: false,
      //   tryCatchDeoptimization: false,
      // },
    },
    chunkSizeWarningLimit: 1000, // Increase to 1000kb to reduce warnings
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'], // Remove specific console methods
        passes: 2, // Multiple passes for better compression
      },
      mangle: {
        safari10: true, // Better Safari compatibility
      },
      format: {
        comments: false, // Remove all comments
      },
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Source map generation (disable for smaller builds)
    sourcemap: false,
    // Optimize dependencies
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
      defaultIsModuleExports: 'auto', // Fix lodash.debounce default export
    },
    // Reduce asset inline threshold
    assetsInlineLimit: 4096, // 4kb - inline smaller assets as base64
    
    // FIX 10: Module preload polyfill for better browser support
    modulePreload: {
      polyfill: true, // Adds polyfill for browsers that don't support modulepreload
    },
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
}))
