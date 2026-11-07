import { StorageFolders } from '~/common/constants/imageConstants';
import { useBusinessOptionsState } from '~/common/controllers/useBusinessOptionsState';
import { useCrudListState } from '~/common/controllers/useCrudListState';
import { useImageUploadState } from '~/common/controllers/useImageUploadState';
import { useBannersRepository, validateBannerForm } from '../domain/banners.repository';
import { createEmptyBannerForm, toBannerForm } from '../model/banners.model';

export const useBannersController = () => {
  const crud = useCrudListState({
    key: 'admin-banners',
    repository: useBannersRepository(),
    createEmptyForm: createEmptyBannerForm,
    toForm: toBannerForm,
    validateForm: validateBannerForm,
  });
  const { businessSelectOptions, getBusinessName } = useBusinessOptionsState();
  const { isUploading, uploadImage } = useImageUploadState(StorageFolders.banners);

  const uploadBannerImage = async (file: File) => {
    const uploadedFile = await uploadImage(file);
    if (uploadedFile) crud.form.value.imageUrl = uploadedFile.url;
  };

  return { ...crud, businessSelectOptions, getBusinessName, isUploading, uploadBannerImage };
};
