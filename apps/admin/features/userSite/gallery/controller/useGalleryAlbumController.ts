import { getErrorStatus } from '~/common/utils/getErrorMessage';
import { useGalleryRepository } from '../domain/gallery.repository';

/** Cache key of an album, also read by the page file for SEO fallbacks. */
export const galleryAlbumKey = (slug: string) => `gallery-album-${slug}`;

/** One album with a lightbox. Awaited so an unknown slug renders a real 404. */
export const useGalleryAlbumController = async (slug: string) => {
  const galleryRepository = useGalleryRepository();

  const {
    data: album,
    status,
    error,
    refresh: reloadAlbum,
  } = await useAsyncData(galleryAlbumKey(slug), () => galleryRepository.getAlbumBySlug(slug), {
    default: () => null,
  });

  if (getErrorStatus(error.value) === 404) {
    throw createError({ statusCode: 404, statusMessage: 'Album not found', fatal: true });
  }

  const openPhotoIndex = ref<number | null>(null);
  const photoCount = computed(() => album.value?.photos.length ?? 0);
  const openPhoto = computed(() =>
    openPhotoIndex.value === null ? null : (album.value?.photos[openPhotoIndex.value] ?? null),
  );

  const openLightbox = (index: number) => {
    openPhotoIndex.value = index;
  };
  const closeLightbox = () => {
    openPhotoIndex.value = null;
  };
  const showAdjacentPhoto = (offset: number) => {
    if (openPhotoIndex.value === null || photoCount.value === 0) return;
    openPhotoIndex.value = (openPhotoIndex.value + offset + photoCount.value) % photoCount.value;
  };

  const isLoading = computed(() => status.value === 'pending');
  const hasError = computed(() => Boolean(error.value));
  const isEmpty = computed(() => !isLoading.value && !hasError.value && photoCount.value === 0);

  return {
    album,
    openPhoto,
    openPhotoIndex,
    photoCount,
    openLightbox,
    closeLightbox,
    showAdjacentPhoto,
    isLoading,
    hasError,
    isEmpty,
    reloadAlbum,
  };
};
