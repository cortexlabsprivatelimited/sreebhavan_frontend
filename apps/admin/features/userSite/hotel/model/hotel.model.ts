import type {
  PublicSpecialOffer,
  PublicBusiness,
  PublicTestimonial,
} from '~/common/types/userSite';

export interface HotelMenuCard {
  id: string;
  title: string;
  fileUrl: string;
}

export interface HotelMenuCardApiResponse {
  id: string;
  title: string;
  file_url: string;
}

export const mapHotelMenuCard = (apiCard: HotelMenuCardApiResponse): HotelMenuCard => ({
  id: apiCard.id,
  title: apiCard.title,
  fileUrl: apiCard.file_url,
});

export interface HotelContent {
  business: PublicBusiness | null;
  specialOffers: PublicSpecialOffer[];
  testimonials: PublicTestimonial[];
  menuCards: HotelMenuCard[];
}

export const createEmptyHotelContent = (): HotelContent => ({
  business: null,
  specialOffers: [],
  testimonials: [],
  menuCards: [],
});

/** Reasons to visit, shown as small highlight tiles. */
export const HotelHighlights = [
  { icon: 'leaf', title: '100% pure vegetarian', text: 'A strictly vegetarian kitchen, always.' },
  {
    icon: 'sparkle',
    title: 'Cooked fresh daily',
    text: 'Breakfast, meals and snacks made every day.',
  },
  {
    icon: 'guests',
    title: 'Family friendly',
    text: 'Comfortable seating for families and groups.',
  },
] as const;
