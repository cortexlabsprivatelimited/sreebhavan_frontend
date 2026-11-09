import { StorageFolders } from '~/common/constants/imageConstants';
import { AppConfig } from '~/common/constants/appConfig';
import { useCrudListState } from '~/common/controllers/useCrudListState';
import { useImageUploadState } from '~/common/controllers/useImageUploadState';
import { useBusinessesRepository, validateBusinessForm } from '../domain/businesses.repository';
import { createEmptyBusinessForm, toBusinessForm } from '../model/businesses.model';

export const useBusinessesController = () => {
  const crud = useCrudListState({
    key: 'admin-businesses',
    repository: useBusinessesRepository(),
    createEmptyForm: createEmptyBusinessForm,
    toForm: toBusinessForm,
    validateForm: validateBusinessForm,
    apiFieldNames: { whatsapp: 'whatsAppNumber' },
  });
  const { isUploading, uploadImage } = useImageUploadState(
    StorageFolders.logos,
    AppConfig.allowedLogoTypes,
  );

  const uploadBusinessLogo = async (file: File) => {
    const uploadedFile = await uploadImage(file);
    if (uploadedFile) crud.form.value.logoUrl = uploadedFile.url;
  };

  const addTimingRow = () => {
    crud.form.value.timings.push({ label: '', hours: '' });
  };

  const removeTimingRow = (index: number) => {
    crud.form.value.timings.splice(index, 1);
  };

  return { ...crud, isUploading, uploadBusinessLogo, addTimingRow, removeTimingRow };
};
