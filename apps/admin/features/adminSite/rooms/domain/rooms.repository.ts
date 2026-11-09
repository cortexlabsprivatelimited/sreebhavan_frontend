import { ApiConstants } from '~/common/constants/apiConstants';
import { AppStrings } from '~/common/constants/appStrings';
import type { CrudRepository } from '~/common/controllers/useCrudListState';
import { useApiClient } from '~/common/services/apiClient';
import type { FormErrors } from '~/common/types/form';
import type { CreatePhotoRequest } from '~/common/types/photo';
import { isBlank, isValidSlug } from '~/common/utils/validators';
import {
  mapRoom,
  toRoomRequest,
  type Room,
  type RoomApiResponse,
  type RoomForm,
} from '../model/rooms.model';

export const validateRoomForm = (form: RoomForm): FormErrors<RoomForm> => ({
  name: isBlank(form.name) ? AppStrings.validation.required : undefined,
  slug: isBlank(form.slug)
    ? AppStrings.validation.required
    : isValidSlug(form.slug)
      ? undefined
      : AppStrings.validation.invalidSlug,
  pricePerNight:
    form.pricePerNight === null || form.pricePerNight <= 0
      ? 'Enter the price per night.'
      : undefined,
  capacity: form.capacity === null || form.capacity < 1 ? 'Enter how many guests fit.' : undefined,
  photos: form.photos.some((photo) => isBlank(photo.alt))
    ? AppStrings.validation.altRequired
    : undefined,
});

export const useRoomsRepository = () => {
  const apiClient = useApiClient();

  const crud: CrudRepository<Room, RoomForm> = {
    getAll: async () =>
      (await apiClient.get<RoomApiResponse[]>(ApiConstants.admin.rooms)).map(mapRoom),
    create: async (form) =>
      mapRoom(await apiClient.post<RoomApiResponse>(ApiConstants.admin.rooms, toRoomRequest(form))),
    update: async (id, form) =>
      mapRoom(
        await apiClient.patch<RoomApiResponse>(
          ApiConstants.admin.roomById(id),
          toRoomRequest(form),
        ),
      ),
    remove: async (id) => {
      await apiClient.remove(ApiConstants.admin.roomById(id));
    },
  };

  const addRoomImage = async (roomId: string, request: CreatePhotoRequest): Promise<void> => {
    await apiClient.post(ApiConstants.admin.roomImages(roomId), request);
  };

  const removeRoomImage = async (roomId: string, imageId: string): Promise<void> => {
    await apiClient.remove(ApiConstants.admin.roomImageById(roomId, imageId));
  };

  /**
   * Applies the photo changes made in the room form: deletes removed photos, then adds new ones
   * after the existing ones. Returns how many changes failed.
   */
  const syncRoomPhotos = async (roomId: string, form: RoomForm): Promise<number> => {
    const keptPhotoCount = form.photos.filter((photo) => photo.id !== null).length;
    const newPhotos = form.photos.filter((photo) => photo.id === null);
    const results = await Promise.allSettled([
      ...form.removedPhotoIds.map((imageId) => removeRoomImage(roomId, imageId)),
      ...newPhotos.map((photo, index) =>
        addRoomImage(roomId, {
          url: photo.url,
          alt: photo.alt.trim(),
          sort: keptPhotoCount + index,
        }),
      ),
    ]);
    return results.filter((result) => result.status === 'rejected').length;
  };

  return { ...crud, syncRoomPhotos };
};
