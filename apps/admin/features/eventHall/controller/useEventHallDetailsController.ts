import { AppStrings } from '~/common/constants/appStrings';
import { useToastStore } from '~/common/stores/toast';
import { hasFormErrors, type FormErrors } from '~/common/types/form';
import { getErrorMessage, getErrorStatus } from '~/common/utils/getErrorMessage';
import { useEventHallRepository, validateEventHallForm } from '../domain/eventHall.repository';
import {
  toEventHallForm,
  type EventHallDetails,
  type EventHallForm,
} from '../model/eventHall.model';

export const useEventHallDetailsController = () => {
  const eventHallRepository = useEventHallRepository();
  const toast = useToastStore();

  const form = ref<EventHallForm>(toEventHallForm(null));
  const formErrors = ref<FormErrors<EventHallForm>>({});
  const isSaving = ref(false);

  // A 404 means the hall has not been set up yet: show an empty form instead of an error.
  const {
    status,
    error,
    refresh: reloadHall,
  } = useAsyncData<EventHallDetails | null>('admin-event-hall', async () => {
    try {
      const hall = await eventHallRepository.getHallDetails();
      form.value = toEventHallForm(hall);
      return hall;
    } catch (loadError) {
      if (getErrorStatus(loadError) === 404) return null;
      throw loadError;
    }
  });

  const isLoading = computed(() => status.value === 'pending');
  const hasError = computed(() => Boolean(error.value));

  const saveHallDetails = async () => {
    formErrors.value = validateEventHallForm(form.value);
    if (hasFormErrors(formErrors.value)) return;

    isSaving.value = true;
    try {
      form.value = toEventHallForm(await eventHallRepository.saveHallDetails(form.value));
      toast.showSuccess(AppStrings.states.saved);
    } catch (saveError) {
      toast.showError(getErrorMessage(saveError));
    } finally {
      isSaving.value = false;
    }
  };

  return { form, formErrors, isLoading, hasError, isSaving, reloadHall, saveHallDetails };
};
