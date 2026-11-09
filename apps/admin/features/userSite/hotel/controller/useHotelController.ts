import { buildWhatsAppUrl } from '~/common/utils/buildWhatsAppUrl';
import { useHotelRepository } from '../domain/hotel.repository';
import { createEmptyHotelContent } from '../model/hotel.model';

export const useHotelController = () => {
  const hotelRepository = useHotelRepository();

  const {
    data: hotelContent,
    status,
    error,
    refresh: reloadHotelContent,
  } = useAsyncData('hotel-content', () => hotelRepository.getHotelContent(), {
    default: createEmptyHotelContent,
  });

  const isLoading = computed(() => status.value === 'pending');
  const hasError = computed(() => Boolean(error.value));
  const heroOffer = computed(() => hotelContent.value.specialOffers[0] ?? null);
  const whatsAppUrl = computed(() =>
    hotelContent.value.business
      ? buildWhatsAppUrl(
          hotelContent.value.business.whatsApp,
          'Hi Sreebhavan Veg Hotel, I have a question.',
        )
      : null,
  );

  return { hotelContent, heroOffer, whatsAppUrl, isLoading, hasError, reloadHotelContent };
};
