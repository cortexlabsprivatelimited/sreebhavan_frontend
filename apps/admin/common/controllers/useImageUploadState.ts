import type { StorageFolder } from '~/common/constants/imageConstants';
import { AppConfig } from '~/common/constants/appConfig';
import { useUploadService } from '~/common/services/uploadService';
import { useToastStore } from '~/common/stores/toast';
import type { UploadedFile } from '~/common/types/upload';
import { getErrorMessage } from '~/common/utils/getErrorMessage';
import { validateUploadFile } from '~/common/utils/validators';

/**
 * Upload state for image fields. Controllers call uploadImage(file) when AppImageField
 * emits select-file, then store the returned URL in their form.
 */
export const useImageUploadState = (
  folder: StorageFolder,
  allowedTypes: readonly string[] = AppConfig.allowedImageTypes,
) => {
  const uploadService = useUploadService();
  const toast = useToastStore();
  const isUploading = ref(false);

  const uploadImage = async (file: File): Promise<UploadedFile | null> => {
    const validationError = validateUploadFile(file, allowedTypes);
    if (validationError) {
      toast.showError(validationError);
      return null;
    }

    isUploading.value = true;
    try {
      return await uploadService.uploadFile(file, folder);
    } catch (uploadError) {
      toast.showError(getErrorMessage(uploadError));
      return null;
    } finally {
      isUploading.value = false;
    }
  };

  return { isUploading, uploadImage };
};
