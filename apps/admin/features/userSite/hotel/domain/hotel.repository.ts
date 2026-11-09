import { ApiConstants } from '~/common/constants/apiConstants';
import { AppConfig } from '~/common/constants/appConfig';
import { useApiClient } from '~/common/services/apiClient';
import { usePublicContentService } from '~/common/services/publicContentService';
import {
  mapHotelMenuCard,
  type HotelContent,
  type HotelMenuCardApiResponse,
} from '../model/hotel.model';

export const useHotelRepository = () => {
  const apiClient = useApiClient();
  const publicContentService = usePublicContentService();
  const hotelSlug = AppConfig.businessSlugs.hotel;

  const getMenuCards = async () =>
    (await apiClient.get<HotelMenuCardApiResponse[]>(ApiConstants.public.menuCards)).map(
      mapHotelMenuCard,
    );

  const getHotelContent = async (): Promise<HotelContent> => {
    const [business, specialOffers, testimonials, menuCards] = await Promise.all([
      publicContentService.getBusiness(hotelSlug),
      publicContentService.getSpecialOffers(hotelSlug),
      publicContentService.getTestimonials(hotelSlug),
      getMenuCards(),
    ]);
    return { business, specialOffers, testimonials, menuCards };
  };

  return { getHotelContent };
};
