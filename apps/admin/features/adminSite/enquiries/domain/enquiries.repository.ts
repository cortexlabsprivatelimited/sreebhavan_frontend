import { ApiConstants } from '~/common/constants/apiConstants';
import { AppConfig } from '~/common/constants/appConfig';
import { AppStrings } from '~/common/constants/appStrings';
import { useApiClient } from '~/common/services/apiClient';
import { mapPaginated, type Paginated } from '~/common/types/api';
import { toIsoDate } from '~/common/utils/formatDate';
import {
  mapEnquiry,
  toEnquiryQuery,
  toEnquiryUpdateRequest,
  type Enquiry,
  type EnquiryApiResponse,
  type EnquiryFilters,
  type EnquiryUpdateForm,
} from '../model/enquiries.model';

/** Message the admin sends when replying to a customer on WhatsApp. */
export const buildEnquiryReplyMessage = (enquiry: Enquiry): string =>
  `Hi ${enquiry.name}, thank you for your enquiry with ${
    enquiry.type === 'hotel' ? AppStrings.businesses.hotel : AppStrings.businesses.hallAndRooms
  }.`;

export const useEnquiriesRepository = () => {
  const apiClient = useApiClient();

  const getEnquiries = async (
    filters: EnquiryFilters,
    page: number,
  ): Promise<Paginated<Enquiry>> => {
    const response = await apiClient.getPage<EnquiryApiResponse>(ApiConstants.admin.enquiries, {
      ...toEnquiryQuery(filters),
      page,
      per_page: AppConfig.defaultPageSize,
    });
    return mapPaginated(response, mapEnquiry);
  };

  const updateEnquiry = async (id: string, form: EnquiryUpdateForm): Promise<Enquiry> =>
    mapEnquiry(
      await apiClient.patch<EnquiryApiResponse>(
        ApiConstants.admin.enquiryById(id),
        toEnquiryUpdateRequest(form),
      ),
    );

  const exportEnquiriesCsv = async (
    filters: EnquiryFilters,
  ): Promise<{ file: Blob; fileName: string }> => ({
    file: await apiClient.getBlob(ApiConstants.admin.enquiriesExport, toEnquiryQuery(filters)),
    fileName: `enquiries-${toIsoDate(new Date())}.csv`,
  });

  return { getEnquiries, updateEnquiry, exportEnquiriesCsv };
};
