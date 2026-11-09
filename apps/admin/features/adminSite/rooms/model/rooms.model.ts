import { mapPhoto, type Photo, type PhotoApiResponse } from '~/common/types/photo';
import { joinCommaList, sortBySortOrder, splitCommaList } from '~/common/utils/listHelpers';

export interface Room {
  id: string;
  slug: string;
  name: string;
  pricePerNight: number;
  capacity: number;
  amenities: string[];
  description: string;
  isActive: boolean;
  images: Photo[];
}

/** Photo inside the room form. `id` is null until the photo is saved to the room. */
export interface RoomFormPhoto {
  key: string;
  id: string | null;
  url: string;
  alt: string;
}

export interface RoomForm {
  name: string;
  slug: string;
  pricePerNight: number | null;
  capacity: number | null;
  amenitiesText: string;
  description: string;
  isActive: boolean;
  photos: RoomFormPhoto[];
  /** Saved photos the admin removed in the form; deleted when the room is saved. */
  removedPhotoIds: string[];
}

export interface RoomApiResponse {
  id: string;
  slug: string;
  name: string;
  price: number;
  capacity: number;
  amenities: string[];
  description: string | null;
  active: boolean;
  images: PhotoApiResponse[];
}

export type RoomRequest = Omit<RoomApiResponse, 'id' | 'images'>;

export const mapRoom = (apiRoom: RoomApiResponse): Room => ({
  id: apiRoom.id,
  slug: apiRoom.slug,
  name: apiRoom.name,
  pricePerNight: apiRoom.price,
  capacity: apiRoom.capacity,
  amenities: apiRoom.amenities,
  description: apiRoom.description ?? '',
  isActive: apiRoom.active,
  images: sortBySortOrder(apiRoom.images.map(mapPhoto)),
});

export const toRoomRequest = (form: RoomForm): RoomRequest => ({
  slug: form.slug.trim(),
  name: form.name.trim(),
  price: Number(form.pricePerNight),
  capacity: Number(form.capacity),
  amenities: splitCommaList(form.amenitiesText),
  description: form.description.trim() || null,
  active: form.isActive,
});

export const createEmptyRoomForm = (): RoomForm => ({
  name: '',
  slug: '',
  pricePerNight: null,
  capacity: 2,
  amenitiesText: '',
  description: '',
  isActive: true,
  photos: [],
  removedPhotoIds: [],
});

export const toRoomForm = (room: Room): RoomForm => ({
  name: room.name,
  slug: room.slug,
  pricePerNight: room.pricePerNight,
  capacity: room.capacity,
  amenitiesText: joinCommaList(room.amenities),
  description: room.description,
  isActive: room.isActive,
  photos: room.images.map((image) => ({
    key: image.id,
    id: image.id,
    url: image.url,
    alt: image.alt,
  })),
  removedPhotoIds: [],
});
