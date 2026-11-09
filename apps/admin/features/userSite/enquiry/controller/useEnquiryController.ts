import { usePublicSiteState } from '~/common/controllers/usePublicSiteState';
import type { FormErrors } from '~/common/types/form';
import { hasFormErrors } from '~/common/types/form';
import { toIsoDate } from '~/common/utils/formatDate';
import { getApiFieldErrors, getErrorMessage, getErrorStatus } from '~/common/utils/getErrorMessage';
import { useEnquiryRepository, validateEnquiryForm } from '../domain/enquiry.repository';
import {
  createEnquiryForm,
  EnquiryApiFieldNames,
  type EnquiryForm,
  type EnquiryPrefill,
} from '../model/enquiry.model';

const readQueryText = (value: unknown) => (typeof value === 'string' ? value : undefined);

/** Enquiry form. Pre-filled from the link that opened it (room page, hall calendar...). */
export const useEnquiryController = () => {
  const enquiryRepository = useEnquiryRepository();
  const route = useRoute();

  const prefill: EnquiryPrefill = {
    type: readQueryText(route.query.type),
    room: readQueryText(route.query.room),
    date: readQueryText(route.query.date),
    slot: readQueryText(route.query.slot),
    guests: readQueryText(route.query.guests),
  };
  const { settings, primaryPhone, hallAndRoomsWhatsAppUrl, hotelWhatsAppUrl, hotel, hallAndRooms } =
    usePublicSiteState();
  const contactWhatsAppUrl = computed(
    () => hallAndRoomsWhatsAppUrl.value ?? hotelWhatsAppUrl.value,
  );
  const businessTimings = computed(() =>
    [hotel.value, hallAndRooms.value].flatMap((business) =>
      business ? business.timings.map((timing) => ({ business: business.name, ...timing })) : [],
    ),
  );
  const form = ref<EnquiryForm>(createEnquiryForm(prefill));
  const formErrors = ref<FormErrors<EnquiryForm>>({});
  const submitErrorMessage = ref<string | null>(null);
  const isSubmitting = ref(false);
  const whatsAppUrl = ref<string | null>(null);
  const todayIsoDate = toIsoDate(new Date());

  const { data: roomOptions, status: roomOptionsStatus } = useAsyncData(
    'enquiry-room-options',
    () => enquiryRepository.getRoomOptions(),
    {
      default: () => [],
    },
  );
  const isLoadingRooms = computed(() => roomOptionsStatus.value === 'pending');

  const submitEnquiry = async () => {
    submitErrorMessage.value = null;
    formErrors.value = validateEnquiryForm(form.value, todayIsoDate);
    if (hasFormErrors(formErrors.value)) return;

    isSubmitting.value = true;
    try {
      whatsAppUrl.value = await enquiryRepository.submitEnquiry(form.value);
    } catch (error) {
      formErrors.value = getApiFieldErrors(error, form.value, EnquiryApiFieldNames);
      submitErrorMessage.value =
        getErrorStatus(error) === 429
          ? 'Too many enquiries from this connection. Please wait a little and try again, or call us.'
          : getErrorMessage(error);
    } finally {
      isSubmitting.value = false;
    }
  };

  const startNewEnquiry = () => {
    form.value = createEnquiryForm({ type: form.value.type });
    formErrors.value = {};
    whatsAppUrl.value = null;
  };

  const isSubmitted = computed(() => Boolean(whatsAppUrl.value));

  return {
    form,
    formErrors,
    submitErrorMessage,
    isSubmitting,
    isSubmitted,
    whatsAppUrl,
    roomOptions,
    isLoadingRooms,
    todayIsoDate,
    settings,
    primaryPhone,
    contactWhatsAppUrl,
    businessTimings,
    submitEnquiry,
    startNewEnquiry,
  };
};
