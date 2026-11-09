/**
 * All color codes for the app. The only file allowed to contain color values.
 * tailwind.config.ts reads this object, so use classes like `bg-primary`, `text-textSecondary`.
 * Admin theme: dark royal blue sidebar, blue primary, white cards on a light blue-grey page.
 * User site theme: `UserSiteThemeColors` replaces the brand keys inside `.theme-user-site`
 * (set by layouts/default.vue), so shared widgets like AppButton turn leaf green and temple gold there.
 */
export const AppColors = {
  // Brand
  primary: '#2563EB',
  primaryDark: '#1D4ED8', // hover
  primaryLight: '#EAF1FE',
  secondary: '#F59E0B',
  secondaryDark: '#B45309',
  secondaryLight: '#FEF3C7',

  // Sidebar
  sidebar: '#102B5C',
  sidebarHover: '#1A3A72',
  sidebarAccent: '#7FB2FF',

  // Text
  textPrimary: '#172554', // headings
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  textOnPrimary: '#FFFFFF',

  // Surfaces
  background: '#FFFFFF', // cards
  surface: '#F4F7FC', // page background
  surfaceMuted: '#EEF2F8',
  border: '#E2E8F0',
  overlay: 'rgba(15, 23, 42, 0.5)',
  shadow: 'rgba(16, 43, 92, 0.06)',
  shadowStrong: 'rgba(16, 43, 92, 0.12)',

  // Feedback
  success: '#16A34A',
  successLight: '#DCFCE7',
  warning: '#D97706',
  warningLight: '#FEF3C7',
  error: '#DC2626',
  errorLight: '#FEE2E2',
  info: '#2563EB',
  infoLight: '#DBEAFE',

  // Dashboard accents
  accentGreen: '#22C55E',
  accentOrange: '#F59E0B',
  accentPurple: '#7C3AED',
  accentPurpleLight: '#EDE9FE',

  // Hall calendar status
  booked: '#EF4444',
  tentative: '#F59E0B',
  available: '#22C55E',

  // Accent and focus (focus colors differ per theme: blue in the admin, gold on the user site)
  tertiary: '#B34A28',
  tertiaryLight: '#FBE9E2',
  focus: '#2563EB',
  focusRing: '#EAF1FE',

  // Third-party
  whatsapp: '#25D366',

  // User site only (DESIGN.md: luxury heritage hospitality)
  siteFooter: '#071D3F', // deep sapphire night
  siteHeroShade: 'rgba(7, 29, 63, 0.62)', // over photos with light text
  siteHeroWash: 'rgba(249, 247, 242, 0.86)', // ivory wash over photos with dark text
  siteGlass: 'rgba(255, 255, 255, 0.85)',
  siteGlassStrong: 'rgba(255, 255, 255, 0.94)',
  siteHairline: 'rgba(12, 59, 122, 0.08)',
  siteHairlineStrong: 'rgba(12, 59, 122, 0.15)',
  siteHairlineGold: 'rgba(200, 149, 82, 0.28)',
  siteShadow: 'rgba(12, 59, 122, 0.06)',
  siteShadowNeutral: 'rgba(0, 0, 0, 0.02)',
  siteShadowFloat: 'rgba(12, 59, 122, 0.10)',
  siteGlow: 'rgba(12, 59, 122, 0.25)',
} as const;

/**
 * Brand colors of the public user site (DESIGN.md): royal sapphire, sand gold, Kerala terracotta
 * on a warm ivory canvas. Same keys as AppColors; applied under `.theme-user-site`.
 */
export const UserSiteThemeColors = {
  primary: '#0C3B7A', // royal sapphire
  primaryDark: '#002556',
  primaryLight: '#E9EEF7',
  secondary: '#C89552', // sand gold / polished brass
  secondaryDark: '#805618',
  secondaryLight: '#FBF1E3',
  tertiary: '#B34A28', // Kerala terracotta
  tertiaryLight: '#FBE9E2',
  textPrimary: '#121C2B', // ink
  textSecondary: '#5C6878', // stone
  textMuted: '#8A94A3',
  surface: '#F9F7F2', // warm ivory canvas
  surfaceMuted: '#F2EFE7',
  border: '#E6E3DB',
  info: '#0C3B7A',
  infoLight: '#E9EEF7',
  success: '#2F7D4F',
  successLight: '#E5F2EA',
  focus: '#C89552',
  focusRing: '#F6E7D2',
} as const satisfies Partial<Record<keyof typeof AppColors, string>>;
