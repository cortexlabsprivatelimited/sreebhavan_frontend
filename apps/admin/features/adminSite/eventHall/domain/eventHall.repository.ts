import { ApiConstants } from '~/common/constants/apiConstants';
import { AppStrings } from '~/common/constants/appStrings';
import type { CrudRepository } from '~/common/controllers/useCrudListState';
import { useApiClient } from '~/common/services/apiClient';
import type { FormErrors } from '~/common/types/form';
import {
  mapPhoto,
  type CreatePhotoRequest,
  type Photo,
  type PhotoApiResponse,
} from '~/common/types/photo';
import { sortBySortOrder } from '~/common/utils/listHelpers';
import { isBlank } from '~/common/utils/validators';
import {
  mapEventHall,
  mapHallPackage,
  toEventHallRequest,
  toHallPackageRequest,
  type EventHallApiResponse,
  type EventHallDetails,
  type EventHallForm,
  type HallPackage,
  type HallPackageApiResponse,
  type HallPackageForm,
} from '../model/eventHall.model';

export const validateEventHallForm = (form: EventHallForm): FormErrors<EventHallForm> => ({
  name: isBlank(form.name) ? AppStrings.validation.required : undefined,
  seatingCapacity:
    !form.seatingCapacity || form.seatingCapacity < 1 ? 'Enter the seating capacity.' : undefined,
  floatingCapacity:
    !form.floatingCapacity || form.floatingCapacity < 1
      ? 'Enter the floating capacity.'
      : undefined,
});

export const validateHallPackageForm = (form: HallPackageForm): FormErrors<HallPackageForm> => ({
  name: isBlank(form.name) ? AppStrings.validation.required : undefined,
  price: form.price === null || form.price < 0 ? 'Enter a price of 0 or more.' : undefined,
});

export const useEventHallRepository = () => {
  const apiClient = useApiClient();

  const getHallDetails = async (): Promise<EventHallDetails> =>
    mapEventHall(await apiClient.get<EventHallApiResponse>(ApiConstants.admin.hall));

  const saveHallDetails = async (form: EventHallForm): Promise<EventHallDetails> =>
    mapEventHall(
      await apiClient.put<EventHallApiResponse>(ApiConstants.admin.hall, toEventHallRequest(form)),
    );

  const getHallPhotos = async (): Promise<Photo[]> =>
    sortBySortOrder(
      (await apiClient.get<PhotoApiResponse[]>(ApiConstants.admin.hallImages)).map(mapPhoto),
    );

  const addHallPhoto = async (request: CreatePhotoRequest): Promise<void> => {
    await apiClient.post(ApiConstants.admin.hallImages, request);
  };

  const removeHallPhoto = async (photoId: string): Promise<void> => {
    await apiClient.remove(ApiConstants.admin.hallImageById(photoId));
  };

  return { getHallDetails, saveHallDetails, getHallPhotos, addHallPhoto, removeHallPhoto };
};

export const useHallPackagesRepository = (): CrudRepository<HallPackage, HallPackageForm> => {
  const apiClient = useApiClient();
  return {
    getAll: async () =>
      sortBySortOrder(
        (await apiClient.get<HallPackageApiResponse[]>(ApiConstants.admin.hallPackages)).map(
          mapHallPackage,
        ),
      ),
    create: async (form) =>
      mapHallPackage(
        await apiClient.post<HallPackageApiResponse>(
          ApiConstants.admin.hallPackages,
          toHallPackageRequest(form),
        ),
      ),
    update: async (id, form) =>
      mapHallPackage(
        await apiClient.patch<HallPackageApiResponse>(
          ApiConstants.admin.hallPackageById(id),
          toHallPackageRequest(form),
        ),
      ),
    remove: async (id) => {
      await apiClient.remove(ApiConstants.admin.hallPackageById(id));
    },
  };
};
