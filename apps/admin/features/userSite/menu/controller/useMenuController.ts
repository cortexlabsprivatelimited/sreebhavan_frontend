import { buildMenuSections, matchesDishSearch, useMenuRepository } from '../domain/menu.repository';
import { createEmptyMenuContent } from '../model/menu.model';

/** Menu page state. The selected category is kept in `?category=<slug>` so it can be shared. */
export const useMenuController = () => {
  const menuRepository = useMenuRepository();
  const route = useRoute();
  const router = useRouter();

  const {
    data: menuContent,
    status,
    error,
    refresh: reloadMenu,
  } = useAsyncData('menu-content', () => menuRepository.getMenuContent(), {
    default: createEmptyMenuContent,
  });

  const searchText = ref('');
  const isSpecialsOnly = ref(false);
  const selectedCategorySlug = computed(() =>
    typeof route.query.category === 'string' ? route.query.category : null,
  );

  const visibleDishes = computed(() =>
    menuContent.value.dishes.filter(
      (dish) =>
        (!isSpecialsOnly.value || dish.isSpecial) && matchesDishSearch(dish, searchText.value),
    ),
  );

  const menuSections = computed(() =>
    buildMenuSections(menuContent.value, visibleDishes.value).filter(
      (section) =>
        !selectedCategorySlug.value || section.category.slug === selectedCategorySlug.value,
    ),
  );

  const selectCategory = (slug: string | null) => {
    void router.replace({ query: { ...route.query, category: slug ?? undefined } });
  };

  const isLoading = computed(() => status.value === 'pending');
  const hasError = computed(() => Boolean(error.value));
  const isEmpty = computed(
    () => !isLoading.value && !hasError.value && menuContent.value.dishes.length === 0,
  );
  const hasNoMatches = computed(() => !isEmpty.value && menuSections.value.length === 0);

  return {
    menuContent,
    menuSections,
    searchText,
    isSpecialsOnly,
    selectedCategorySlug,
    selectCategory,
    isLoading,
    hasError,
    isEmpty,
    hasNoMatches,
    reloadMenu,
  };
};
