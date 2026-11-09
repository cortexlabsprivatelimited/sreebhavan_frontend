export interface MenuCategory {
  id: string;
  slug: string;
  name: string;
  nameMalayalam: string | null;
  imageUrl: string | null;
}

export interface MenuCategoryApiResponse {
  id: string;
  name: string;
  name_ml: string | null;
  slug: string;
  image_url: string | null;
  sort: number;
}

export interface MenuDish {
  id: string;
  categoryId: string;
  name: string;
  nameMalayalam: string | null;
  price: number;
  imageUrl: string | null;
  description: string | null;
  isSpecial: boolean;
}

export interface MenuDishApiResponse {
  id: string;
  category_id: string;
  name: string;
  name_ml: string | null;
  slug: string;
  price: number;
  image_url: string | null;
  description: string | null;
  is_special: boolean;
  sort: number;
}

export interface MenuCardFile {
  id: string;
  title: string;
  fileUrl: string;
}

export interface MenuCardFileApiResponse {
  id: string;
  title: string;
  file_url: string;
}

export interface MenuContent {
  categories: MenuCategory[];
  dishes: MenuDish[];
  menuCards: MenuCardFile[];
}

/** One category with its dishes, as rendered on the menu page. */
export interface MenuSection {
  category: MenuCategory;
  dishes: MenuDish[];
}

export const createEmptyMenuContent = (): MenuContent => ({
  categories: [],
  dishes: [],
  menuCards: [],
});

const bySort = <T extends { sort: number }>(items: T[]) =>
  [...items].sort((first, second) => first.sort - second.sort);

export const mapMenuCategories = (apiCategories: MenuCategoryApiResponse[]): MenuCategory[] =>
  bySort(apiCategories).map((apiCategory) => ({
    id: apiCategory.id,
    slug: apiCategory.slug,
    name: apiCategory.name,
    nameMalayalam: apiCategory.name_ml,
    imageUrl: apiCategory.image_url,
  }));

export const mapMenuDishes = (apiDishes: MenuDishApiResponse[]): MenuDish[] =>
  bySort(apiDishes).map((apiDish) => ({
    id: apiDish.id,
    categoryId: apiDish.category_id,
    name: apiDish.name,
    nameMalayalam: apiDish.name_ml,
    price: apiDish.price,
    imageUrl: apiDish.image_url,
    description: apiDish.description,
    isSpecial: apiDish.is_special,
  }));

export const mapMenuCardFiles = (apiCards: MenuCardFileApiResponse[]): MenuCardFile[] =>
  apiCards.map((apiCard) => ({ id: apiCard.id, title: apiCard.title, fileUrl: apiCard.file_url }));
