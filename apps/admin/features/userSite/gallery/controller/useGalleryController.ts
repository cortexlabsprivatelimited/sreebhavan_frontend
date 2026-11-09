import { useGalleryRepository } from '../domain/gallery.repository';
import { GalleryCategories, type GalleryCategory } from '../model/gallery.model';

/** Album list with a category filter. */
export const useGalleryController = () => {
  const galleryRepository = useGalleryRepository();

  const {
    data: albums,
    status,
    error,
    refresh: reloadAlbums,
  } = useAsyncData('gallery-albums', () => galleryRepository.getAlbums(), { default: () => [] });

  const selectedCategory = ref<GalleryCategory | null>(null);

  /** Only categories that have at least one album get a filter chip. */
  const availableCategories = computed(() =>
    GalleryCategories.filter((category) =>
      albums.value.some((album) => album.category === category),
    ),
  );
  const visibleAlbums = computed(() =>
    selectedCategory.value
      ? albums.value.filter((album) => album.category === selectedCategory.value)
      : albums.value,
  );

  const isLoading = computed(() => status.value === 'pending');
  const hasError = computed(() => Boolean(error.value));
  const isEmpty = computed(() => !isLoading.value && !hasError.value && albums.value.length === 0);

  return {
    visibleAlbums,
    availableCategories,
    selectedCategory,
    isLoading,
    hasError,
    isEmpty,
    reloadAlbums,
  };
};
