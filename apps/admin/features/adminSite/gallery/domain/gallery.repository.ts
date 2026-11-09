import { ApiConstants } from '~/common/constants/apiConstants';
import { AppStrings } from '~/common/constants/appStrings';
import type { CrudRepository } from '~/common/controllers/useCrudListState';
import { useApiClient } from '~/common/services/apiClient';
import type { FormErrors } from '~/common/types/form';
import { sortBySortOrder } from '~/common/utils/listHelpers';
import { isBlank, isValidSlug } from '~/common/utils/validators';
import {
  mapGalleryAlbum,
  mapGalleryImage,
  toGalleryAlbumRequest,
  toGalleryImageEditRequest,
  type CreateGalleryImagesRequest,
  type GalleryAlbum,
  type GalleryAlbumApiResponse,
  type GalleryAlbumForm,
  type GalleryImage,
  type GalleryImageApiResponse,
  type GalleryImageEditForm,
  type PendingGalleryUpload,
} from '../model/gallery.model';

export const validateGalleryAlbumForm = (form: GalleryAlbumForm): FormErrors<GalleryAlbumForm> => ({
  title: isBlank(form.title) ? AppStrings.validation.required : undefined,
  slug: isBlank(form.slug)
    ? AppStrings.validation.required
    : isValidSlug(form.slug)
      ? undefined
      : AppStrings.validation.invalidSlug,
});

/** Every queued image must be uploaded and have alt text before the batch can be saved. */
export const canSavePendingUploads = (uploads: PendingGalleryUpload[]): boolean =>
  uploads.length > 0 && uploads.every((upload) => upload.url && !isBlank(upload.alt));

export const useGalleryAlbumsRepository = () => {
  const apiClient = useApiClient();

  const crud: CrudRepository<GalleryAlbum, GalleryAlbumForm> = {
    getAll: async () =>
      sortBySortOrder(
        (await apiClient.get<GalleryAlbumApiResponse[]>(ApiConstants.admin.galleryAlbums)).map(
          mapGalleryAlbum,
        ),
      ),
    create: async (form) =>
      mapGalleryAlbum(
        await apiClient.post<GalleryAlbumApiResponse>(
          ApiConstants.admin.galleryAlbums,
          toGalleryAlbumRequest(form),
        ),
      ),
    update: async (id, form) =>
      mapGalleryAlbum(
        await apiClient.patch<GalleryAlbumApiResponse>(
          ApiConstants.admin.galleryAlbumById(id),
          toGalleryAlbumRequest(form),
        ),
      ),
    remove: async (id) => {
      await apiClient.remove(ApiConstants.admin.galleryAlbumById(id));
    },
  };

  const getAlbum = async (id: string): Promise<GalleryAlbum> =>
    mapGalleryAlbum(
      await apiClient.get<GalleryAlbumApiResponse>(ApiConstants.admin.galleryAlbumById(id)),
    );

  const setAlbumCover = async (id: string, coverUrl: string): Promise<void> => {
    await apiClient.patch(ApiConstants.admin.galleryAlbumById(id), { cover_url: coverUrl });
  };

  return { ...crud, getAlbum, setAlbumCover };
};

export const useGalleryImagesRepository = () => {
  const apiClient = useApiClient();

  const getAlbumImages = async (albumId: string): Promise<GalleryImage[]> =>
    sortBySortOrder(
      (
        await apiClient.get<GalleryImageApiResponse[]>(ApiConstants.admin.galleryImages, {
          album_id: albumId,
        })
      ).map(mapGalleryImage),
    );

  const addAlbumImages = async (
    albumId: string,
    uploads: PendingGalleryUpload[],
    firstSortOrder: number,
  ) => {
    const request: CreateGalleryImagesRequest = {
      album_id: albumId,
      images: uploads.map((upload, index) => ({
        url: upload.url ?? '',
        thumb_url: upload.thumbUrl,
        alt: upload.alt.trim(),
        caption: upload.caption.trim() || null,
        sort: firstSortOrder + index,
      })),
    };
    await apiClient.post(ApiConstants.admin.galleryImages, request);
  };

  const updateImage = async (id: string, form: GalleryImageEditForm): Promise<void> => {
    await apiClient.patch(ApiConstants.admin.galleryImageById(id), toGalleryImageEditRequest(form));
  };

  const removeImage = async (id: string): Promise<void> => {
    await apiClient.remove(ApiConstants.admin.galleryImageById(id));
  };

  return { getAlbumImages, addAlbumImages, updateImage, removeImage };
};
