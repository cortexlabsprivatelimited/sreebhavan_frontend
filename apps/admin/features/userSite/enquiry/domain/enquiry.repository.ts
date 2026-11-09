import { ApiConstants } from '~/common/constants/apiConstants';
import { AppStrings } from '~/common/constants/appStrings';
import { useApiClient } from '~/common/services/apiClient';
import { usePublicContentService } from '~/common/services/publicContentService';
import type { SelectOption } from '~/common/types/api';
import type { FormErrors } from '~/common/types/form';
import { isBlank, isValidEmail, isValidPhone } from '~/common/utils/validators';
import {
  toCreateEnquiryRequest,
  type CreateEnquiryApiResponse,
  type EnquiryForm,
} from '../model/enquiry.model';

export const useEnquiryRepository = () => {
  const apiClient = useApiClient();
  const publicContentService = usePublicContentService();

  /** Saves the enquiry and returns the WhatsApp link the API built for the right business. */
  const submitEnquiry = async (form: EnquiryForm): Promise<string> => {
    const response = await apiClient.post<CreateEnquiryApiResponse>(
      ApiConstants.public.enquiries,
      toCreateEnquiryRequest(form),
    );
    return response.whatsapp_url;
  };

  const getRoomOptions = async (): Promise<SelectOption[]> =>
    (await publicContentService.getRooms()).map((room) => ({ label: room.name, value: room.slug }));

  return { submitEnquiry, getRoomOptions };
};

/** Same rules as the API (it re-checks everything). `todayIsoDate` is 'YYYY-MM-DD'. */
export const validateEnquiryForm = (
  form: EnquiryForm,
  todayIsoDate: string,
): FormErrors<EnquiryForm> => {
  const errors: FormErrors<EnquiryForm> = {};
  const { required } = AppStrings.validation;

  if (isBlank(form.name)) errors.name = required;
  if (isBlank(form.phone)) errors.phone = required;
  else if (!isValidPhone(form.phone)) errors.phone = AppStrings.validation.invalidPhone;
  if (!isBlank(form.email) && !isValidEmail(form.email.trim())) {
    errors.email = AppStrings.validation.invalidEmail;
  }

  if (form.type === 'hall') {
    if (!form.dateFrom) errors.dateFrom = required;
    if (!form.slot) errors.slot = required;
  }
  if (form.type === 'room' && isBlank(form.roomSlug)) errors.roomSlug = required;

  if (form.type !== 'hotel' && form.dateFrom && form.dateFrom < todayIsoDate) {
    errors.dateFrom = 'Choose today or a later date.';
  }
  if (form.type === 'room' && form.dateTo && form.dateFrom && form.dateTo < form.dateFrom) {
    errors.dateTo = 'Check-out must be on or after check-in.';
  }
  if (form.guests !== null && (form.guests < 1 || !Number.isInteger(form.guests))) {
    errors.guests = 'Enter the number of guests.';
  }
  return errors;
};
