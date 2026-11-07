import { AppConfig } from '~/common/constants/appConfig';
import { AppStrings } from '~/common/constants/appStrings';
import { StorageFolders } from '~/common/constants/imageConstants';
import { useImageUploadState } from '~/common/controllers/useImageUploadState';
import { useToastStore } from '~/common/stores/toast';
import { hasFormErrors, type FormErrors } from '~/common/types/form';
import { getErrorMessage } from '~/common/utils/getErrorMessage';
import { useSiteSettingsRepository, validateSiteSettings } from '../domain/siteSettings.repository';
import {
  createEmptySiteSettings,
  type SiteSettings,
  type SiteSettingsImageField,
} from '../model/siteSettings.model';

export const useSiteSettingsController = () => {
  const siteSettingsRepository = useSiteSettingsRepository();
  const toast = useToastStore();
  const { uploadImage } = useImageUploadState(StorageFolders.logos, AppConfig.allowedLogoTypes);

  const form = ref<SiteSettings>(createEmptySiteSettings());
  const formErrors = ref<FormErrors<SiteSettings>>({});
  const isSaving = ref(false);
  const uploadingField = ref<SiteSettingsImageField | null>(null);

  const {
    status,
    error,
    refresh: reloadSettings,
  } = useAsyncData('admin-site-settings', async () => {
    const settings = await siteSettingsRepository.getSettings();
    form.value = settings;
    return settings;
  });

  const isLoading = computed(() => status.value === 'pending');
  const hasError = computed(() => Boolean(error.value));

  const uploadSettingImage = async (field: SiteSettingsImageField, file: File) => {
    uploadingField.value = field;
    const uploadedFile = await uploadImage(file);
    uploadingField.value = null;
    if (uploadedFile) form.value[field] = uploadedFile.url;
  };

  const saveSettings = async () => {
    formErrors.value = validateSiteSettings(form.value);
    if (hasFormErrors(formErrors.value)) {
      toast.showError('Some fields need fixing.');
      return;
    }
    isSaving.value = true;
    try {
      form.value = await siteSettingsRepository.saveSettings(form.value);
      toast.showSuccess(AppStrings.states.saved);
    } catch (saveError) {
      toast.showError(getErrorMessage(saveError));
    } finally {
      isSaving.value = false;
    }
  };

  return {
    form,
    formErrors,
    isLoading,
    hasError,
    isSaving,
    uploadingField,
    reloadSettings,
    uploadSettingImage,
    saveSettings,
  };
};
