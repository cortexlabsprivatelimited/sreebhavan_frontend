export const MenuTabs = [
  { label: 'Food items', to: '/menu' },
  { label: 'Categories', to: '/menu/categories' },
  { label: 'Menu card', to: '/menu/cards' },
];

// ---------- Categories ----------
export interface MenuCategory {
  id: string;
  name: string;
  nameMl: string;
  slug: string;
  imageUrl: string;
  sortOrder: number;
  isActive: boolean;
}
export type MenuCategoryForm = Omit<MenuCategory, 'id'>;

export interface MenuCategoryApiResponse {
  id: string;
  name: string;
  name_ml: string | null;
  slug: string;
  image_url: string | null;
  sort: number;
  active: boolean;
}

export const mapMenuCategory = (api: MenuCategoryApiResponse): MenuCategory => ({
  id: api.id,
  name: api.name,
  nameMl: api.name_ml ?? '',
  slug: api.slug,
  imageUrl: api.image_url ?? '',
  sortOrder: api.sort,
  isActive: api.active,
});

export const toMenuCategoryRequest = (
  form: MenuCategoryForm,
): Omit<MenuCategoryApiResponse, 'id'> => ({
  name: form.name.trim(),
  name_ml: form.nameMl.trim() || null,
  slug: form.slug.trim(),
  image_url: form.imageUrl || null,
  sort: Number(form.sortOrder) || 0,
  active: form.isActive,
});

export const createEmptyMenuCategoryForm = (): MenuCategoryForm => ({
  name: '',
  nameMl: '',
  slug: '',
  imageUrl: '',
  sortOrder: 0,
  isActive: true,
});

export const toMenuCategoryForm = ({ id: _id, ...form }: MenuCategory): MenuCategoryForm => form;

// ---------- Food items ----------
export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  nameMl: string;
  slug: string;
  price: number;
  imageUrl: string;
  description: string;
  isSpecial: boolean;
  isAvailable: boolean;
  sortOrder: number;
}
export type MenuItemForm = Omit<MenuItem, 'id' | 'price'> & { price: number | null };

export interface MenuItemApiResponse {
  id: string;
  category_id: string;
  name: string;
  name_ml: string | null;
  slug: string;
  price: number;
  image_url: string | null;
  description: string | null;
  is_special: boolean;
  is_available: boolean;
  sort: number;
}

export type MenuItemFlags = Partial<Pick<MenuItemApiResponse, 'is_special' | 'is_available'>>;

export const mapMenuItem = (api: MenuItemApiResponse): MenuItem => ({
  id: api.id,
  categoryId: api.category_id,
  name: api.name,
  nameMl: api.name_ml ?? '',
  slug: api.slug,
  price: api.price,
  imageUrl: api.image_url ?? '',
  description: api.description ?? '',
  isSpecial: api.is_special,
  isAvailable: api.is_available,
  sortOrder: api.sort,
});

export const toMenuItemRequest = (form: MenuItemForm): Omit<MenuItemApiResponse, 'id'> => ({
  category_id: form.categoryId,
  name: form.name.trim(),
  name_ml: form.nameMl.trim() || null,
  slug: form.slug.trim(),
  price: Number(form.price),
  image_url: form.imageUrl || null,
  description: form.description.trim() || null,
  is_special: form.isSpecial,
  is_available: form.isAvailable,
  sort: Number(form.sortOrder) || 0,
});

export const createEmptyMenuItemForm = (): MenuItemForm => ({
  categoryId: '',
  name: '',
  nameMl: '',
  slug: '',
  price: null,
  imageUrl: '',
  description: '',
  isSpecial: false,
  isAvailable: true,
  sortOrder: 0,
});

export const toMenuItemForm = ({ id: _id, ...form }: MenuItem): MenuItemForm => form;

// ---------- Menu cards (PDF or image for view / download) ----------
export interface MenuCard {
  id: string;
  title: string;
  fileUrl: string;
  isActive: boolean;
}
export type MenuCardForm = Omit<MenuCard, 'id'>;

export interface MenuCardApiResponse {
  id: string;
  title: string;
  file_url: string;
  active: boolean;
}

export const mapMenuCard = (api: MenuCardApiResponse): MenuCard => ({
  id: api.id,
  title: api.title,
  fileUrl: api.file_url,
  isActive: api.active,
});

export const toMenuCardRequest = (form: MenuCardForm): Omit<MenuCardApiResponse, 'id'> => ({
  title: form.title.trim(),
  file_url: form.fileUrl,
  active: form.isActive,
});

export const createEmptyMenuCardForm = (): MenuCardForm => ({
  title: '',
  fileUrl: '',
  isActive: true,
});

export const toMenuCardForm = ({ id: _id, ...form }: MenuCard): MenuCardForm => form;

export const isPdfUrl = (url: string): boolean =>
  url.toLowerCase().split('?')[0]?.endsWith('.pdf') ?? false;
