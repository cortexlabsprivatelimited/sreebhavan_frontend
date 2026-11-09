import { defineStore } from 'pinia';
import type { SiteBranding } from '~/common/types/siteBranding';

/** Brand logo and favicon, shared by the admin layouts, the login screen and Site settings. */
export const useSiteBrandingStore = defineStore('siteBranding', () => {
  const logoUrl = ref<string | null>(null);
  const faviconUrl = ref<string | null>(null);
  const isLoaded = ref(false);

  const setBranding = (branding: SiteBranding) => {
    logoUrl.value = branding.logoUrl;
    faviconUrl.value = branding.faviconUrl;
    isLoaded.value = true;
  };

  return { logoUrl, faviconUrl, isLoaded, setBranding };
});
