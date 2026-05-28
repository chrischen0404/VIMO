import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      registerType: 'autoUpdate',
      includeAssets: [
        'offline.html',
        'manifest.webmanifest',
        'icons/vimo-icon.svg',
        'icons/icon-192.png',
        'icons/icon-512.png',
        'icons/maskable-512.png'
      ],
      manifest: false,
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,webmanifest}']
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ]
});
