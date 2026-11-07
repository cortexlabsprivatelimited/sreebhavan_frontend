---
name: nuxt-frontend-rules
description: Architecture, naming and styling rules for the Sreebhavan Nuxt frontends (apps/web user site and apps/admin panel). Use before creating or changing any page, feature module, component, controller, model, repository, color, text style, API URL or image path in either Nuxt app, and when setting up a new Nuxt app in this repo.
---

# Sreebhavan Frontend Rules

These rules apply to both Nuxt 3 apps in the monorepo:

- `apps/web`: public user website (SSR, SEO)
- `apps/admin`: admin panel (SPA, login required)
- `api`: FastAPI backend (not covered here); the frontends talk only to this API, never to Supabase directly

Follow every rule below when you create or change frontend code. If a rule blocks a task, stop and ask; don't work around it.

When setting up a new app, create the common files from section 13 first, then build features on top of them.

## 1. Folder structure

Each Nuxt app uses the same layout:

```
apps/<web|admin>/
├── nuxt.config.ts
├── tailwind.config.ts          # reads colors from common/constants/appColors.ts
├── app.vue
├── pages/                      # route files only; each one renders a feature screen
├── layouts/                    # default.vue, admin.vue, auth.vue
├── middleware/                 # route guards (e.g. adminAuth.ts)
├── plugins/
├── public/
│   └── images/                 # static images; paths live in imageConstants.ts
│       ├── logos/
│       ├── icons/
│       ├── placeholders/
│       └── backgrounds/
├── common/                     # shared by all features
│   ├── constants/
│   │   ├── appColors.ts        # all color codes as strings
│   │   ├── apiConstants.ts     # all API endpoint paths
│   │   ├── imageConstants.ts   # all static image paths + storage folders
│   │   ├── appStrings.ts       # repeated labels, WhatsApp message templates
│   │   └── appConfig.ts        # business slugs, page sizes, other app-wide values
│   ├── styles/
│   │   ├── textStyles.ts       # heading, subheading, body, caption ... styles
│   │   └── main.css            # Tailwind layers + font imports only
│   ├── widgets/                # shared UI components (AppButton, AppLoader ...)
│   ├── services/
│   │   └── apiClient.ts        # the only HTTP client; adds base URL and auth token
│   ├── types/                  # shared types (ApiError, Paginated)
│   └── utils/                  # pure helpers (formatPrice, formatDate, buildWhatsAppUrl)
└── features/
    └── <featureName>/          # one folder per module: home, login, rooms ...
        ├── ui/
        │   ├── <Feature>Screen.vue
        │   └── widgets/
        │       └── <Feature><Part>.vue
        ├── controller/
        │   └── use<Feature>Controller.ts
        ├── model/
        │   └── <feature>.model.ts
        └── domain/
            └── <feature>.repository.ts
```

### Feature modules

| App | Feature folders |
|---|---|
| apps/web | home, hotel, menu, rooms, eventHall, gallery, about, contact, enquiry |
| apps/admin | login, dashboard, siteSettings, businesses, banners, menu, rooms, eventHall, hallCalendar, enquiries, gallery, testimonials, faqs, seo, adminUsers |

Add a new feature folder only for a new screen area. Don't make a folder for one widget.

### Nuxt config needed for this layout

```ts
// nuxt.config.ts (relevant parts)
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@pinia/nuxt', '@nuxt/eslint'],
  css: ['~/common/styles/main.css'],
  // Feature and common components are imported explicitly, not auto-registered.
  components: { dirs: [] },
  typescript: { strict: true },
  runtimeConfig: {
    public: {
      apiBaseUrl: '', // set with NUXT_PUBLIC_API_BASE_URL
    },
  },
});
```

`apps/web` adds `@nuxtjs/seo`. `apps/admin` sets `ssr: false` and `robots: noindex` on every route.

## 2. What each layer does

Data flows one way:

```
pages/*.vue → ui/<Feature>Screen.vue → controller → domain (repository) → common/services/apiClient → FastAPI
                     ↑ widgets              ↑ state        ↑ maps API JSON to model
```

