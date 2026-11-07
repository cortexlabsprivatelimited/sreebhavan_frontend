import { ApiConstants } from '~/common/constants/apiConstants';
import { AppStrings } from '~/common/constants/appStrings';
import type { CrudRepository } from '~/common/controllers/useCrudListState';
import { useApiClient } from '~/common/services/apiClient';
import type { FormErrors } from '~/common/types/form';
import { isBlank, isValidPhone } from '~/common/utils/validators';
import {
  mapBusiness,
  toBusinessRequest,
  type Business,
  type BusinessApiResponse,
  type BusinessForm,
} from '../model/businesses.model';

export const validateBusinessForm = (form: BusinessForm): FormErrors<BusinessForm> => ({
  name: isBlank(form.name) ? AppStrings.validation.required : undefined,
  whatsAppNumber: isBlank(form.whatsAppNumber)
    ? 'A WhatsApp number is needed for enquiries.'
    : isValidPhone(form.whatsAppNumber)
      ? undefined
      : AppStrings.validation.invalidPhone,
  phone:
    !isBlank(form.phone) && !isValidPhone(form.phone)
      ? AppStrings.validation.invalidPhone
      : undefined,
});

/** The two businesses are created by the API; the admin can only edit them. */
export const useBusinessesRepository = (): CrudRepository<Business, BusinessForm> => {
  const apiClient = useApiClient();
  return {
    getAll: async () =>
      (await apiClient.get<BusinessApiResponse[]>(ApiConstants.admin.businesses)).map(mapBusiness),
    create: () => Promise.reject(new Error('Businesses cannot be added from the admin panel.')),
    update: async (id, form) =>
      mapBusiness(
        await apiClient.patch<BusinessApiResponse>(
          ApiConstants.admin.businessById(id),
          toBusinessRequest(form),
        ),
      ),
    remove: () => Promise.reject(new Error('Businesses cannot be deleted from the admin panel.')),
  };
};
