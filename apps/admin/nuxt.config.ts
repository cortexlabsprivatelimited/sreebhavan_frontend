// One Nuxt app, two sites:
// - User site (`/`, features/userSite): server-rendered for SEO, no login.
// - Admin panel (`/admin/**`, features/adminSite): SPA, login required, never indexed.
const adminRouteRule = {
  ssr: false,
  headers: { 'X-Robots-Tag': 'noindex, nofollow' },
};

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@pinia/nuxt', '@nuxt/eslint'],
  css: ['~/common/styles/main.css'],
  // Feature and common components are imported explicitly, not auto-registered.
  components: { dirs: [] },
  typescript: { strict: true },
  tailwindcss: { cssPath: false, configPath: 'tailwind.config.ts' },
  // FastAPI already resizes uploads to WebP and returns full URLs: serve them as-is.
  image: { provider: 'none' },
  runtimeConfig: {
    public: {
      apiBaseUrl: '', // set with NUXT_PUBLIC_API_BASE_URL
      siteUrl: '', // public site origin for canonical/OG URLs, set with NUXT_PUBLIC_SITE_URL
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Sreebhavan',
      link: [{ key: 'favicon', rel: 'icon', href: '/favicon.ico' }],
    },
  },
  routeRules: {
    '/admin': adminRouteRule,
    '/admin/**': adminRouteRule,
    // "Banners" were renamed to "Special offers".
    '/admin/banners': { redirect: '/admin/special-offers' },
  },
});
