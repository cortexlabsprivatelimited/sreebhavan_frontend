import type { NuxtApp } from '#app';
import { AppConfig } from '~/common/constants/appConfig';
import { usePublicContentService } from '~/common/services/publicContentService';
import { createEmptySiteSettings } from '~/common/types/userSite';
import { buildWhatsAppUrl } from '~/common/utils/buildWhatsAppUrl';

/** Reuse data already loaded on this visit instead of fetching it again on every page. */
const readCachedData = (key: string, nuxtApp: NuxtApp) =>
  nuxtApp.payload.data[key] ?? nuxtApp.static.data[key];

/**
 * Site settings and both businesses, shared by the user site layout and several screens.
 * Loaded once per visit (server-rendered on the first page). Failures leave empty values,
 * so the page still renders without contact details.
 */
export const usePublicSiteState = () => {
  const publicContentService = usePublicContentService();

  const {
    data: settings,
    status: settingsStatus,
    error: settingsError,
    refresh: reloadSettings,
  } = useAsyncData('public-site-settings', () => publicContentService.getSettings(), {
    default: createEmptySiteSettings,
    getCachedData: readCachedData,
  });

  const {
    data: hotel,
    status: hotelStatus,
    refresh: reloadHotel,
  } = useAsyncData(
    'public-business-hotel',
    () => publicContentService.getBusiness(AppConfig.businessSlugs.hotel),
    { default: () => null, getCachedData: readCachedData },
  );

  const {
    data: hallAndRooms,
    status: hallAndRoomsStatus,
    refresh: reloadHallAndRooms,
  } = useAsyncData(
    'public-business-hall-and-rooms',
    () => publicContentService.getBusiness(AppConfig.businessSlugs.hallAndRooms),
    { default: () => null, getCachedData: readCachedData },
  );

  const hotelWhatsAppUrl = computed(() =>
    hotel.value ? buildWhatsAppUrl(hotel.value.whatsApp) : null,
  );
  const hallAndRoomsWhatsAppUrl = computed(() =>
    hallAndRooms.value ? buildWhatsAppUrl(hallAndRooms.value.whatsApp) : null,
  );
  /** Phone shown in the header and footer: site contact phone, else the hotel's phone. */
  const primaryPhone = computed(
    () => settings.value.contactPhone ?? hotel.value?.phone ?? hallAndRooms.value?.phone ?? null,
  );

  const isLoading = computed(() =>
    [settingsStatus.value, hotelStatus.value, hallAndRoomsStatus.value].includes('pending'),
  );
  /** Settings failed and neither business loaded: there is nothing to show. */
  const hasError = computed(
    () => Boolean(settingsError.value) && !hotel.value && !hallAndRooms.value,
  );
  const reloadSiteState = () =>
    Promise.all([reloadSettings(), reloadHotel(), reloadHallAndRooms()]);

  return {
    settings,
    hotel,
    hallAndRooms,
    hotelWhatsAppUrl,
    hallAndRoomsWhatsAppUrl,
    primaryPhone,
    isLoading,
    hasError,
    reloadSiteState,
  };
};
