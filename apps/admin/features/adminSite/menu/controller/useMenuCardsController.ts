import { AppConfig } from '~/common/constants/appConfig';
import { StorageFolders } from '~/common/constants/imageConstants';
import { useCrudListState } from '~/common/controllers/useCrudListState';
import { useImageUploadState } from '~/common/controllers/useImageUploadState';
import { useMenuCardsRepository, validateMenuCardForm } from '../domain/menu.repository';
import { createEmptyMenuCardForm, toMenuCardForm } from '../model/menu.model';

export const useMenuCardsController = () => {
  const crud = useCrudListState({
    key: 'admin-menu-cards',
    repository: useMenuCardsRepository(),
    createEmptyForm: createEmptyMenuCardForm,
    toForm: toMenuCardForm,
    validateForm: validateMenuCardForm,
  });
  const { isUploading, uploadImage } = useImageUploadState(
    StorageFolders.menuCards,
    AppConfig.allowedMenuCardTypes,
  );

  const uploadMenuCardFile = async (file: File) => {
    const uploadedFile = await uploadImage(file);
    if (uploadedFile) crud.form.value.fileUrl = uploadedFile.url;
  };

  return { ...crud, isUploading, uploadMenuCardFile };
};
