import { usePublicSiteState } from '~/common/controllers/usePublicSiteState';
import type { PublicBusiness } from '~/common/types/userSite';

/** About page: static story plus each business's own "about" text from the admin panel. */
export const useAboutController = () => {
  const { hotel, hallAndRooms } = usePublicSiteState();

  const businesses = computed(() =>
    [hotel.value, hallAndRooms.value].filter((business): business is PublicBusiness =>
      Boolean(business?.about),
    ),
  );

  return { businesses };
};
