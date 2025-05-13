import { defineConfig } from "astro/config"

// Astro integration imports
import sitemap from "@astrojs/sitemap"
import compress from "astro-compress"
import AstroPWA from "@vite-pwa/astro"
import path from 'path';
import { fileURLToPath } from 'url';
import { SITE } from './src/config.mjs';
import react from "@astrojs/react";
import glsl from 'vite-plugin-glsl';
// Helper imports
import { manifest, seoConfig } from "./src/utils/seoConfig"
import tailwindcss from "@tailwindcss/vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	site: SITE.origin,
  base: SITE.basePathname,
  trailingSlash: SITE.trailingSlash ? 'always' : 'never',
	integrations: [
		react(),
		sitemap(),
		compress({
			CSS: true,
			HTML: true,
			Image: false,
			JavaScript: true,
			SVG: false,
			Logger: 1
		})
	],
	vite: {
		plugins: [
			AstroPWA({
				registerType: "autoUpdate",
				manifest,
				workbox: {
				  globDirectory: 'dist',
				  globPatterns: [
				    '**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}',
				  ],
				  // Don't fallback on document based (e.g. `/some-page`) requests
				  // This removes an errant console.log message from showing up.
				  navigateFallback: null,
				},
			}),
			glsl(),
			tailwindcss()
		],
		ssr: {
      noExternal: ['usehooks-ts']
    },
		resolve: {
      alias: {
        '~': path.resolve(__dirname, './src')
      }
    }
	}
})
