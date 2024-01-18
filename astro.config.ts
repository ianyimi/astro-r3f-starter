import { defineConfig } from "astro/config"

// Astro integration imports
import tailwind from "@astrojs/tailwind"
import sitemap from "@astrojs/sitemap"
import compress from "astro-compress"
import AstroPWA from "@vite-pwa/astro"

// Helper imports
import { manifest, seoConfig } from "./utils/seoConfig"

export default defineConfig({
	site: seoConfig.baseURL,
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		sitemap(),
		compress()
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
			})
		]
	}
})
