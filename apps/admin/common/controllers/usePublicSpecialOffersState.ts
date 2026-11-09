import type { NuxtApp } from '#app';
import { usePublicContentService } from '~/common/services/publicContentService';

const readCachedData = (key: string, nuxtApp: NuxtApp) =>
  nuxtApp.payload.data[key] ?? nuxtApp.static.data[key];

/**
 * Active special offers, shared by the header "Offers" link and the offers page.
 * Loaded once per visit; on failure the list stays empty, which hides the header link.
 */
export const usePublicSpecialOffersState = () => {
  const publicContentService = usePublicContentService();

  const {
    data: specialOffers,
    status,
    error,
    refresh: reloadSpecialOffers,
  } = useAsyncData('public-special-offers', () => publicContentService.getSpecialOffers(), {
    default: () => [],
    getCachedData: readCachedData,
  });

  const isLoading = computed(() => status.value === 'pending');
  const hasError = computed(() => Boolean(error.value));

  return { specialOffers, isLoading, hasError, reloadSpecialOffers };
};
