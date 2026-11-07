/** Photo with required alt text, used by rooms and the event hall. */
export interface Photo {
  id: string;
  url: string;
  alt: string;
  sortOrder: number;
}

export interface PhotoApiResponse {
  id: string;
  url: string;
  alt: string;
  sort: number;
}

export interface CreatePhotoRequest {
  url: string;
  alt: string;
  sort: number;
}

export const mapPhoto = (apiPhoto: PhotoApiResponse): Photo => ({
  id: apiPhoto.id,
  url: apiPhoto.url,
  alt: apiPhoto.alt,
  sortOrder: apiPhoto.sort,
});
