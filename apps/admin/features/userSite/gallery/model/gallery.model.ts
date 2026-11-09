import { AppStrings } from '~/common/constants/appStrings';

export type GalleryCategory = keyof typeof AppStrings.galleryCategory;
export const GalleryCategories = Object.keys(AppStrings.galleryCategory) as GalleryCategory[];

export interface GalleryAlbum {
  id: string;
  slug: string;
  title: string;
  category: GalleryCategory;
  coverUrl: string | null;
  imageCount: number;
}

export interface GalleryAlbumApiResponse {
  id: string;
  slug: string;
  title: string;
  category: GalleryCategory;
  cover_url: string | null;
  sort: number;
  image_count: number;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  thumbUrl: string;
  alt: string;
  caption: string | null;
}

export interface GalleryPhotoApiResponse {
  id: string;
  url: string;
  thumb_url: string | null;
  alt: string;
  caption: string | null;
  sort: number;
}

export interface GalleryAlbumDetails extends GalleryAlbum {
  photos: GalleryPhoto[];
}

export interface GalleryAlbumDetailsApiResponse extends GalleryAlbumApiResponse {
  images: GalleryPhotoApiResponse[] | null;
}

export const mapGalleryAlbum = (apiAlbum: GalleryAlbumApiResponse): GalleryAlbum => ({
  id: apiAlbum.id,
  slug: apiAlbum.slug,
  title: apiAlbum.title,
  category: apiAlbum.category,
  coverUrl: apiAlbum.cover_url,
  imageCount: apiAlbum.image_count,
});

export const mapGalleryAlbums = (apiAlbums: GalleryAlbumApiResponse[]): GalleryAlbum[] =>
  [...apiAlbums].sort((first, second) => first.sort - second.sort).map(mapGalleryAlbum);

export const mapGalleryAlbumDetails = (
  apiAlbum: GalleryAlbumDetailsApiResponse,
): GalleryAlbumDetails => {
  const photos = [...(apiAlbum.images ?? [])]
    .sort((first, second) => first.sort - second.sort)
    .map((apiPhoto) => ({
      id: apiPhoto.id,
      url: apiPhoto.url,
      thumbUrl: apiPhoto.thumb_url ?? apiPhoto.url,
      alt: apiPhoto.alt,
      caption: apiPhoto.caption,
    }));
  return { ...mapGalleryAlbum(apiAlbum), imageCount: photos.length, photos };
};
