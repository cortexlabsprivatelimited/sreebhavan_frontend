import { StorageFolders } from '~/common/constants/imageConstants';
import { usePhotoManagerState } from '~/common/controllers/usePhotoManagerState';
import { useEventHallRepository } from '../domain/eventHall.repository';

export const useHallPhotosController = () => {
  const eventHallRepository = useEventHallRepository();

  const {
    data: photos,
    status,
    error,
    refresh: reloadPhotos,
  } = useAsyncData('admin-hall-photos', () => eventHallRepository.getHallPhotos(), {
    default: () => [],
  });

  const isLoading = computed(() => status.value === 'pending');
  const hasError = computed(() => Boolean(error.value));

  const photoManager = usePhotoManagerState(StorageFolders.hall, {
    addPhoto: (request) => eventHallRepository.addHallPhoto(request),
    removePhoto: (photo) => eventHallRepository.removeHallPhoto(photo.id),
    onPhotosChanged: () => reloadPhotos(),
  });

  const addHallPhoto = () => photoManager.addPendingPhoto(photos.value.length);

  return { photos, isLoading, hasError, reloadPhotos, ...photoManager, addHallPhoto };
};
