import type { HallBookingStatus, HallSlot } from '~/common/types/booking';
import {
  mapPublicImages,
  type PublicImage,
  type PublicImageApiResponse,
} from '~/common/types/userSite';

export interface Hall {
  name: string;
  seatingCapacity: number;
  floatingCapacity: number;
  facilities: string[];
  rules: string[];
  images: PublicImage[];
}

export interface HallApiResponse {
  name: string;
  capacity_seating: number;
  capacity_floating: number;
  facilities: string[] | null;
  rules: string | null;
  images: PublicImageApiResponse[] | null;
}

export const mapHall = (apiHall: HallApiResponse): Hall => ({
  name: apiHall.name,
  seatingCapacity: apiHall.capacity_seating,
  floatingCapacity: apiHall.capacity_floating,
  facilities: apiHall.facilities ?? [],
  rules: (apiHall.rules ?? '')
    .split('\n')
    .map((rule) => rule.trim())
    .filter(Boolean),
  images: mapPublicImages(apiHall.images),
});

export interface HallPackage {
  id: string;
  name: string;
  price: number;
  inclusions: string[];
}

export interface HallPackageApiResponse {
  id: string;
  name: string;
  price: number;
  inclusions: string[] | null;
  sort: number;
}

export const mapHallPackages = (apiPackages: HallPackageApiResponse[]): HallPackage[] =>
  [...apiPackages]
    .sort((first, second) => first.sort - second.sort)
    .map((apiPackage) => ({
      id: apiPackage.id,
      name: apiPackage.name,
      price: apiPackage.price,
      inclusions: apiPackage.inclusions ?? [],
    }));

export interface EventHallContent {
  hall: Hall | null;
  packages: HallPackage[];
}

export const createEmptyEventHallContent = (): EventHallContent => ({ hall: null, packages: [] });

/** One taken slot from GET /public/hall/availability. Customer details are never sent. */
export interface HallAvailabilityEntry {
  date: string;
  slot: HallSlot;
  status: HallBookingStatus;
}

/** What a guest sees for one slot of one day. */
export type HallSlotState = HallBookingStatus | 'available' | 'past';

export type HallDayAvailability = Record<HallSlot, HallSlotState>;
