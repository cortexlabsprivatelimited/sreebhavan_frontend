import { ApiConstants } from '~/common/constants/apiConstants';
import { useApiClient } from '~/common/services/apiClient';
import {
  mapMenuCardFiles,
  mapMenuCategories,
  mapMenuDishes,
  type MenuCardFileApiResponse,
  type MenuCategoryApiResponse,
  type MenuContent,
  type MenuDish,
  type MenuDishApiResponse,
  type MenuSection,
} from '../model/menu.model';

export const useMenuRepository = () => {
  const apiClient = useApiClient();

  /** Categories, every available dish and the downloadable menu cards, in one go. */
  const getMenuContent = async (): Promise<MenuContent> => {
    const [categories, dishes, menuCards] = await Promise.all([
      apiClient.get<MenuCategoryApiResponse[]>(ApiConstants.public.menuCategories),
      apiClient.get<MenuDishApiResponse[]>(ApiConstants.public.menuItems),
      apiClient.get<MenuCardFileApiResponse[]>(ApiConstants.public.menuCards),
    ]);
    return {
      categories: mapMenuCategories(categories),
      dishes: mapMenuDishes(dishes),
      menuCards: mapMenuCardFiles(menuCards),
    };
  };

  return { getMenuContent };
};

/** Groups dishes under their categories, skipping empty categories. */
export const buildMenuSections = (content: MenuContent, dishes: MenuDish[]): MenuSection[] =>
  content.categories
    .map((category) => ({
      category,
      dishes: dishes.filter((dish) => dish.categoryId === category.id),
    }))
    .filter((section) => section.dishes.length > 0);

export const matchesDishSearch = (dish: MenuDish, searchText: string): boolean => {
  const query = searchText.trim().toLowerCase();
  if (!query) return true;
  return [dish.name, dish.nameMalayalam ?? '', dish.description ?? ''].some((text) =>
    text.toLowerCase().includes(query),
  );
};
