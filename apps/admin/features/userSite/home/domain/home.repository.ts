import { ApiConstants } from '~/common/constants/apiConstants';
import { AppConfig } from '~/common/constants/appConfig';
import { buildEnquiryLink, SiteRoutes } from '~/common/constants/userSiteNavigation';
import { useApiClient } from '~/common/services/apiClient';
import { usePublicContentService } from '~/common/services/publicContentService';
import {
  mapHomeSpecialDish,
  type HomeContent,
  type HomeSpecialDishApiResponse,
  type QuickAvailabilityForm,
} from '../model/home.model';

/** Everything the home page shows, loaded in parallel. */
export const useHomeRepository = () => {
  const apiClient = useApiClient();
  const publicContentService = usePublicContentService();

  const getSpecials = async () => {
    const response = await apiClient.get<HomeSpecialDishApiResponse[]>(
      ApiConstants.public.menuItems,
      { special: true },
    );
    return [...response]
      .sort((first, second) => first.sort - second.sort)
      .slice(0, AppConfig.homeSpecialsCount)
      .map(mapHomeSpecialDish);
  };

  const getHomeContent = async (): Promise<HomeContent> => {
    const [specials, testimonials, rooms] = await Promise.all([
      getSpecials(),
      publicContentService.getTestimonials(),
      publicContentService.getRooms().catch(() => []),
    ]);
    return {
      specials,
      testimonials: testimonials.slice(0, AppConfig.homeTestimonialCount),
      roomCount: rooms.length,
    };
  };

  return { getHomeContent };
};

/** Where the quick availability bar sends the guest: hall calendar, or the enquiry form. */
export const buildQuickAvailabilityLink = (form: QuickAvailabilityForm): string => {
  if (form.experience === 'hall') {
    return form.date
      ? `${SiteRoutes.hallAvailability}?date=${form.date}`
      : SiteRoutes.hallAvailability;
  }
  return buildEnquiryLink({
    type: form.experience,
    date: form.date || undefined,
    guests: form.guests ? String(form.guests) : undefined,
  });
};
