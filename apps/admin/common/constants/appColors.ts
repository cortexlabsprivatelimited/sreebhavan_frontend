/**
 * All color codes for the app. The only file allowed to contain color values.
 * tailwind.config.ts reads this object, so use classes like `bg-primary`, `text-textSecondary`.
 * Admin theme: dark royal blue sidebar, blue primary, white cards on a light blue-grey page.
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

  // Third-party
  whatsapp: '#25D366',
} as const;

export type AppColorName = keyof typeof AppColors;