| Layer | Contains | Must not |
|---|---|---|
| `pages/` | Render the feature screen, set route meta, call `useSeoMeta` (web) | Hold UI markup, state, or API calls |
| `ui/<Feature>Screen.vue` | Page layout; puts widgets together; reads state from the controller | Call the API or the repository directly |
| `ui/widgets/` | One visual part per file (banner, card, list, form, dialog). Props in, events out | Call the API or use a controller |
| `controller/` | Composable `use<Feature>Controller()` holding reactive state (`isLoading`, `hasError`, data) and actions (`loadRooms`, `submitEnquiry`). Use Pinia only when state must be shared across pages | Contain markup or raw `$fetch` calls |
| `model/` | TypeScript interfaces (`Room`, `RoomImage`), API response types (`RoomApiResponse`), request types (`CreateEnquiryRequest`), mapper functions (`mapRoom`) | Import Vue or call the API |
| `domain/` | Repository composable: the only place that calls `apiClient` for this feature, using `ApiConstants`. Returns models, not raw JSON. Business rules for the feature (e.g. `isDateBookable`) | Touch UI state or components |

### Cross-feature rules

- A feature never imports from another feature's folder. If two features need the same thing, move it to `common/`.
- Shared widgets used by two or more features go in `common/widgets/` with an `App` prefix.
- Import with the `~/` alias and explicit imports; don't rely on auto-import for feature or common files.

## 3. Naming rules

Names must say what the thing is or does. No `data`, `temp`, `test2`, `newFile`, `Component1`, `handleClick2`.

| Item | Style | Examples |
|---|---|---|
| Feature folder | camelCase | `eventHall`, `hallCalendar`, `siteSettings` |
| Screen component | PascalCase, ends with `Screen` | `RoomsScreen.vue`, `LoginScreen.vue` |
| Widget component | PascalCase, feature prefix + part | `RoomsListCard.vue`, `HomeHeroBanner.vue`, `HallAvailabilityCalendar.vue` |
| Shared widget | PascalCase, `App` prefix | `AppButton.vue`, `AppSectionTitle.vue`, `AppWhatsAppButton.vue` |
| Controller | `use` + Feature + `Controller` | `useRoomsController.ts` |
| Model file | camelCase feature + `.model.ts` | `rooms.model.ts` |
| Repository file | camelCase feature + `.repository.ts` | `rooms.repository.ts` |
| Repository composable | `use` + Feature + `Repository` | `useRoomsRepository().getRoomBySlug(slug)` |
| Interface / type | PascalCase noun | `Room`, `HallBooking`, `EnquiryStatus` |
| Constant object | PascalCase | `AppColors`, `ApiConstants`, `ImageConstants`, `TextStyles` |
| Function / action | camelCase, verb first | `loadRooms`, `submitEnquiry`, `markDateAsBooked` |
| Boolean | `is` / `has` / `can` prefix | `isLoading`, `hasError`, `canSubmit` |
| Emitted event | kebab-case verb | `@select-room`, `@submit-enquiry` |
| Route file | kebab-case, matches the URL | `pages/sreebhavanam/event-hall/availability.vue` |
| Image file | snake_case, describes the image | `sreebhavan_hotel_logo.svg`, `room_placeholder.webp` |

## 4. Colors: `common/constants/appColors.ts`

- Every color code is a string in `AppColors`. No other file writes a hex, rgb or named color.
- `tailwind.config.ts` reads `AppColors`, so components use classes like `bg-primary`, `text-textSecondary`, `border-border`.
- To change a brand color, edit `AppColors` only.
- Hall calendar status colors (booked, tentative, available) also live here.
- If a color is needed in TypeScript (meta theme-color, canvas), import it: `AppColors.primary`.

```html
<!-- Wrong -->
<div style="color:#1F7A3A" class="bg-[#C8962E]">

<!-- Right -->
<div class="text-primary bg-secondary">
```

## 5. Text styles: `common/styles/textStyles.ts`

- Every font family, size, weight, line height and text color combination is a named style in `TextStyles`: `displayTitle`, `heading`, `subheading`, `sectionTitle`, `cardTitle`, `body`, `bodySmall`, `caption`, `label`, `button`, `price`, `link`, `errorText`.
- Components take text styling only from `TextStyles`. Don't write `text-2xl font-bold` directly on text elements.
- Layout classes (margin, padding, flex, grid, width) are fine inline; they aren't text styles.
- A new style goes into `TextStyles` with a clear name, never inline.

