import { ApiConstants } from '~/common/constants/apiConstants';
import { useApiClient } from '~/common/services/apiClient';
import {
  mapBusinessOption,
  type BusinessOption,
  type BusinessOptionApiResponse,
} from '~/common/types/business';

/** Loads the two businesses for "Business" dropdowns in banners, testimonials and FAQs. */
export const useBusinessOptionsService = () => {
  const apiClient = useApiClient();

  const getBusinessOptions = async (): Promise<BusinessOption[]> => {
    const response = await apiClient.get<BusinessOptionApiResponse[]>(
      ApiConstants.admin.businesses,
    );
    return response.map(mapBusinessOption);
  };

  return { getBusinessOptions };
};
