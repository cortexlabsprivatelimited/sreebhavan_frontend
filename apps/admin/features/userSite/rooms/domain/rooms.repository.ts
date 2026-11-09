import { ApiConstants } from '~/common/constants/apiConstants';
import { useApiClient } from '~/common/services/apiClient';
import { mapPublicRoom, type PublicRoomApiResponse } from '~/common/types/userSite';
import type { Room } from '../model/rooms.model';

/** The only place in the rooms feature that talks to the API. */
export const useRoomsRepository = () => {
  const apiClient = useApiClient();

  const getRooms = async (): Promise<Room[]> =>
    (await apiClient.get<PublicRoomApiResponse[]>(ApiConstants.public.rooms)).map(mapPublicRoom);

  const getRoomBySlug = async (slug: string): Promise<Room> =>
    mapPublicRoom(await apiClient.get<PublicRoomApiResponse>(ApiConstants.public.roomBySlug(slug)));

  return { getRooms, getRoomBySlug };
};
