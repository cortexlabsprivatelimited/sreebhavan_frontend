import { AppStrings } from '~/common/constants/appStrings';
import { StorageFolders } from '~/common/constants/imageConstants';
import { useImageUploadState } from '~/common/controllers/useImageUploadState';
import { useToastStore } from '~/common/stores/toast';
import { getErrorMessage } from '~/common/utils/getErrorMessage';
import { isBlank } from '~/common/utils/validators';
import {
  canSavePendingUploads,
  useGalleryAlbumsRepository,
  useGalleryImagesRepository,
} from '../domain/gallery.repository';
import type {
  GalleryImage,
  GalleryImageEditForm,
  PendingGalleryUpload,
} from '../model/gallery.model';

export const useGalleryAlbumPhotosController = (albumId: string) => {
  const albumsRepository = useGalleryAlbumsRepository();
  const imagesRepository = useGalleryImagesRepository();
  const toast = useToastStore();
  const { uploadImage } = useImageUploadState(StorageFolders.gallery);

  const { data: album, refresh: reloadAlbum } = useAsyncData(`admin-gallery-album-${albumId}`, () =>
    albumsRepository.getAlbum(albumId),
  );
  const {
    data: images,
    status,
    error,
    refresh: reloadImages,
  } = useAsyncData(
    `admin-gallery-images-${albumId}`,
    () => imagesRepository.getAlbumImages(albumId),
    {
      default: () => [],
    },
  );

  const isLoading = computed(() => status.value === 'pending');
  const hasError = computed(() => Boolean(error.value));
  const isEmpty = computed(() => !isLoading.value && !hasError.value && images.value.length === 0);

  // Bulk upload queue
  const pendingUploads = ref<PendingGalleryUpload[]>([]);
  const isSavingUploads = ref(false);
  const canSaveUploads = computed(() => canSavePendingUploads(pendingUploads.value));
  const hasMissingAlt = computed(() =>
    pendingUploads.value.some((upload) => upload.url && isBlank(upload.alt)),
  );

  const queueFiles = async (files: File[]) => {
    const newUploads = files.map<PendingGalleryUpload>((file, index) => ({
      key: `${Date.now()}-${index}-${file.name}`,
      fileName: file.name,
      url: null,
      thumbUrl: null,
      alt: '',
      caption: '',
      isUploading: true,
      errorMessage: null,
    }));
    pendingUploads.value.push(...newUploads);

    // One at a time keeps the API and slow mobile connections happy.
    for (const [index, file] of files.entries()) {
      const upload = pendingUploads.value.find((pending) => pending.key === newUploads[index]?.key);
      if (!upload) continue;
      const uploadedFile = await uploadImage(file);
      upload.isUploading = false;
      if (uploadedFile) {
        upload.url = uploadedFile.url;
        upload.thumbUrl = uploadedFile.thumbUrl;
      } else {
        upload.errorMessage = 'Upload failed. Remove it and try again.';
      }
    }
  };

  const removePendingUpload = (key: string) => {
    pendingUploads.value = pendingUploads.value.filter((upload) => upload.key !== key);
  };

  const savePendingUploads = async () => {
    if (!canSaveUploads.value) return;
    isSavingUploads.value = true;
    try {
      await imagesRepository.addAlbumImages(albumId, pendingUploads.value, images.value.length);
      pendingUploads.value = [];
      toast.showSuccess(AppStrings.states.saved);
      await Promise.all([reloadImages(), reloadAlbum()]);
    } catch (saveError) {
      toast.showError(getErrorMessage(saveError));
    } finally {
      isSavingUploads.value = false;
    }
  };

  // Edit / delete / cover
  const editingImage = ref<GalleryImage | null>(null);
  const editForm = ref<GalleryImageEditForm>({ alt: '', caption: '', sortOrder: 0 });
  const editAltError = ref<string | undefined>(undefined);
  const isSavingEdit = ref(false);

  const openImageEditor = (image: GalleryImage) => {
    editingImage.value = image;
    editForm.value = { alt: image.alt, caption: image.caption, sortOrder: image.sortOrder };
    editAltError.value = undefined;
  };

  const closeImageEditor = () => {
    editingImage.value = null;
  };

  const saveImageEdit = async () => {
    if (!editingImage.value) return;
    editAltError.value = isBlank(editForm.value.alt)
      ? AppStrings.validation.altRequired
      : undefined;
    if (editAltError.value) return;
    isSavingEdit.value = true;
    try {
      await imagesRepository.updateImage(editingImage.value.id, editForm.value);
      editingImage.value = null;
      toast.showSuccess(AppStrings.states.saved);
      await reloadImages();
    } catch (saveError) {
      toast.showError(getErrorMessage(saveError));
    } finally {
      isSavingEdit.value = false;
    }
  };

  const imagePendingDelete = ref<GalleryImage | null>(null);
  const isDeleting = ref(false);
  const requestDeleteImage = (image: GalleryImage) => {
    imagePendingDelete.value = image;
  };
  const cancelDeleteImage = () => {
    imagePendingDelete.value = null;
  };
  const confirmDeleteImage = async () => {
    if (!imagePendingDelete.value) return;
    isDeleting.value = true;
    try {
      await imagesRepository.removeImage(imagePendingDelete.value.id);
      imagePendingDelete.value = null;
      toast.showSuccess(AppStrings.states.deleted);
      await Promise.all([reloadImages(), reloadAlbum()]);
    } catch (deleteError) {
      toast.showError(getErrorMessage(deleteError));
    } finally {
      isDeleting.value = false;
    }
  };

  const setAsCover = async (image: GalleryImage) => {
    try {
      await albumsRepository.setAlbumCover(albumId, image.url);
      toast.showSuccess('Album cover updated.');
      await reloadAlbum();
    } catch (coverError) {
      toast.showError(getErrorMessage(coverError));
    }
  };

  return {
    album,
    images,
    isLoading,
    hasError,
    isEmpty,
    reloadImages,
    pendingUploads,
    isSavingUploads,
    canSaveUploads,
    hasMissingAlt,
    queueFiles,
    removePendingUpload,
    savePendingUploads,
    editingImage,
    editForm,
    editAltError,
    isSavingEdit,
    openImageEditor,
    closeImageEditor,
    saveImageEdit,
    imagePendingDelete,
    isDeleting,
    requestDeleteImage,
    cancelDeleteImage,
    confirmDeleteImage,
    setAsCover,
  };
};
