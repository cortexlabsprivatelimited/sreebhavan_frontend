import type { Ref } from 'vue';
import { AppStrings } from '~/common/constants/appStrings';
import { useToastStore } from '~/common/stores/toast';
import { hasFormErrors, type FormErrors } from '~/common/types/form';
import { getApiFieldErrors, getErrorMessage } from '~/common/utils/getErrorMessage';

/** What a feature repository must offer to use the shared list + form + delete flow. */
export interface CrudRepository<TItem extends { id: string }, TForm> {
  getAll: () => Promise<TItem[]>;
  create: (form: TForm) => Promise<TItem>;
  update: (id: string, form: TForm) => Promise<TItem>;
  remove: (id: string) => Promise<void>;
}

interface CrudListOptions<TItem extends { id: string }, TForm> {
  /** Unique useAsyncData key, e.g. 'admin-banners'. */
  key: string;
  repository: CrudRepository<TItem, TForm>;
  createEmptyForm: () => TForm;
  toForm: (item: TItem) => TForm;
  validateForm: (form: TForm) => FormErrors<TForm>;
  /** API field names that differ from the form's, e.g. `{ price: 'pricePerNight' }`. */
  apiFieldNames?: Record<string, string>;
}

/**
 * Shared state for admin list screens: load list, add/edit in a dialog, delete with confirm.
 * Feature controllers wrap this and add their own actions.
 */
export const useCrudListState = <TItem extends { id: string }, TForm>(
  options: CrudListOptions<TItem, TForm>,
) => {
  const toast = useToastStore();

  const {
    data: items,
    status,
    error,
    refresh: reloadItems,
  } = useAsyncData<TItem[]>(options.key, () => options.repository.getAll(), {
    default: () => [],
  });

  const isLoading = computed(() => status.value === 'pending');
  const hasError = computed(() => Boolean(error.value));
  const isEmpty = computed(() => !isLoading.value && !hasError.value && items.value.length === 0);

  // Add / edit dialog
  const isFormOpen = ref(false);
  const editingItemId = ref<string | null>(null);
  const form = ref(options.createEmptyForm()) as Ref<TForm>;
  const formErrors = ref({}) as Ref<FormErrors<TForm>>;
  const isSaving = ref(false);
  const saveErrorMessage = ref<string | null>(null);
  const isEditing = computed(() => editingItemId.value !== null);

  const openCreateForm = () => {
    editingItemId.value = null;
    form.value = options.createEmptyForm();
    formErrors.value = {};
    saveErrorMessage.value = null;
    isFormOpen.value = true;
  };

  const openEditForm = (item: TItem) => {
    editingItemId.value = item.id;
    form.value = options.toForm(item);
    formErrors.value = {};
    saveErrorMessage.value = null;
    isFormOpen.value = true;
  };

  const closeForm = () => {
    isFormOpen.value = false;
  };

  const saveForm = async () => {
    formErrors.value = options.validateForm(form.value);
    if (hasFormErrors(formErrors.value)) return;

    isSaving.value = true;
    saveErrorMessage.value = null;
    try {
      if (editingItemId.value) {
        await options.repository.update(editingItemId.value, form.value);
      } else {
        await options.repository.create(form.value);
      }
      isFormOpen.value = false;
      toast.showSuccess(AppStrings.states.saved);
      await reloadItems();
    } catch (saveError) {
      formErrors.value = getApiFieldErrors(saveError, form.value, options.apiFieldNames);
      saveErrorMessage.value = getErrorMessage(saveError);
    } finally {
      isSaving.value = false;
    }
  };

  // Delete with confirm
  const itemPendingDelete = ref<TItem | null>(null) as Ref<TItem | null>;
  const isDeleting = ref(false);

  const requestDelete = (item: TItem) => {
    itemPendingDelete.value = item;
  };

  const cancelDelete = () => {
    itemPendingDelete.value = null;
  };

  const confirmDelete = async () => {
    if (!itemPendingDelete.value) return;
    isDeleting.value = true;
    try {
      await options.repository.remove(itemPendingDelete.value.id);
      toast.showSuccess(AppStrings.states.deleted);
      itemPendingDelete.value = null;
      await reloadItems();
    } catch (deleteError) {
      toast.showError(getErrorMessage(deleteError));
    } finally {
      isDeleting.value = false;
    }
  };

  return {
    items,
    isLoading,
    hasError,
    isEmpty,
    reloadItems,
    isFormOpen,
    isEditing,
    form,
    formErrors,
    isSaving,
    saveErrorMessage,
    openCreateForm,
    openEditForm,
    closeForm,
    saveForm,
    itemPendingDelete,
    isDeleting,
    requestDelete,
    cancelDelete,
    confirmDelete,
  };
};
