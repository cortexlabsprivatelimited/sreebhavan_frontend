import { StorageFolders } from '~/common/constants/imageConstants';
import { useCrudListState } from '~/common/controllers/useCrudListState';
import { useImageUploadState } from '~/common/controllers/useImageUploadState';
import { useSeoRepository, validateSeoMetaForm } from '../domain/seo.repository';
import { createEmptySeoMetaForm, toSeoMetaForm } from '../model/seo.model';

export const useSeoController = () => {
  const crud = useCrudListState({
    key: 'admin-seo',
    repository: useSeoRepository(),
    createEmptyForm: createEmptySeoMetaForm,
    toForm: toSeoMetaForm,
    validateForm: validateSeoMetaForm,
  });
  const { isUploading, uploadImage } = useImageUploadState(StorageFolders.seo);

  const uploadOgImage = async (file: File) => {
    const uploadedFile = await uploadImage(file);
    if (uploadedFile) crud.form.value.ogImageUrl = uploadedFile.url;
  };

  return { ...crud, isUploading, uploadOgImage };
};
