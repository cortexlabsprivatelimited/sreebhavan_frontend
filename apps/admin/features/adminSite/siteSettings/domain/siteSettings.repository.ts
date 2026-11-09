import { ApiConstants } from '~/common/constants/apiConstants';
import { AppStrings } from '~/common/constants/appStrings';
import { useApiClient } from '~/common/services/apiClient';
import type { FormErrors } from '~/common/types/form';
import { isBlank, isValidEmail, isValidPhone } from '~/common/utils/validators';
import {
  mapSiteSettings,
  toSiteSettingsRequest,
  type SiteSettings,
  type SiteSettingsApiResponse,
} from '../model/siteSettings.model';

const isValidUrl = (value: string) => /^https?:\/\/\S+$/.test(value.trim());
const validateOptionalUrl = (value: string) =>
  isBlank(value) || isValidUrl(value) ? undefined : 'Enter a full link starting with https://';

export const validateSiteSettings = (settings: SiteSettings): FormErrors<SiteSettings> => ({
  contactPhone:
    !isBlank(settings.contactPhone) && !isValidPhone(settings.contactPhone)
      ? AppStrings.validation.invalidPhone
      : undefined,
  contactEmail:
    !isBlank(settings.contactEmail) && !isValidEmail(settings.contactEmail)
      ? AppStrings.validation.invalidEmail
      : undefined,
  mapEmbedUrl: validateOptionalUrl(settings.mapEmbedUrl),
  mapLinkUrl: validateOptionalUrl(settings.mapLinkUrl),
  facebookUrl: validateOptionalUrl(settings.facebookUrl),
  instagramUrl: validateOptionalUrl(settings.instagramUrl),
  youtubeUrl: validateOptionalUrl(settings.youtubeUrl),
  googleAnalyticsId:
    !isBlank(settings.googleAnalyticsId) && !/^G-[A-Z0-9]+$/.test(settings.googleAnalyticsId.trim())
      ? 'GA4 IDs look like G-XXXXXXXXXX.'
      : undefined,
});

export const useSiteSettingsRepository = () => {
  const apiClient = useApiClient();

  const getSettings = async (): Promise<SiteSettings> =>
    mapSiteSettings(await apiClient.get<SiteSettingsApiResponse>(ApiConstants.admin.settings));

  const saveSettings = async (settings: SiteSettings): Promise<SiteSettings> =>
    mapSiteSettings(
      await apiClient.put<SiteSettingsApiResponse>(
        ApiConstants.admin.settings,
        toSiteSettingsRequest(settings),
      ),
    );

  return { getSettings, saveSettings };
};
