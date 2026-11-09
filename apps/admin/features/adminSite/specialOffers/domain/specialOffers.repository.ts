import { ApiConstants } from '~/common/constants/apiConstants';
import { AppStrings } from '~/common/constants/appStrings';
import type { CrudRepository } from '~/common/controllers/useCrudListState';
import { useApiClient } from '~/common/services/apiClient';
import type { FormErrors } from '~/common/types/form';
import { isBlank } from '~/common/utils/validators';
import {
  mapSpecialOffer,
  toSpecialOfferRequest,
  type SpecialOffer,
  type SpecialOfferApiResponse,
  type SpecialOfferForm,
} from '../model/specialOffers.model';

export const validateSpecialOfferForm = (form: SpecialOfferForm): FormErrors<SpecialOfferForm> => ({
  imageUrl: isBlank(form.imageUrl) ? AppStrings.validation.required : undefined,
  title: isBlank(form.title) ? AppStrings.validation.required : undefined,
  ctaLink:
    !isBlank(form.ctaText) && isBlank(form.ctaLink)
      ? 'Add a link for the button, e.g. /sreebhavanam/rooms'
      : undefined,
});

export const useSpecialOffersRepository = (): CrudRepository<SpecialOffer, SpecialOfferForm> => {
  const apiClient = useApiClient();

  return {
    getAll: async () => {
      const response = await apiClient.get<SpecialOfferApiResponse[]>(
        ApiConstants.admin.specialOffers,
      );
      return response
        .map(mapSpecialOffer)
        .sort((first, second) => first.sortOrder - second.sortOrder);
    },
    create: async (form) =>
      mapSpecialOffer(
        await apiClient.post<SpecialOfferApiResponse>(
          ApiConstants.admin.specialOffers,
          toSpecialOfferRequest(form),
        ),
      ),
    update: async (id, form) =>
      mapSpecialOffer(
        await apiClient.patch<SpecialOfferApiResponse>(
          ApiConstants.admin.specialOfferById(id),
          toSpecialOfferRequest(form),
        ),
      ),
    remove: async (id) => {
      await apiClient.remove(ApiConstants.admin.specialOfferById(id));
    },
  };
};
