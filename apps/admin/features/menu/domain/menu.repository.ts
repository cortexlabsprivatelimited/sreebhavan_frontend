import { ApiConstants } from '~/common/constants/apiConstants';
import { AppStrings } from '~/common/constants/appStrings';
import type { CrudRepository } from '~/common/controllers/useCrudListState';
import { useApiClient } from '~/common/services/apiClient';
import type { FormErrors } from '~/common/types/form';
import { sortBySortOrder } from '~/common/utils/listHelpers';
import { isBlank, isValidSlug } from '~/common/utils/validators';
import {
  mapMenuCard,
  mapMenuCategory,
  mapMenuItem,
  toMenuCardRequest,
  toMenuCategoryRequest,
  toMenuItemRequest,
  type MenuCard,
  type MenuCardApiResponse,
  type MenuCardForm,
  type MenuCategory,
  type MenuCategoryApiResponse,
  type MenuCategoryForm,
  type MenuItem,
  type MenuItemApiResponse,
  type MenuItemFlags,
  type MenuItemForm,
} from '../model/menu.model';

const validateSlug = (slug: string) =>
  isBlank(slug)
    ? AppStrings.validation.required
    : isValidSlug(slug)
      ? undefined
      : AppStrings.validation.invalidSlug;

export const validateMenuCategoryForm = (form: MenuCategoryForm): FormErrors<MenuCategoryForm> => ({
  name: isBlank(form.name) ? AppStrings.validation.required : undefined,
  slug: validateSlug(form.slug),
});

export const validateMenuItemForm = (form: MenuItemForm): FormErrors<MenuItemForm> => ({
  categoryId: isBlank(form.categoryId) ? AppStrings.validation.required : undefined,
  name: isBlank(form.name) ? AppStrings.validation.required : undefined,
  slug: validateSlug(form.slug),
  price: form.price === null || form.price < 0 ? 'Enter a price of 0 or more.' : undefined,
});

export const validateMenuCardForm = (form: MenuCardForm): FormErrors<MenuCardForm> => ({
  title: isBlank(form.title) ? AppStrings.validation.required : undefined,
  fileUrl: isBlank(form.fileUrl) ? 'Upload a PDF or image of the menu.' : undefined,
});

export const useMenuCategoriesRepository = (): CrudRepository<MenuCategory, MenuCategoryForm> => {
  const apiClient = useApiClient();
  return {
    getAll: async () =>
      sortBySortOrder(
        (await apiClient.get<MenuCategoryApiResponse[]>(ApiConstants.admin.menuCategories)).map(
          mapMenuCategory,
        ),
      ),
    create: async (form) =>
      mapMenuCategory(
        await apiClient.post<MenuCategoryApiResponse>(
          ApiConstants.admin.menuCategories,
          toMenuCategoryRequest(form),
        ),
      ),
    update: async (id, form) =>
      mapMenuCategory(
        await apiClient.patch<MenuCategoryApiResponse>(
          ApiConstants.admin.menuCategoryById(id),
          toMenuCategoryRequest(form),
        ),
      ),
    remove: async (id) => {
      await apiClient.remove(ApiConstants.admin.menuCategoryById(id));
    },
  };
};

export const useMenuItemsRepository = () => {
  const apiClient = useApiClient();
  const crud: CrudRepository<MenuItem, MenuItemForm> = {
    getAll: async () =>
      sortBySortOrder(
        (await apiClient.get<MenuItemApiResponse[]>(ApiConstants.admin.menuItems)).map(mapMenuItem),
      ),
    create: async (form) =>
      mapMenuItem(
        await apiClient.post<MenuItemApiResponse>(
          ApiConstants.admin.menuItems,
          toMenuItemRequest(form),
        ),
      ),
    update: async (id, form) =>
      mapMenuItem(
        await apiClient.patch<MenuItemApiResponse>(
          ApiConstants.admin.menuItemById(id),
          toMenuItemRequest(form),
        ),
      ),
    remove: async (id) => {
      await apiClient.remove(ApiConstants.admin.menuItemById(id));
    },
  };

  /** Quick toggles in the list: available / today's special. */
  const updateItemFlags = async (id: string, flags: MenuItemFlags): Promise<MenuItem> =>
    mapMenuItem(
      await apiClient.patch<MenuItemApiResponse>(ApiConstants.admin.menuItemById(id), flags),
    );

  return { ...crud, updateItemFlags };
};

export const useMenuCardsRepository = (): CrudRepository<MenuCard, MenuCardForm> => {
  const apiClient = useApiClient();
  return {
    getAll: async () =>
      (await apiClient.get<MenuCardApiResponse[]>(ApiConstants.admin.menuCards)).map(mapMenuCard),
    create: async (form) =>
      mapMenuCard(
        await apiClient.post<MenuCardApiResponse>(
          ApiConstants.admin.menuCards,
          toMenuCardRequest(form),
        ),
      ),
    update: async (id, form) =>
      mapMenuCard(
        await apiClient.patch<MenuCardApiResponse>(
          ApiConstants.admin.menuCardById(id),
          toMenuCardRequest(form),
        ),
      ),
    remove: async (id) => {
      await apiClient.remove(ApiConstants.admin.menuCardById(id));
    },
  };
};
