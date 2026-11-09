import { useRoomsRepository } from '../domain/rooms.repository';

/** Rooms list state. useAsyncData runs on the server for SSR. */
export const useRoomsController = () => {
  const roomsRepository = useRoomsRepository();

  const {
    data: rooms,
    status,
    error,
    refresh: reloadRooms,
  } = useAsyncData('rooms-list', () => roomsRepository.getRooms(), { default: () => [] });

  const isLoading = computed(() => status.value === 'pending');
  const hasError = computed(() => Boolean(error.value));
  const isEmpty = computed(() => !isLoading.value && !hasError.value && rooms.value.length === 0);

  return { rooms, isLoading, hasError, isEmpty, reloadRooms };
};
