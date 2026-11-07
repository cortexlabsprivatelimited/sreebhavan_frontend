import type { StorageFolder } from '~/common/constants/imageConstants';
import { AppStrings } from '~/common/constants/appStrings';
import { useImageUploadState } from '~/common/controllers/useImageUploadState';
import { useToastStore } from '~/common/stores/toast';
import type { CreatePhotoRequest, Photo } from '~/common/types/photo';
import { getErrorMessage } from '~/common/utils/getErrorMessage';
import { isBlank } from '~/common/utils/validators';

interface PhotoManagerActions {
  addPhoto: (request: CreatePhotoRequest) => Promise<void>;
  removePhoto: (photo: Photo) => Promise<void>;
  /** Called after a photo is added or removed so the screen can reload. */
  onPhotosChanged: () => Promise<void>;
}

/** Upload → type alt text → add. Alt text is required before a photo is saved. */
export const usePhotoManagerState = (folder: StorageFolder, actions: PhotoManagerActions) => {
  const toast = useToastStore();
  const { isUploading, uploadImage } = useImageUploadState(folder);

  const pendingPhotoUrl = ref<string | null>(null);
  const pendingPhotoAlt = ref('');
  const pendingAltError = ref<string | undefined>(undefined);
  const isAddingPhoto = ref(false);
  const deletingPhotoId = ref<string | null>(null);

  const resetPendingPhoto = () => {
    pendingPhotoUrl.value = null;
    pendingPhotoAlt.value = '';
    pendingAltError.value = undefined;
  };

  const uploadPendingPhoto = async (file: File) => {
    const uploadedFile = await uploadImage(file);
    if (uploadedFile) pendingPhotoUrl.value = uploadedFile.url;
  };

  const addPendingPhoto = async (nextSortOrder: number) => {
    if (!pendingPhotoUrl.value) return;
    pendingAltError.value = isBlank(pendingPhotoAlt.value)
      ? AppStrings.validation.altRequired
      : undefined;
    if (pendingAltError.value) return;

    isAddingPhoto.value = true;
    try {
      await actions.addPhoto({
        url: pendingPhotoUrl.value,
        alt: pendingPhotoAlt.value.trim(),
        sort: nextSortOrder,
      });
      resetPendingPhoto();
      toast.showSuccess(AppStrings.states.saved);
      await actions.onPhotosChanged();
    } catch (addError) {
      toast.showError(getErrorMessage(addError));
    } finally {
      isAddingPhoto.value = false;
    }
  };

  const deletePhoto = async (photo: Photo) => {
    deletingPhotoId.value = photo.id;
    try {
      await actions.removePhoto(photo);
      toast.showSuccess(AppStrings.states.deleted);
      await actions.onPhotosChanged();
    } catch (deleteError) {
      toast.showError(getErrorMessage(deleteError));
    } finally {
      deletingPhotoId.value = null;
    }
  };

  return {
    isUploading,
    pendingPhotoUrl,
    pendingPhotoAlt,
    pendingAltError,
    isAddingPhoto,
    deletingPhotoId,
    resetPendingPhoto,
    uploadPendingPhoto,
    addPendingPhoto,
    deletePhoto,
  };
};
