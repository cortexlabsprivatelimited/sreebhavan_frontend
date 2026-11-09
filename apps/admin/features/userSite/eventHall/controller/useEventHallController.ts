import { buildEnquiryLink } from '~/common/constants/userSiteNavigation';
import { useEventHallRepository } from '../domain/eventHall.repository';
import { createEmptyEventHallContent } from '../model/eventHall.model';

export const useEventHallController = () => {
  const eventHallRepository = useEventHallRepository();

  const {
    data: content,
    status,
    error,
    refresh: reloadContent,
  } = useAsyncData('event-hall-content', () => eventHallRepository.getEventHallContent(), {
    default: createEmptyEventHallContent,
  });

  const heroImage = computed(() => content.value.hall?.images[0] ?? null);
  const enquiryLink = buildEnquiryLink({ type: 'hall' });

  const isLoading = computed(() => status.value === 'pending');
  const hasError = computed(() => Boolean(error.value));
  const isEmpty = computed(
    () =>
      !isLoading.value && !hasError.value && !content.value.hall && !content.value.packages.length,
  );

  return { content, heroImage, enquiryLink, isLoading, hasError, isEmpty, reloadContent };
};
