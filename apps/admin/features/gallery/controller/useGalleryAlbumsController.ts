import { StorageFolders } from '~/common/constants/imageConstants';
import { useAutoSlug } from '~/common/controllers/useAutoSlug';
import { useCrudListState } from '~/common/controllers/useCrudListState';
import { useImageUploadState } from '~/common/controllers/useImageUploadState';
import { useGalleryAlbumsRepository, validateGalleryAlbumForm } from '../domain/gallery.repository';
import { createEmptyGalleryAlbumForm, toGalleryAlbumForm } from '../model/gallery.model';

export const useGalleryAlbumsController = () => {
  const crud = useCrudListState({
    key: 'admin-gallery-albums',
    repository: useGalleryAlbumsRepository(),
    createEmptyForm: createEmptyGalleryAlbumForm,
    toForm: toGalleryAlbumForm,
    validateForm: validateGalleryAlbumForm,
  });
  useAutoSlug(crud.form, crud.isEditing, 'title');
  const { isUploading, uploadImage } = useImageUploadState(StorageFolders.gallery);

  const uploadCoverImage = async (file: File) => {
    const uploadedFile = await uploadImage(file);
    if (uploadedFile) crud.form.value.coverUrl = uploadedFile.url;
  };

  return { ...crud, isUploading, uploadCoverImage };
};
