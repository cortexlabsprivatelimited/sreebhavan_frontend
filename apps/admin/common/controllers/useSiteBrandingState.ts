import { storeToRefs } from 'pinia';
import { useSiteBrandingService } from '~/common/services/siteBrandingService';
import { useSiteBrandingStore } from '~/common/stores/siteBranding';

/**
 * Brand logo and favicon for the admin panel. Loaded once per visit; Site settings updates the store when
 * it saves, so a new logo or favicon shows straight away. Sets the browser tab icon.
 * If loading fails, the lotus icon and the default favicon stay.
 */
export const useSiteBrandingState = () => {
  const siteBrandingStore = useSiteBrandingStore();
  const siteBrandingService = useSiteBrandingService();
  const { logoUrl, faviconUrl } = storeToRefs(siteBrandingStore);

  onMounted(async () => {
    if (siteBrandingStore.isLoaded) return;
    try {
      siteBrandingStore.setBranding(await siteBrandingService.getBranding());
    } catch {
      // Keep the defaults.
    }
  });

  // Same key as the default icon in nuxt.config.ts, so this one replaces it.
  useHead({
    link: () => (faviconUrl.value ? [{ key: 'favicon', rel: 'icon', href: faviconUrl.value }] : []),
  });

  return { logoUrl, faviconUrl };
};
