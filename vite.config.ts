import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['cupcake-192x192.png', 'cupcake-512x512.png'],
      workbox: {
        cleanupOutdatedCaches: true,
      },
      manifest: {
        name: 'El Tallercito Gestor',
        short_name: 'Tallercito Gestor',
        description: 'Gestor de productos y control de stock del Tallercito de Mónica',
        theme_color: '#E9D5FF',
        lang: 'es-AR',

        icons: [
          {
            src: 'cupcake-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'cupcake-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
    splitVendorChunkPlugin(),
  ],
  base: '/eltallercitogestor/',
});
