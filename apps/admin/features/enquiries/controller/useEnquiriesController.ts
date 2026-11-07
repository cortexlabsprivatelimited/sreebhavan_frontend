import { AppConfig } from '~/common/constants/appConfig';
import { AppStrings } from '~/common/constants/appStrings';
import { useToastStore } from '~/common/stores/toast';
import { EnquiryStatuses, type EnquiryStatus } from '~/common/types/booking';
import { buildWhatsAppUrl } from '~/common/utils/buildWhatsAppUrl';
import { downloadFile } from '~/common/utils/downloadFile';
import { getErrorMessage } from '~/common/utils/getErrorMessage';
import { buildEnquiryReplyMessage, useEnquiriesRepository } from '../domain/enquiries.repository';
import type { Enquiry, EnquiryFilters, EnquiryUpdateForm } from '../model/enquiries.model';

const readStatusFromQuery = (value: unknown): EnquiryStatus | '' =>
  EnquiryStatuses.includes(value as EnquiryStatus) ? (value as EnquiryStatus) : '';

export const useEnquiriesController = () => {
  const enquiriesRepository = useEnquiriesRepository();
  const toast = useToastStore();
  const route = useRoute();

  const filters = ref<EnquiryFilters>({
    type: '',
    status: readStatusFromQuery(route.query.status),
    search: '',
  });
  const page = ref(1);
  const appliedSearch = ref('');

  const {
    data: enquiryPage,
    status,
    error,
    refresh: reloadEnquiries,
  } = useAsyncData(
    'admin-enquiries',
    () =>
      enquiriesRepository.getEnquiries(
        { ...filters.value, search: appliedSearch.value },
        page.value,
      ),
    { watch: [() => filters.value.type, () => filters.value.status, appliedSearch, page] },
  );

  const enquiries = computed(() => enquiryPage.value?.items ?? []);
  const totalCount = computed(() => enquiryPage.value?.total ?? 0);
  const isLoading = computed(() => status.value === 'pending');
  const hasError = computed(() => Boolean(error.value));
  const isEmpty = computed(
    () => !isLoading.value && !hasError.value && enquiries.value.length === 0,
  );

  watch([() => filters.value.type, () => filters.value.status], () => {
    page.value = 1;
  });

  const applySearch = () => {
    page.value = 1;
    appliedSearch.value = filters.value.search;
  };

  const changePage = (newPage: number) => {
    page.value = newPage;
  };

  // Detail dialog
  const selectedEnquiry = ref<Enquiry | null>(null);
  const updateForm = ref<EnquiryUpdateForm>({ status: 'new', adminNotes: '' });
  const isSaving = ref(false);

  const openEnquiry = (enquiry: Enquiry) => {
    selectedEnquiry.value = enquiry;
    updateForm.value = { status: enquiry.status, adminNotes: enquiry.adminNotes };
  };

  const closeEnquiry = () => {
    selectedEnquiry.value = null;
  };

  const saveEnquiryUpdate = async () => {
    if (!selectedEnquiry.value) return;
    isSaving.value = true;
    try {
      await enquiriesRepository.updateEnquiry(selectedEnquiry.value.id, updateForm.value);
      selectedEnquiry.value = null;
      toast.showSuccess(AppStrings.states.saved);
      await reloadEnquiries();
    } catch (saveError) {
      toast.showError(getErrorMessage(saveError));
    } finally {
      isSaving.value = false;
    }
  };

  const selectedEnquiryWhatsAppUrl = computed(() =>
    selectedEnquiry.value
      ? buildWhatsAppUrl(
          selectedEnquiry.value.phone,
          buildEnquiryReplyMessage(selectedEnquiry.value),
        )
      : '',
  );

  const isExporting = ref(false);
  const exportCsv = async () => {
    isExporting.value = true;
    try {
      const { file, fileName } = await enquiriesRepository.exportEnquiriesCsv(filters.value);
      downloadFile(file, fileName);
    } catch (exportError) {
      toast.showError(getErrorMessage(exportError));
    } finally {
      isExporting.value = false;
    }
  };

  return {
    filters,
    page,
    pageSize: AppConfig.defaultPageSize,
    enquiries,
    totalCount,
    isLoading,
    hasError,
    isEmpty,
    reloadEnquiries,
    applySearch,
    changePage,
    selectedEnquiry,
    updateForm,
    isSaving,
    openEnquiry,
    closeEnquiry,
    saveEnquiryUpdate,
    selectedEnquiryWhatsAppUrl,
    isExporting,
    exportCsv,
  };
};
