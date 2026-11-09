import { ApiConstants } from '~/common/constants/apiConstants';
import { useApiClient } from '~/common/services/apiClient';
import {
  mapGalleryAlbumDetails,
  mapGalleryAlbums,
  type GalleryAlbumApiResponse,
  type GalleryAlbumDetailsApiResponse,
} from '../model/gallery.model';

export const useGalleryRepository = () => {
  const apiClient = useApiClient();

  const getAlbums = async () =>
    mapGalleryAlbums(
      await apiClient.get<GalleryAlbumApiResponse[]>(ApiConstants.public.galleryAlbums),
    );

  const getAlbumBySlug = async (slug: string) =>
    mapGalleryAlbumDetails(
      await apiClient.get<GalleryAlbumDetailsApiResponse>(
        ApiConstants.public.galleryAlbumBySlug(slug),
      ),
    );

  return { getAlbums, getAlbumBySlug };
};
