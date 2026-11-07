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

  // Admin session
  authTokenCookie: 'admin_access_token',
  adminProfileCookie: 'admin_profile',
  sessionMaxAgeSeconds: 60 * 60 * 12,
  loginRoute: '/login',
  homeRoute: '/',

  // Uploads
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
  allowedMenuCardTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'],
  allowedLogoTypes: [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/svg+xml',
    'image/x-icon',
    'image/vnd.microsoft.icon',
  ],

  toastDurationMs: 3000,
} as const;
