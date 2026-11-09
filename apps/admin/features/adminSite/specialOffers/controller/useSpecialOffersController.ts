import { StorageFolders } from '~/common/constants/imageConstants';
import { useBusinessOptionsState } from '~/common/controllers/useBusinessOptionsState';
import { useCrudListState } from '~/common/controllers/useCrudListState';
import { useImageUploadState } from '~/common/controllers/useImageUploadState';
import {
  useSpecialOffersRepository,
  validateSpecialOfferForm,
} from '../domain/specialOffers.repository';
import { createEmptySpecialOfferForm, toSpecialOfferForm } from '../model/specialOffers.model';

export const useSpecialOffersController = () => {
  const crud = useCrudListState({
    key: 'admin-special-offers',
    repository: useSpecialOffersRepository(),
    createEmptyForm: createEmptySpecialOfferForm,
    toForm: toSpecialOfferForm,
    validateForm: validateSpecialOfferForm,
  });
  const { businessSelectOptions, getBusinessName } = useBusinessOptionsState();
  const { isUploading, uploadImage } = useImageUploadState(StorageFolders.banners);

  const uploadSpecialOfferImage = async (file: File) => {
    const uploadedFile = await uploadImage(file);
    if (uploadedFile) crud.form.value.imageUrl = uploadedFile.url;
  };

  return { ...crud, businessSelectOptions, getBusinessName, isUploading, uploadSpecialOfferImage };
};
