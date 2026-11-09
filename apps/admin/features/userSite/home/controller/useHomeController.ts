import { usePublicSiteState } from '~/common/controllers/usePublicSiteState';
import { buildQuickAvailabilityLink, useHomeRepository } from '../domain/home.repository';
import { createEmptyHomeContent, createQuickAvailabilityForm } from '../model/home.model';

/** State for the home page. useAsyncData runs on the server, so the content is in the SSR HTML. */
export const useHomeController = () => {
  const homeRepository = useHomeRepository();
  const { hotel, hallAndRooms } = usePublicSiteState();

  const {
    data: homeContent,
    status,
    error,
    refresh: reloadHomeContent,
  } = useAsyncData('home-content', () => homeRepository.getHomeContent(), {
    default: createEmptyHomeContent,
  });

  const quickAvailabilityForm = ref(createQuickAvailabilityForm());
  const submitQuickAvailability = () =>
    navigateTo(buildQuickAvailabilityLink(quickAvailabilityForm.value));

  const isLoading = computed(() => status.value === 'pending');
  const hasError = computed(() => Boolean(error.value));

  return {
    homeContent,
    hotel,
    hallAndRooms,
    quickAvailabilityForm,
    submitQuickAvailability,
    isLoading,
    hasError,
    reloadHomeContent,
  };
};
