import type {
  PublicSpecialOffer,
  PublicBusiness,
  PublicRoom,
  PublicTestimonial,
} from '~/common/types/userSite';

/** The few hall facts the overview page shows. */
export interface SreebhavanamHallSummary {
  name: string;
  seatingCapacity: number;
  floatingCapacity: number;
}

export interface SreebhavanamHallApiResponse {
  name: string;
  capacity_seating: number;
  capacity_floating: number;
}

export const mapSreebhavanamHallSummary = (
  apiHall: SreebhavanamHallApiResponse,
): SreebhavanamHallSummary => ({
  name: apiHall.name,
  seatingCapacity: apiHall.capacity_seating,
  floatingCapacity: apiHall.capacity_floating,
});

export interface SreebhavanamContent {
  business: PublicBusiness | null;
  specialOffers: PublicSpecialOffer[];
  rooms: PublicRoom[];
  hall: SreebhavanamHallSummary | null;
  testimonials: PublicTestimonial[];
}

export const createEmptySreebhavanamContent = (): SreebhavanamContent => ({
  business: null,
  specialOffers: [],
  rooms: [],
  hall: null,
  testimonials: [],
});
