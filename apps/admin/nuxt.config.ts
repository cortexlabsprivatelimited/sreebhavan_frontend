import { fileURLToPath } from 'node:url';

// `npm run dev:mock` serves a fake FastAPI at /api/v1 (mock-api/) so the panel works without a backend.
const isMockApiEnabled = process.env.MOCK_API === 'true';

// Admin panel: SPA, login required, never indexed by search engines.
export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  ssr: false,
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@pinia/nuxt', '@nuxt/eslint'],
  css: ['~/common/styles/main.css'],
  // Feature and common components are imported explicitly, not auto-registered.
  components: { dirs: [] },
  typescript: { strict: true },
  tailwindcss: { cssPath: false, configPath: 'tailwind.config.ts' },
  // FastAPI already resizes uploads to WebP, and the admin SPA has no image server: serve URLs as-is.
  image: { provider: 'none' },
  runtimeConfig: {
    public: {
      apiBaseUrl: '', // set with NUXT_PUBLIC_API_BASE_URL
    },
  },
  app: {
    head: {
      title: 'Sreebhavan Admin',
      titleTemplate: '%s · Sreebhavan Admin',
      meta: [{ name: 'robots', content: 'noindex, nofollow' }],
      link: [{ rel: 'icon', href: '/favicon.ico' }],
    },
  },
  nitro: isMockApiEnabled
    ? {
        handlers: [
          {
            route: '/api/v1/**',
            handler: fileURLToPath(new URL('./mock-api/mockApiHandler.ts', import.meta.url)),
          },
        ],
      }
    : {},
  routeRules: {
    '/**': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
  },
});
