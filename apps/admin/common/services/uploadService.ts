import { ApiConstants } from '~/common/constants/apiConstants';
import type { StorageFolder } from '~/common/constants/imageConstants';
import { useApiClient } from '~/common/services/apiClient';
import type { UploadedFile, UploadedFileApiResponse } from '~/common/types/upload';

/**
 * Uploads a file through FastAPI (resize → WebP → Supabase Storage) and returns its public URL.
 * Used by every feature that has an image or file field.
 */
export const useUploadService = () => {
  const apiClient = useApiClient();

  const uploadFile = async (file: File, folder: StorageFolder): Promise<UploadedFile> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    const response = await apiClient.post<UploadedFileApiResponse>(
      ApiConstants.admin.uploads,
      formData,
    );
    return { url: response.url, thumbUrl: response.thumb_url };
  };

  return { uploadFile };
};
