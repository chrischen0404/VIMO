import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'generateSW',
      filename: 'sw.js',
      registerType: 'autoUpdate',
      includeAssets: [
        'offline.html',
        'success.html',
        'manifest.webmanifest',
        'icons/vimo-icon.svg',
        'icons/vimo-logo.svg',
        'icons/vimo-header-logo.png',
        'icons/vimo-header-logo.svg',
        'icons/vimo-mark-transparent.svg',
        'icons/icon-192.png',
        'icons/icon-512.png',
        'icons/maskable-512.png'
      ],
      manifest: false,
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,webmanifest}'],
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            urlPattern: ({ request }) => ['script', 'style', 'worker'].includes(request.destination),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'vimo-app-shell'
            }
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'vimo-images',
              expiration: {
                maxEntries: 80,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ]
});
