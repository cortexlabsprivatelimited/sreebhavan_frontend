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
    // Login goes through FastAPI, which talks to Supabase Auth. The frontend never calls Supabase.
    auth: {
      login: '/admin/auth/login',
      logout: '/admin/auth/logout',
      forgotPassword: '/admin/auth/forgot-password',
    },

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
    roomImageById: (roomId: string, imageId: string) => `/admin/rooms/${roomId}/images/${imageId}`,

    hall: '/admin/hall',
    hallPackages: '/admin/hall/packages',
    hallPackageById: (id: string) => `/admin/hall/packages/${id}`,
    hallImages: '/admin/hall/images',
    hallImageById: (id: string) => `/admin/hall/images/${id}`,
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
    userPasswordReset: (id: string) => `/admin/users/${id}/reset-password`,
  },
} as const;
