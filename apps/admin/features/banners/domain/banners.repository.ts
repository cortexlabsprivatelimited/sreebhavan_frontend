import { ApiConstants } from '~/common/constants/apiConstants';
import { AppStrings } from '~/common/constants/appStrings';
import type { CrudRepository } from '~/common/controllers/useCrudListState';
import { useApiClient } from '~/common/services/apiClient';
import type { FormErrors } from '~/common/types/form';
import { isBlank } from '~/common/utils/validators';
import {
  mapBanner,
  toBannerRequest,
  type Banner,
  type BannerApiResponse,
  type BannerForm,
} from '../model/banners.model';

export const validateBannerForm = (form: BannerForm): FormErrors<BannerForm> => ({
  imageUrl: isBlank(form.imageUrl) ? AppStrings.validation.required : undefined,
  title: isBlank(form.title) ? AppStrings.validation.required : undefined,
  ctaLink:
    !isBlank(form.ctaText) && isBlank(form.ctaLink)
      ? 'Add a link for the button, e.g. /sreebhavanam/rooms'
      : undefined,
});

export const useBannersRepository = (): CrudRepository<Banner, BannerForm> => {
  const apiClient = useApiClient();

  return {
    getAll: async () => {
      const response = await apiClient.get<BannerApiResponse[]>(ApiConstants.admin.banners);
      return response.map(mapBanner).sort((first, second) => first.sortOrder - second.sortOrder);
    },
    create: async (form) =>
      mapBanner(
        await apiClient.post<BannerApiResponse>(ApiConstants.admin.banners, toBannerRequest(form)),
      ),
    update: async (id, form) =>
      mapBanner(
        await apiClient.patch<BannerApiResponse>(
          ApiConstants.admin.bannerById(id),
          toBannerRequest(form),
        ),
      ),
    remove: async (id) => {
      await apiClient.remove(ApiConstants.admin.bannerById(id));
    },
  };
};
