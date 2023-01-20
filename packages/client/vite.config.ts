import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { VitePWA } from 'vite-plugin-pwa';

dotenv.config();

const vitePWA = VitePWA({
    registerType: 'autoUpdate',
    outDir: 'build',
    manifest: {
        name: 'Vitejs config PWA',
        short_name: 'VitePWA',
        description: 'ViteJS example to show how to create PWA app throw the easyest way',
        theme_color: '#ffffff',
        icons: [{
            src: 'assets/images/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',

        },
        {
            src: 'assets/images/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',

        }],
    },
});

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: Number(process.env.CLIENT_PORT) || 3000,
    },
    define: {
        __SERVER_PORT__: process.env.SERVER_PORT,
    },
    plugins: [
        react(),
    ],
});