```vue
<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';
</script>

<template>
  <h1 :class="[TextStyles.heading, 'mb-4']">Our Rooms</h1>
  <p :class="TextStyles.body">Clean AC and non-AC rooms.</p>
</template>
```

## 6. API URLs: `common/constants/apiConstants.ts`

- Every endpoint path is in `ApiConstants`, grouped as `public` and `admin`, matching the FastAPI routes under `/api/v1`.
- Paths with ids or slugs are functions: `ApiConstants.public.roomBySlug(slug)`.
- The base URL comes from `runtimeConfig.public.apiBaseUrl` (env `NUXT_PUBLIC_API_BASE_URL`). Never write a domain or localhost in code.
- Only `common/services/apiClient.ts` calls `$fetch`. Repositories call `apiClient` with an `ApiConstants` path.
- When an endpoint changes in FastAPI, update `ApiConstants` in the same change.

```ts
// Wrong
await $fetch('https://api.sreebhavan.com/api/v1/public/rooms');

// Right (inside rooms.repository.ts)
await apiClient.get(ApiConstants.public.rooms);
```

## 7. Images: `common/constants/imageConstants.ts`

- Every static image path under `public/images/` is in `ImageConstants`, grouped as `logos`, `icons`, `placeholders`, `backgrounds`.
- Templates use `ImageConstants.logos.hotel`, never `'/images/logos/...'`.
- Images uploaded by the admin (rooms, gallery, menu) come from the API as full URLs. Don't build Supabase URLs in the frontend.
- `StorageFolders` in the same file lists the upload folder names the API uses. The admin sends one as the `folder` field on upload. Keep it in sync with the API.
- Use `<NuxtImg>` for every image, with alt text, `loading="lazy"` below the fold, and `format="webp"`.

## 8. Strings and app config

- Labels repeated on more than one screen (button texts, status names, WhatsApp message templates) go in `common/constants/appStrings.ts`.
- One-off text on a single screen can stay in that screen's template.
- Business slugs, WhatsApp country code, page sizes and similar values go in `common/constants/appConfig.ts`.
- Keeping strings in one place lets Malayalam support (phase 2) swap them for i18n keys later.

## 9. Component rules

- One component per file. If a `.vue` file grows past about 150 lines, split a widget out of it.
- Use `<script setup lang="ts">` and typed props: `defineProps<{ room: Room }>()`.
- Widgets get data through props and report actions through emits. Only screens use controllers.
- Every screen handles three states: loading (`AppLoader`), error (`AppErrorState` with retry) and empty (`AppEmptyState`).
- Forms validate on the client too, but the API is the final check.
- Clickable things are `<button>`, `AppButton` or `NuxtLink`; no clickable `<div>`.

## 10. TypeScript and code style

- `strict: true`. No `any`; use `unknown` and narrow it, or write the type in `model/`.
- Imports use the `~/` alias, never long `../../../` chains. Inside one feature, short relative imports (`../model/...`) are fine.
- Import order: Vue/Nuxt, third-party, `~/common`, the current feature, then relative files.
- No `console.log` in committed code.
- ESLint (`@nuxt/eslint`) and Prettier must pass before a commit.

## 11. SEO rules (apps/web only)

- Every page file calls `useSeoMeta`, using values from the API (`ApiConstants.public.seoByPage(pageKey)`) with a fallback title and description.
- One `<h1>` per page, using `TextStyles.heading` or `TextStyles.displayTitle`.
- Every `<NuxtImg>` has meaningful alt text.
- Data for SEO pages is loaded with `useAsyncData` in the controller, so it is in the server-rendered HTML.
- Structured data (`useSchemaOrg`) is added in the page file, not inside widgets.

## 12. Checklist before finishing a change

- [ ] New code sits in the right feature and layer
- [ ] No hex/rgb colors, API URLs or image paths outside the constants files
- [ ] Text uses `TextStyles`, not inline text classes
- [ ] Names follow section 3
- [ ] Screen handles loading, error and empty states
- [ ] No feature imports another feature's files
- [ ] `ApiConstants` matches the FastAPI route if an endpoint was added or changed
- [ ] Lint and type check pass (`npm run lint`, `npx nuxi typecheck`)

