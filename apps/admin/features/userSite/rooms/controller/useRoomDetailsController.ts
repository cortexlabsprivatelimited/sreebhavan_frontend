import { buildEnquiryLink } from '~/common/constants/userSiteNavigation';
import { usePublicSiteState } from '~/common/controllers/usePublicSiteState';
import { buildWhatsAppUrl } from '~/common/utils/buildWhatsAppUrl';
import { getErrorStatus } from '~/common/utils/getErrorMessage';
import { useRoomsRepository } from '../domain/rooms.repository';
import { buildRoomWhatsAppMessage } from '../model/rooms.model';

/** Cache key of a room, also read by the page file for SEO fallbacks. */
export const roomDetailsKey = (slug: string) => `room-details-${slug}`;

/**
 * One room. Awaited by the screen so an unknown slug becomes a real 404 page (also for Google).
 */
export const useRoomDetailsController = async (slug: string) => {
  const roomsRepository = useRoomsRepository();
  const { hallAndRooms } = usePublicSiteState();

  const {
    data: room,
    status,
    error,
    refresh: reloadRoom,
  } = await useAsyncData(roomDetailsKey(slug), () => roomsRepository.getRoomBySlug(slug), {
    default: () => null,
  });

  if (getErrorStatus(error.value) === 404) {
    throw createError({ statusCode: 404, statusMessage: 'Room not found', fatal: true });
  }

  const selectedImageIndex = ref(0);
  const selectedImage = computed(() => room.value?.images[selectedImageIndex.value] ?? null);

  const enquiryLink = buildEnquiryLink({ type: 'room', room: slug });
  const whatsAppUrl = computed(() =>
    hallAndRooms.value && room.value
      ? buildWhatsAppUrl(hallAndRooms.value.whatsApp, buildRoomWhatsAppMessage(room.value.name))
      : null,
  );

  const isLoading = computed(() => status.value === 'pending');
  const hasError = computed(() => Boolean(error.value));

  return {
    room,
    selectedImage,
    selectedImageIndex,
    enquiryLink,
    whatsAppUrl,
    isLoading,
    hasError,
    reloadRoom,
  };
};
