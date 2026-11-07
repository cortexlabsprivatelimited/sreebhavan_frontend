import { joinCommaList, splitCommaList } from '~/common/utils/listHelpers';

export const EventHallTabs = [
  { label: 'Hall details', to: '/event-hall' },
  { label: 'Packages', to: '/event-hall/packages' },
  { label: 'Photos', to: '/event-hall/photos' },
];

// ---------- Hall details (one record) ----------
export interface EventHallDetails {
  name: string;
  seatingCapacity: number;
  floatingCapacity: number;
  facilities: string[];
  rules: string;
}

export interface EventHallForm {
  name: string;
  seatingCapacity: number | null;
  floatingCapacity: number | null;
  facilitiesText: string;
  rules: string;
}

export interface EventHallApiResponse {
  name: string;
  capacity_seating: number;
  capacity_floating: number;
  facilities: string[];
  rules: string | null;
}

export const mapEventHall = (api: EventHallApiResponse): EventHallDetails => ({
  name: api.name,
  seatingCapacity: api.capacity_seating,
  floatingCapacity: api.capacity_floating,
  facilities: api.facilities,
  rules: api.rules ?? '',
});

export const toEventHallForm = (hall: EventHallDetails | null): EventHallForm => ({
  name: hall?.name ?? '',
  seatingCapacity: hall?.seatingCapacity ?? null,
  floatingCapacity: hall?.floatingCapacity ?? null,
  facilitiesText: joinCommaList(hall?.facilities ?? []),
  rules: hall?.rules ?? '',
});

export const toEventHallRequest = (form: EventHallForm): EventHallApiResponse => ({
  name: form.name.trim(),
  capacity_seating: Number(form.seatingCapacity),
  capacity_floating: Number(form.floatingCapacity),
  facilities: splitCommaList(form.facilitiesText),
  rules: form.rules.trim() || null,
});

// ---------- Packages ----------
export interface HallPackage {
  id: string;
  name: string;
  price: number;
  inclusions: string[];
  sortOrder: number;
}

export interface HallPackageForm {
  name: string;
  price: number | null;
  inclusionsText: string;
  sortOrder: number;
}

export interface HallPackageApiResponse {
  id: string;
  name: string;
  price: number;
  inclusions: string[];
  sort: number;
}

export const mapHallPackage = (api: HallPackageApiResponse): HallPackage => ({
  id: api.id,
  name: api.name,
  price: api.price,
  inclusions: api.inclusions,
  sortOrder: api.sort,
});

export const toHallPackageRequest = (
  form: HallPackageForm,
): Omit<HallPackageApiResponse, 'id'> => ({
  name: form.name.trim(),
  price: Number(form.price),
  inclusions: splitCommaList(form.inclusionsText),
  sort: Number(form.sortOrder) || 0,
});

export const createEmptyHallPackageForm = (): HallPackageForm => ({
  name: '',
  price: null,
  inclusionsText: '',
  sortOrder: 0,
});

export const toHallPackageForm = (hallPackage: HallPackage): HallPackageForm => ({
  name: hallPackage.name,
  price: hallPackage.price,
  inclusionsText: joinCommaList(hallPackage.inclusions),
  sortOrder: hallPackage.sortOrder,
});
