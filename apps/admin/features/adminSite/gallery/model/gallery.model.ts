// ---------- Albums ----------
export type GalleryCategory = 'rooms' | 'hall' | 'past-events' | 'food' | 'exterior';

export const GalleryCategoryOptions: { label: string; value: GalleryCategory }[] = [
  { label: 'Rooms', value: 'rooms' },
  { label: 'Hall', value: 'hall' },
  { label: 'Past events', value: 'past-events' },
  { label: 'Food', value: 'food' },
  { label: 'Exterior', value: 'exterior' },
];

export interface GalleryAlbum {
  id: string;
  slug: string;
  title: string;
  category: GalleryCategory;
  coverUrl: string;
  sortOrder: number;
  isActive: boolean;
  imageCount: number;
}

export type GalleryAlbumForm = Omit<GalleryAlbum, 'id' | 'imageCount'>;

export interface GalleryAlbumApiResponse {
  id: string;
  slug: string;
  title: string;
  category: GalleryCategory;
  cover_url: string | null;
  sort: number;
  active: boolean;
  image_count: number;
}

export const mapGalleryAlbum = (api: GalleryAlbumApiResponse): GalleryAlbum => ({
  id: api.id,
  slug: api.slug,
  title: api.title,
  category: api.category,
  coverUrl: api.cover_url ?? '',
  sortOrder: api.sort,
  isActive: api.active,
  imageCount: api.image_count,
});

export const toGalleryAlbumRequest = (form: GalleryAlbumForm) => ({
  slug: form.slug.trim(),
  title: form.title.trim(),
  category: form.category,
  cover_url: form.coverUrl || null,
  sort: Number(form.sortOrder) || 0,
  active: form.isActive,
});

export const createEmptyGalleryAlbumForm = (): GalleryAlbumForm => ({
  slug: '',
  title: '',
  category: 'past-events',
  coverUrl: '',
  sortOrder: 0,
  isActive: true,
});

export const toGalleryAlbumForm = ({
  id: _id,
  imageCount: _imageCount,
  ...form
}: GalleryAlbum): GalleryAlbumForm => form;

export const getGalleryCategoryLabel = (category: GalleryCategory): string =>
  GalleryCategoryOptions.find((option) => option.value === category)?.label ?? category;

// ---------- Images ----------
export interface GalleryImage {
  id: string;
  albumId: string;
  url: string;
  thumbUrl: string;
  alt: string;
  caption: string;
  sortOrder: number;
}

export interface GalleryImageApiResponse {
  id: string;
  album_id: string;
  url: string;
  thumb_url: string | null;
  alt: string;
  caption: string | null;
  sort: number;
}

export interface GalleryImageEditForm {
  alt: string;
  caption: string;
  sortOrder: number;
}

/** A file in the bulk-upload queue: uploaded to storage, waiting for alt text before saving. */
export interface PendingGalleryUpload {
  key: string;
  fileName: string;
  url: string | null;
  thumbUrl: string | null;
  alt: string;
  caption: string;
  isUploading: boolean;
  errorMessage: string | null;
}

/** POST /admin/gallery/images: several images for one album in one request. */
export interface CreateGalleryImagesRequest {
  album_id: string;
  images: {
    url: string;
    thumb_url: string | null;
    alt: string;
    caption: string | null;
    sort: number;
  }[];
}

export const mapGalleryImage = (api: GalleryImageApiResponse): GalleryImage => ({
  id: api.id,
  albumId: api.album_id,
  url: api.url,
  thumbUrl: api.thumb_url ?? api.url,
  alt: api.alt,
  caption: api.caption ?? '',
  sortOrder: api.sort,
});

export const toGalleryImageEditRequest = (form: GalleryImageEditForm) => ({
  alt: form.alt.trim(),
  caption: form.caption.trim() || null,
  sort: Number(form.sortOrder) || 0,
});
