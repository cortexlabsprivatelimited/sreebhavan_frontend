/**
 * All static image paths under public/images/.
 * Images uploaded by the admin come from the API as full URLs and are not listed here.
 */
const IMAGES_ROOT = '/images';

export const ImageConstants = {
  logos: {
    brand: `${IMAGES_ROOT}/logos/sreebhavan_brand_logo.svg`,
    hotel: `${IMAGES_ROOT}/logos/sreebhavan_hotel_logo.svg`,
    hallAndRooms: `${IMAGES_ROOT}/logos/sreebhavanam_hall_rooms_logo.svg`,
    favicon: '/favicon.ico',
  },
  icons: {
    whatsapp: `${IMAGES_ROOT}/icons/whatsapp_icon.svg`,
    phone: `${IMAGES_ROOT}/icons/phone_icon.svg`,
    location: `${IMAGES_ROOT}/icons/location_icon.svg`,
    vegMark: `${IMAGES_ROOT}/icons/veg_mark_icon.svg`,
  },
  placeholders: {
    room: `${IMAGES_ROOT}/placeholders/room_placeholder.webp`,
    food: `${IMAGES_ROOT}/placeholders/food_placeholder.webp`,
    gallery: `${IMAGES_ROOT}/placeholders/gallery_placeholder.webp`,
    avatar: `${IMAGES_ROOT}/placeholders/avatar_placeholder.webp`,
    image: `${IMAGES_ROOT}/placeholders/image_placeholder.svg`,
  },
  backgrounds: {
    homeHero: `${IMAGES_ROOT}/backgrounds/home_hero_background.webp`,
  },
} as const;

/**
 * Upload folder names used by the API in Supabase Storage.
 * The admin sends one of these as the `folder` field to POST /admin/uploads.
 * Must stay in sync with the FastAPI storage settings.
 */
export const StorageFolders = {
  logos: 'logos',
  banners: 'banners',
  menuItems: 'menu/items',
  menuCards: 'menu/cards',
  rooms: 'rooms',
  hall: 'hall',
  gallery: 'gallery',
  testimonials: 'testimonials',
  seo: 'seo',
} as const;

export type StorageFolder = (typeof StorageFolders)[keyof typeof StorageFolders];
