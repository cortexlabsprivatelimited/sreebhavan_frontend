import { AppConfig } from '~/common/constants/appConfig';

/** Every route of the public user site. Links use these, never hand-written paths. */
export const SiteRoutes = {
  home: '/',
  specialOffers: '/offers',
  hotel: `/${AppConfig.businessSlugs.hotel}`,
  menu: `/${AppConfig.businessSlugs.hotel}/menu`,
  sreebhavanam: `/${AppConfig.businessSlugs.hallAndRooms}`,
  rooms: `/${AppConfig.businessSlugs.hallAndRooms}/rooms`,
  roomBySlug: (slug: string) => `/${AppConfig.businessSlugs.hallAndRooms}/rooms/${slug}`,
  eventHall: `/${AppConfig.businessSlugs.hallAndRooms}/event-hall`,
  hallAvailability: `/${AppConfig.businessSlugs.hallAndRooms}/event-hall/availability`,
  gallery: '/gallery',
  galleryAlbumBySlug: (slug: string) => `/gallery/${slug}`,
  about: '/about',
  contact: '/contact',
  faq: '/faq',
  enquiry: '/enquiry',
} as const;

export interface SiteNavItem {
  label: string;
  to: string;
}

/** Header links of the user site. */
export const SiteHeaderNavigation: SiteNavItem[] = [
  { label: 'Home', to: SiteRoutes.home },
  { label: 'Veg Hotel', to: SiteRoutes.hotel },
  { label: 'Menu', to: SiteRoutes.menu },
  { label: 'Rooms', to: SiteRoutes.rooms },
  { label: 'Event Hall', to: SiteRoutes.eventHall },
  { label: 'Gallery', to: SiteRoutes.gallery },
  { label: 'Contact', to: SiteRoutes.contact },
];

/** Footer link columns of the user site. */
export const SiteFooterNavigation: { title: string; items: SiteNavItem[] }[] = [
  {
    title: 'Dining',
    items: [
      { label: 'About the hotel', to: SiteRoutes.hotel },
      { label: 'Menu', to: SiteRoutes.menu },
    ],
  },
  {
    title: 'Stay & celebrate',
    items: [
      { label: 'Sreebhavanam', to: SiteRoutes.sreebhavanam },
      { label: 'Rooms', to: SiteRoutes.rooms },
      { label: 'Event hall', to: SiteRoutes.eventHall },
      { label: 'Hall availability', to: SiteRoutes.hallAvailability },
    ],
  },
  {
    title: 'More',
    items: [
      { label: 'Special offers', to: SiteRoutes.specialOffers },
      { label: 'Gallery', to: SiteRoutes.gallery },
      { label: 'About us', to: SiteRoutes.about },
      { label: 'FAQs', to: SiteRoutes.faq },
      { label: 'Contact', to: SiteRoutes.contact },
      { label: 'Send an enquiry', to: SiteRoutes.enquiry },
    ],
  },
];

/** Query the enquiry page reads to pre-fill its form. */
export interface EnquiryLinkQuery {
  type?: 'room' | 'hall' | 'hotel';
  room?: string;
  date?: string;
  slot?: 'morning' | 'evening' | 'full';
  guests?: string;
}

/** '/enquiry?type=hall&date=2026-12-12&slot=evening' */
export const buildEnquiryLink = (query: EnquiryLinkQuery): string => {
  const params = new URLSearchParams(
    Object.entries(query).filter((entry): entry is [string, string] => Boolean(entry[1])),
  ).toString();
  return params ? `${SiteRoutes.enquiry}?${params}` : SiteRoutes.enquiry;
};
