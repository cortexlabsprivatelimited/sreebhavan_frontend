import { filterFaqs, useFaqRepository } from '../domain/faq.repository';
import { FAQ_LIST_KEY } from '../model/faq.model';

export const useFaqController = () => {
  const faqRepository = useFaqRepository();

  const {
    data: faqs,
    status,
    error,
    refresh: reloadFaqs,
  } = useAsyncData(FAQ_LIST_KEY, () => faqRepository.getFaqs(), { default: () => [] });

  const searchText = ref('');
  const openFaqId = ref<string | null>(null);
  const visibleFaqs = computed(() => filterFaqs(faqs.value, searchText.value));

  const toggleFaq = (faqId: string) => {
    openFaqId.value = openFaqId.value === faqId ? null : faqId;
  };

  const isLoading = computed(() => status.value === 'pending');
  const hasError = computed(() => Boolean(error.value));
  const isEmpty = computed(() => !isLoading.value && !hasError.value && faqs.value.length === 0);

  return {
    visibleFaqs,
    searchText,
    openFaqId,
    toggleFaq,
    isLoading,
    hasError,
    isEmpty,
    reloadFaqs,
  };
};
