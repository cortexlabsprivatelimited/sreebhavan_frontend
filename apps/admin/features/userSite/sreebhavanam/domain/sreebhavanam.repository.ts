import { ApiConstants } from '~/common/constants/apiConstants';
import { AppConfig } from '~/common/constants/appConfig';
import { useApiClient } from '~/common/services/apiClient';
import { usePublicContentService } from '~/common/services/publicContentService';
import { getErrorStatus } from '~/common/utils/getErrorMessage';
import {
  mapSreebhavanamHallSummary,
  type SreebhavanamContent,
  type SreebhavanamHallApiResponse,
} from '../model/sreebhavanam.model';

export const useSreebhavanamRepository = () => {
  const apiClient = useApiClient();
  const publicContentService = usePublicContentService();
  const businessSlug = AppConfig.businessSlugs.hallAndRooms;

  /** null until the admin sets the hall up (the API returns 404). */
  const getHallSummary = async () => {
    try {
      return mapSreebhavanamHallSummary(
        await apiClient.get<SreebhavanamHallApiResponse>(ApiConstants.public.hall),
      );
    } catch (error) {
      if (getErrorStatus(error) === 404) return null;
      throw error;
    }
  };

  const getSreebhavanamContent = async (): Promise<SreebhavanamContent> => {
    const [business, specialOffers, rooms, hall, testimonials] = await Promise.all([
      publicContentService.getBusiness(businessSlug),
      publicContentService.getSpecialOffers(businessSlug),
      publicContentService.getRooms(),
      getHallSummary(),
      publicContentService.getTestimonials(businessSlug),
    ]);
    return {
      business,
      specialOffers,
      rooms: rooms.slice(0, 3),
      hall,
      testimonials: testimonials.slice(0, 3),
    };
  };

  return { getSreebhavanamContent };
};
