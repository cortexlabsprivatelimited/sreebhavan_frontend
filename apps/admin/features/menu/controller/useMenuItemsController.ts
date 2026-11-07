import { StorageFolders } from '~/common/constants/imageConstants';
import { useAutoSlug } from '~/common/controllers/useAutoSlug';
import { useCrudListState } from '~/common/controllers/useCrudListState';
import { useImageUploadState } from '~/common/controllers/useImageUploadState';
import { useToastStore } from '~/common/stores/toast';
import type { SelectOption } from '~/common/types/api';
import { getErrorMessage } from '~/common/utils/getErrorMessage';
import {
  useMenuCategoriesRepository,
  useMenuItemsRepository,
  validateMenuItemForm,
} from '../domain/menu.repository';
import { createEmptyMenuItemForm, toMenuItemForm, type MenuItem } from '../model/menu.model';

export const useMenuItemsController = () => {
  const menuItemsRepository = useMenuItemsRepository();
  const menuCategoriesRepository = useMenuCategoriesRepository();
  const toast = useToastStore();

  const crud = useCrudListState({
    key: 'admin-menu-items',
    repository: menuItemsRepository,
    createEmptyForm: createEmptyMenuItemForm,
    toForm: toMenuItemForm,
    validateForm: validateMenuItemForm,
  });
  useAutoSlug(crud.form, crud.isEditing);
  const { isUploading, uploadImage } = useImageUploadState(StorageFolders.menuItems);

  const { data: categories } = useAsyncData(
    'admin-menu-item-categories',
    () => menuCategoriesRepository.getAll(),
    {
      default: () => [],
    },
  );
  const categoryOptions = computed<SelectOption[]>(() =>
    categories.value.map((category) => ({ label: category.name, value: category.id })),
  );
  const getCategoryName = (categoryId: string) =>
    categories.value.find((category) => category.id === categoryId)?.name ?? '-';

  // Filters
  const selectedCategoryId = ref('');
  const searchText = ref('');
  const isSpecialsOnly = ref(false);

  const filteredItems = computed(() => {
    const search = searchText.value.trim().toLowerCase();
    return crud.items.value.filter(
      (item) =>
        (!selectedCategoryId.value || item.categoryId === selectedCategoryId.value) &&
        (!isSpecialsOnly.value || item.isSpecial) &&
        (!search || item.name.toLowerCase().includes(search) || item.nameMl.includes(search)),
    );
  });

  const openCreateFormInCategory = () => {
    crud.openCreateForm();
    crud.form.value.categoryId = selectedCategoryId.value;
  };

  const uploadItemImage = async (file: File) => {
    const uploadedFile = await uploadImage(file);
    if (uploadedFile) crud.form.value.imageUrl = uploadedFile.url;
  };

  /** Quick toggle from the list. Updates the row in place, rolls back if the API refuses. */
  const toggleItemFlag = async (
    item: MenuItem,
    flag: 'isAvailable' | 'isSpecial',
    value: boolean,
  ) => {
    const previousValue = item[flag];
    item[flag] = value;
    try {
      await menuItemsRepository.updateItemFlags(
        item.id,
        flag === 'isAvailable' ? { is_available: value } : { is_special: value },
      );
    } catch (toggleError) {
      item[flag] = previousValue;
      toast.showError(getErrorMessage(toggleError));
    }
  };

  return {
    ...crud,
    categoryOptions,
    getCategoryName,
    selectedCategoryId,
    searchText,
    isSpecialsOnly,
    filteredItems,
    openCreateFormInCategory,
    isUploading,
    uploadItemImage,
    toggleItemFlag,
  };
};
