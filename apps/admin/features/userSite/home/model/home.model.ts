import type { AppIconName } from '~/common/constants/appIcons';
import { SiteRoutes } from '~/common/constants/userSiteNavigation';
import type { EnquiryType } from '~/common/types/booking';
import type { PublicTestimonial } from '~/common/types/userSite';

/** A "today's special" dish shown on the home page. */
export interface HomeSpecialDish {
  id: string;
  name: string;
  nameMalayalam: string | null;
  price: number;
  imageUrl: string | null;
  description: string | null;
}

export interface HomeSpecialDishApiResponse {
  id: string;
  category_id: string;
  name: string;
  name_ml: string | null;
  slug: string;
  price: number;
  image_url: string | null;
  description: string | null;
  is_special: boolean;
  sort: number;
}

export const mapHomeSpecialDish = (apiItem: HomeSpecialDishApiResponse): HomeSpecialDish => ({
  id: apiItem.id,
  name: apiItem.name,
  nameMalayalam: apiItem.name_ml,
  price: apiItem.price,
  imageUrl: apiItem.image_url,
  description: apiItem.description,
});

export interface HomeContent {
  specials: HomeSpecialDish[];
  testimonials: PublicTestimonial[];
  /** Number of rooms at Sreebhavanam, shown on the group story card (0 hides it). */
  roomCount: number;
}

export const createEmptyHomeContent = (): HomeContent => ({
  specials: [],
  testimonials: [],
  roomCount: 0,
});

/** Text of the home hero (the building photo section). */
export const HomeHeroContent = {
  eyebrow: 'Pure vegetarian · Kerala heritage',
  title: 'Pure vegetarian taste,',
  titleAccent: 'served with tradition.',
  subtitle:
    'Authentic Kerala vegetarian cooking at Sreebhavan Veg Hotel, restful rooms and a grand event hall at Sreebhavanam, all with the warmth of home.',
  imageAlt: 'Front view of the Sreebhavanam building with its landscaped garden',
} as const;

/** The hero's quick availability bar. */
export interface QuickAvailabilityForm {
  experience: EnquiryType;
  date: string;
  guests: number | null;
}

export const createQuickAvailabilityForm = (): QuickAvailabilityForm => ({
  experience: 'hall',
  date: '',
  guests: null,
});

export const QuickAvailabilityExperiences: { value: EnquiryType; label: string }[] = [
  { value: 'hall', label: 'Grand event hall' },
  { value: 'room', label: 'Room stay' },
  { value: 'hotel', label: 'Veg hotel dining' },
];

export const HomeTrustPoints = [
  '100% pure vegetarian kitchen',
  'Event hall for weddings & functions',
  'Clean, comfortable rooms',
] as const;

/** "The Sreebhavan Group" story section under the hero. Edit the wording here. */
export const HomeGroupStory = {
  eyebrow: 'The Sreebhavan Group',
  title: 'One family,',
  titleAccent: 'two homes of hospitality.',
  paragraphs: [
    'Sreebhavan began with a simple promise: honest, pure vegetarian Kerala food served with the warmth of home.',
    'Today the Sreebhavan Group welcomes you in two ways. Sreebhavan Veg Hotel for everyday meals, and Sreebhavanam for restful stays and grand celebrations, all under one trusted family name.',
  ],
  values: [
    {
      icon: 'leaf',
      title: 'Pure vegetarian, always',
      text: 'One kitchen promise across the group.',
    },
    {
      icon: 'lotus',
      title: 'Kerala traditions',
      text: 'Recipes, rituals and hospitality we grew up with.',
    },
    { icon: 'guests', title: 'Family-run care', text: 'Every guest is looked after like our own.' },
  ] satisfies { icon: AppIconName; title: string; text: string }[],
  imageAlt: 'The Sreebhavanam building, home of the Sreebhavan Group',
} as const;

/** One business of the group, shown as a large brand card. `businessKey` reads the admin's data. */
export interface HomeBrand {
  businessKey: 'hotel' | 'hallAndRooms';
  isDark: boolean;
  eyebrow: string;
  fallbackName: string;
  fallbackAbout: string;
  points: string[];
  primaryAction: { label: string; to: string };
  secondaryAction: { label: string; to: string };
}

export const HomeBrands: HomeBrand[] = [
  {
    businessKey: 'hotel',
    isDark: true,
    eyebrow: 'Dine with us',
    fallbackName: 'Sreebhavan Veg Hotel',
    fallbackAbout:
      'Traditional Kerala breakfast, full meals and evening snacks, cooked fresh every day and served pure vegetarian.',
    points: ['Kerala breakfast & full meals', "Today's specials every day", 'Evening tea & snacks'],
    primaryAction: { label: 'See the menu', to: SiteRoutes.menu },
    secondaryAction: { label: 'About the hotel', to: SiteRoutes.hotel },
  },
  {
    businessKey: 'hallAndRooms',
    isDark: false,
    eyebrow: 'Stay & celebrate',
    fallbackName: 'Sreebhavanam',
    fallbackAbout:
      'A grand event hall for weddings and family functions, with clean, quiet rooms for your guests just steps away.',
    points: [
      'Event hall for weddings & functions',
      'AC and non-AC rooms',
      'Live hall date availability',
    ],
    primaryAction: { label: 'Check hall dates', to: SiteRoutes.hallAvailability },
    secondaryAction: { label: 'View rooms', to: SiteRoutes.rooms },
  },
];