## 13. Starter files

Create these when setting up each Nuxt app. Colors are placeholders; replace them with the colors from the client's logos.

### `common/constants/appColors.ts`

```ts
/**
 * All color codes for the app. The only file allowed to contain color values.
 * tailwind.config.ts reads this object, so use classes like `bg-primary`, `text-textSecondary`.
 */
export const AppColors = {
  // Brand
  primary: '#1F7A3A',
  primaryDark: '#145228',
  primaryLight: '#E8F5EC',
  secondary: '#C8962E',
  secondaryDark: '#9C7220',
  secondaryLight: '#FBF3E0',

  // Text
  textPrimary: '#1A1A1A',
  textSecondary: '#5C5C5C',
  textMuted: '#8A8A8A',
  textOnPrimary: '#FFFFFF',

  // Surfaces
  background: '#FFFFFF',
  surface: '#F8F7F3',
  border: '#E3E1DA',
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Feedback
  success: '#2E7D32',
  warning: '#ED8B00',
  error: '#C62828',
  info: '#1565C0',

  // Hall calendar status
  booked: '#C62828',
  tentative: '#ED8B00',
  available: '#2E7D32',

  // Third-party
  whatsapp: '#25D366',
} as const;

export type AppColorName = keyof typeof AppColors;
```

### `tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss';
import { AppColors } from './common/constants/appColors';

