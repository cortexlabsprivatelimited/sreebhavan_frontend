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

  // Routes
  /** Every admin panel page lives under this path; everything else is the public user site. */
  adminRoutePrefix: '/admin',

  // Admin session
  authTokenCookie: 'admin_access_token',
  adminProfileCookie: 'admin_profile',
  sessionMaxAgeSeconds: 60 * 60 * 12,
  loginRoute: '/admin/login',
  /** A login name without '@' (e.g. 'superadmin') signs in as <name>@<this domain> in Supabase Auth. */
  adminUsernameEmailDomain: 'sreebhavan.com',
  homeRoute: '/admin',

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

  // User site
  /** Months ahead the public hall availability calendar can show. */
  hallAvailabilityMonthsAhead: 12,
  /** Home page shows this many testimonials / specials. */
  homeTestimonialCount: 3,
  homeSpecialsCount: 6,

  /** Staff accounts (Admin users screen) come in the next phase. Set true to show the menu entry. */
  isStaffManagementEnabled: false,
} as const;
