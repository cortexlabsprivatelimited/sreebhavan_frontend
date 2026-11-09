import { StorageFolders } from '~/common/constants/imageConstants';
import { useAutoSlug } from '~/common/controllers/useAutoSlug';
import { useCrudListState } from '~/common/controllers/useCrudListState';
import { useImageUploadState } from '~/common/controllers/useImageUploadState';
import { useMenuCategoriesRepository, validateMenuCategoryForm } from '../domain/menu.repository';
import { createEmptyMenuCategoryForm, toMenuCategoryForm } from '../model/menu.model';

export const useMenuCategoriesController = () => {
  const crud = useCrudListState({
    key: 'admin-menu-categories',
    repository: useMenuCategoriesRepository(),
    createEmptyForm: createEmptyMenuCategoryForm,
    toForm: toMenuCategoryForm,
    validateForm: validateMenuCategoryForm,
  });
  useAutoSlug(crud.form, crud.isEditing);
  const { isUploading, uploadImage } = useImageUploadState(StorageFolders.menuItems);

  const uploadCategoryImage = async (file: File) => {
    const uploadedFile = await uploadImage(file);
    if (uploadedFile) crud.form.value.imageUrl = uploadedFile.url;
  };

  return { ...crud, isUploading, uploadCategoryImage };
};