export default {
  content: [
    './app.vue',
    './pages/**/*.vue',
    './layouts/**/*.vue',
    './features/**/*.{vue,ts}',
    './common/**/*.{vue,ts}',
  ],
  theme: {
    extend: {
      colors: { ...AppColors },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
} satisfies Config;
```

### `common/styles/textStyles.ts`

```ts
/**
 * Named text styles. Components take text styling only from here:
 *   <h1 :class="TextStyles.heading">...</h1>
 * Layout classes can be added next to a style:
 *   :class="[TextStyles.heading, 'mb-4']"
 */
export const TextStyles = {
  displayTitle: 'font-heading text-4xl md:text-5xl font-bold leading-tight text-textPrimary',
  heading: 'font-heading text-2xl md:text-3xl font-bold leading-snug text-textPrimary',
  subheading: 'font-heading text-xl md:text-2xl font-semibold leading-snug text-textPrimary',
  sectionTitle: 'font-heading text-lg md:text-xl font-semibold text-primary',
  cardTitle: 'font-body text-lg font-semibold text-textPrimary',
  body: 'font-body text-base leading-relaxed text-textSecondary',
  bodySmall: 'font-body text-sm leading-relaxed text-textSecondary',
  caption: 'font-body text-xs text-textMuted',
  label: 'font-body text-sm font-medium text-textPrimary',
  button: 'font-body text-sm md:text-base font-semibold tracking-wide',
  price: 'font-body text-lg font-bold text-primary',
  link: 'font-body text-base font-medium text-primary underline-offset-4 hover:underline',
  errorText: 'font-body text-sm text-error',
} as const;

export type TextStyleName = keyof typeof TextStyles;
```

### `common/constants/apiConstants.ts`

```ts
/**
 * All API endpoint paths, matching the FastAPI routes under /api/v1.
 * The base URL is NOT here: apiClient reads it from runtimeConfig.public.apiBaseUrl.
 */
export const ApiConstants = {
  version: '/api/v1',

  public: {
    settings: '/public/settings',
    businessBySlug: (slug: string) => `/public/businesses/${slug}`,
    banners: '/public/banners',

    menuCategories: '/public/menu/categories',
    menuItems: '/public/menu/items',
    menuCards: '/public/menu/cards',

    rooms: '/public/rooms',
    roomBySlug: (slug: string) => `/public/rooms/${slug}`,

    hall: '/public/hall',
    hallPackages: '/public/hall/packages',
    hallAvailability: '/public/hall/availability',

    galleryAlbums: '/public/gallery/albums',
    galleryAlbumBySlug: (slug: string) => `/public/gallery/albums/${slug}`,

    testimonials: '/public/testimonials',
    faqs: '/public/faqs',
    seoByPage: (pageKey: string) => `/public/seo/${pageKey}`,
    sitemapData: '/public/sitemap-data',

    enquiries: '/public/enquiries',
  },

  admin: {
    settings: '/admin/settings',
    businesses: '/admin/businesses',
    businessById: (id: string) => `/admin/businesses/${id}`,
    banners: '/admin/banners',
    bannerById: (id: string) => `/admin/banners/${id}`,

    menuCategories: '/admin/menu/categories',
    menuCategoryById: (id: string) => `/admin/menu/categories/${id}`,
    menuItems: '/admin/menu/items',
    menuItemById: (id: string) => `/admin/menu/items/${id}`,
    menuCards: '/admin/menu/cards',
    menuCardById: (id: string) => `/admin/menu/cards/${id}`,

    rooms: '/admin/rooms',
    roomById: (id: string) => `/admin/rooms/${id}`,
    roomImages: (roomId: string) => `/admin/rooms/${roomId}/images`,

    hall: '/admin/hall',
    hallPackages: '/admin/hall/packages',
    hallPackageById: (id: string) => `/admin/hall/packages/${id}`,
    hallImages: '/admin/hall/images',
    hallBookings: '/admin/hall/bookings',
    hallBookingById: (id: string) => `/admin/hall/bookings/${id}`,

    enquiries: '/admin/enquiries',
    enquiryById: (id: string) => `/admin/enquiries/${id}`,
    enquiriesExport: '/admin/enquiries/export.csv',

    galleryAlbums: '/admin/gallery/albums',
    galleryAlbumById: (id: string) => `/admin/gallery/albums/${id}`,
    galleryImages: '/admin/gallery/images',
    galleryImageById: (id: string) => `/admin/gallery/images/${id}`,

    testimonials: '/admin/testimonials',
    testimonialById: (id: string) => `/admin/testimonials/${id}`,
    faqs: '/admin/faqs',
    faqById: (id: string) => `/admin/faqs/${id}`,
    seo: '/admin/seo',
    seoById: (id: string) => `/admin/seo/${id}`,

    uploads: '/admin/uploads',
    dashboardStats: '/admin/dashboard/stats',
    users: '/admin/users',
    userById: (id: string) => `/admin/users/${id}`,
  },
} as const;
```

### `common/constants/imageConstants.ts`

```ts
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
```

### `common/constants/appStrings.ts`

```ts
/** Labels used on more than one screen, and WhatsApp message templates. */
export const AppStrings = {
  actions: {
    enquireOnWhatsApp: 'Enquire on WhatsApp',
    viewDetails: 'View details',
    viewMenu: 'View menu',
    downloadMenu: 'Download menu card',
    checkAvailability: 'Check availability',
    retry: 'Try again',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
  },
  states: {
    loading: 'Loading...',
    genericError: 'Something went wrong. Please try again.',
    noItems: 'Nothing to show yet.',
  },
  hallStatus: {
    booked: 'Booked',
    tentative: 'Tentative',
    available: 'Available',
  },
  enquiryStatus: {
    new: 'New',
    contacted: 'Contacted',
    confirmed: 'Confirmed',
    cancelled: 'Cancelled',
  },
} as const;
```

### `common/constants/appConfig.ts`

```ts
/** App-wide values that are not colors, URLs, images or labels. */
export const AppConfig = {
  businessSlugs: {
    hotel: 'sreebhavan-veg-hotel',
    hallAndRooms: 'sreebhavanam',
  },
  whatsAppCountryCode: '91',
  defaultPageSize: 20,
  maxUploadSizeMb: 5,
  currency: 'INR',
  locale: 'en-IN',
} as const;
```

### `common/services/apiClient.ts`

```ts
import { ApiConstants } from '~/common/constants/apiConstants';

/**
 * The only HTTP client in the app. Repositories call this; nothing else calls $fetch.
 * Base URL comes from NUXT_PUBLIC_API_BASE_URL (runtimeConfig.public.apiBaseUrl).
 */
export const useApiClient = () => {
  const config = useRuntimeConfig();
  const authToken = useCookie<string | null>('admin_access_token');

  const request = $fetch.create({
    baseURL: `${config.public.apiBaseUrl}${ApiConstants.version}`,
    onRequest({ options }) {
      if (authToken.value) {
        const headers = new Headers(options.headers);
        headers.set('Authorization', `Bearer ${authToken.value}`);
        options.headers = headers;
      }
    },
  });

  return {
    get: <T>(path: string, query?: Record<string, unknown>) =>
      request<T>(path, { method: 'GET', query }),
    post: <T>(path: string, body?: unknown) => request<T>(path, { method: 'POST', body }),
    patch: <T>(path: string, body?: unknown) => request<T>(path, { method: 'PATCH', body }),
    put: <T>(path: string, body?: unknown) => request<T>(path, { method: 'PUT', body }),
    remove: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
  };
};
```

### Shared state widgets: `common/widgets/`

```vue
<!-- AppLoader.vue -->
<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-3 py-12" role="status">
    <span class="h-8 w-8 animate-spin rounded-full border-4 border-primaryLight border-t-primary" />
    <p :class="TextStyles.bodySmall">{{ AppStrings.states.loading }}</p>
  </div>
</template>
```

```vue
<!-- AppErrorState.vue -->
<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';

defineProps<{ message?: string }>();
const emit = defineEmits<{ retry: [] }>();
</script>

<template>
  <div class="flex flex-col items-center gap-4 py-12 text-center">
    <p :class="TextStyles.errorText">{{ message ?? AppStrings.states.genericError }}</p>
    <button
      type="button"
      :class="[TextStyles.button, 'rounded-lg bg-primary px-5 py-2 text-textOnPrimary']"
      @click="emit('retry')"
    >
      {{ AppStrings.actions.retry }}
    </button>
  </div>
</template>
```

```vue
<!-- AppEmptyState.vue -->
<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';

defineProps<{ message?: string }>();
</script>

<template>
  <p :class="[TextStyles.body, 'py-12 text-center']">{{ message ?? AppStrings.states.noItems }}</p>
</template>
```

## 14. Example feature: rooms in apps/web

Every new feature follows this pattern.

```
features/rooms/
├── ui/
│   ├── RoomsScreen.vue
│   └── widgets/
│       └── RoomsListCard.vue
├── controller/
│   └── useRoomsController.ts
├── model/
│   └── rooms.model.ts
└── domain/
    └── rooms.repository.ts
```

### `model/rooms.model.ts`

```ts
/** Room as used by the UI. */
export interface Room {
  id: string;
  slug: string;
  name: string;
  pricePerNight: number;
  capacity: number;
  amenities: string[];
  description: string;
  coverImageUrl: string | null;
  images: RoomImage[];
}

export interface RoomImage {
  url: string;
  alt: string;
}

/** Room exactly as FastAPI returns it (snake_case). */
export interface RoomApiResponse {
  id: string;
  slug: string;
  name: string;
  price: number;
  capacity: number;
  amenities: string[];
  description: string;
  images: { url: string; alt: string; sort: number }[];
}

export const mapRoom = (apiRoom: RoomApiResponse): Room => {
  const sortedImages = [...apiRoom.images].sort((a, b) => a.sort - b.sort);
  return {
    id: apiRoom.id,
    slug: apiRoom.slug,
    name: apiRoom.name,
    pricePerNight: apiRoom.price,
    capacity: apiRoom.capacity,
    amenities: apiRoom.amenities,
    description: apiRoom.description,
    coverImageUrl: sortedImages[0]?.url ?? null,
    images: sortedImages.map(({ url, alt }) => ({ url, alt })),
  };
};
```

### `domain/rooms.repository.ts`

```ts
import { ApiConstants } from '~/common/constants/apiConstants';
import { useApiClient } from '~/common/services/apiClient';
import { mapRoom, type Room, type RoomApiResponse } from '../model/rooms.model';

/** The only place in the rooms feature that talks to the API. Returns models, not raw JSON. */
export const useRoomsRepository = () => {
  const apiClient = useApiClient();

  const getRooms = async (): Promise<Room[]> => {
    const response = await apiClient.get<RoomApiResponse[]>(ApiConstants.public.rooms);
    return response.map(mapRoom);
  };

  const getRoomBySlug = async (slug: string): Promise<Room> => {
    const response = await apiClient.get<RoomApiResponse>(ApiConstants.public.roomBySlug(slug));
    return mapRoom(response);
  };

  return { getRooms, getRoomBySlug };
};
```

### `controller/useRoomsController.ts`

```ts
import { useRoomsRepository } from '../domain/rooms.repository';

/** State and actions for the rooms screen. useAsyncData runs on the server for SSR. */
export const useRoomsController = () => {
  const roomsRepository = useRoomsRepository();

  const {
    data: rooms,
    status,
    error,
    refresh: reloadRooms,
  } = useAsyncData('rooms-list', () => roomsRepository.getRooms(), { default: () => [] });

  const isLoading = computed(() => status.value === 'pending');
  const hasError = computed(() => Boolean(error.value));
  const isEmpty = computed(() => !isLoading.value && !hasError.value && rooms.value.length === 0);

  return { rooms, isLoading, hasError, isEmpty, reloadRooms };
};
```

### `ui/widgets/RoomsListCard.vue`

```vue
<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { ImageConstants } from '~/common/constants/imageConstants';
import { TextStyles } from '~/common/styles/textStyles';
import { formatPrice } from '~/common/utils/formatPrice';
import type { Room } from '../../model/rooms.model';

defineProps<{ room: Room }>();
</script>

<template>
  <article class="overflow-hidden rounded-xl border border-border bg-background">
    <NuxtImg
      :src="room.coverImageUrl ?? ImageConstants.placeholders.room"
      :alt="room.images[0]?.alt ?? room.name"
      format="webp"
      loading="lazy"
      class="aspect-[4/3] w-full object-cover"
    />
    <div class="flex flex-col gap-2 p-4">
      <h3 :class="TextStyles.cardTitle">{{ room.name }}</h3>
      <p :class="TextStyles.bodySmall">Up to {{ room.capacity }} guests</p>
      <p :class="TextStyles.price">{{ formatPrice(room.pricePerNight) }} / night</p>
      <NuxtLink :to="`/sreebhavanam/rooms/${room.slug}`" :class="TextStyles.link">
        {{ AppStrings.actions.viewDetails }}
      </NuxtLink>
    </div>
  </article>
</template>
```

`common/utils/formatPrice.ts`:

```ts
import { AppConfig } from '~/common/constants/appConfig';

export const formatPrice = (amount: number): string =>
  new Intl.NumberFormat(AppConfig.locale, {
    style: 'currency',
    currency: AppConfig.currency,
    maximumFractionDigits: 0,
  }).format(amount);
```

### `ui/RoomsScreen.vue`

```vue
<script setup lang="ts">
import AppEmptyState from '~/common/widgets/AppEmptyState.vue';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import { TextStyles } from '~/common/styles/textStyles';
import { useRoomsController } from '../controller/useRoomsController';
import RoomsListCard from './widgets/RoomsListCard.vue';

const { rooms, isLoading, hasError, isEmpty, reloadRooms } = useRoomsController();
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 py-10">
    <h1 :class="[TextStyles.heading, 'mb-2']">Our Rooms</h1>
    <p :class="[TextStyles.body, 'mb-8']">Comfortable AC and non-AC rooms at Sreebhavanam.</p>

    <AppLoader v-if="isLoading" />
    <AppErrorState v-else-if="hasError" @retry="reloadRooms" />
    <AppEmptyState v-else-if="isEmpty" />
    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <RoomsListCard v-for="room in rooms" :key="room.id" :room="room" />
    </div>
  </section>
</template>
```

### `pages/sreebhavanam/rooms/index.vue`

```vue
<script setup lang="ts">
import RoomsScreen from '~/features/rooms/ui/RoomsScreen.vue';

// Fallback values; replace with data from ApiConstants.public.seoByPage('rooms').
useSeoMeta({
  title: 'Rooms at Sreebhavanam',
  description: 'Clean AC and non-AC rooms at Sreebhavanam. Check prices and enquire on WhatsApp.',
});
</script>

<template>
  <RoomsScreen />
</template>
```
