// @ts-check
import { defineConfig } from 'astro/config';
import markdoc from '@astrojs/markdoc';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import keystatic from '@keystatic/astro';

// Phase 1 skeleton: static output with the Vercel adapter. The Keystatic
// integration injects its admin UI and API routes as on-demand, server-rendered
// endpoints (`prerender: false` in the integration), so the adapter is required
// to provide a server runtime for them. All public marketing pages still
// prerender to static HTML.
export default defineConfig({
  site: 'https://iifr.global',
  output: 'static',
  trailingSlash: 'never',
  adapter: vercel(),
  integrations: [react(), markdoc(), keystatic()],
  vite: {
    plugins: [tailwindcss()],
  },
});
