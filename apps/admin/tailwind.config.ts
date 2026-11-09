import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { AppColors, UserSiteThemeColors } from './common/constants/appColors';

/** '#1F6B3A' → '31 107 58', so Tailwind opacity modifiers (`bg-primary/40`) keep working. */
const toRgbChannels = (hex: string): string => {
  const value = hex.replace('#', '');
  return [0, 2, 4].map((start) => parseInt(value.slice(start, start + 2), 16)).join(' ');
};

const isHexColor = (value: string) => /^#[0-9a-f]{6}$/i.test(value);

/**
 * Hex colors become CSS variables so a theme class can swap them (admin = :root, user site =
 * .theme-user-site). Other values (rgba overlays, shadows) are used as they are.
 */
const themedColors = Object.fromEntries(
  Object.entries(AppColors).map(([name, value]) => [
    name,
    isHexColor(value) ? `rgb(var(--color-${name}) / <alpha-value>)` : value,
  ]),
);

const toColorVariables = (colors: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(colors)
      .filter(([, value]) => isHexColor(value))
      .map(([name, value]) => [`--color-${name}`, toRgbChannels(value)]),
  );

const colorThemePlugin = plugin(({ addBase }) => {
  addBase({
    ':root': {
      ...toColorVariables(AppColors),
      '--font-heading': "'Inter', sans-serif",
      '--font-body': "'Inter', sans-serif",
    },
    '.theme-user-site': {
      ...toColorVariables(UserSiteThemeColors),
      '--font-heading': "'Playfair Display', Georgia, serif",
      '--font-body': "'Plus Jakarta Sans', 'Inter', sans-serif",
    },
  });
});

export default {
  content: [
    './app.vue',
    './error.vue',
    './pages/**/*.vue',
    './layouts/**/*.vue',
    './features/**/*.{vue,ts}',
    './common/**/*.{vue,ts}',
  ],
  theme: {
    extend: {
      colors: themedColors,
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
      },
      boxShadow: {
        card: `0 1px 2px ${AppColors.shadow}, 0 8px 24px ${AppColors.shadow}`,
        cardHover: `0 2px 4px ${AppColors.shadow}, 0 12px 32px ${AppColors.shadowStrong}`,
        // User site elevation (DESIGN.md "Elevation & Depth")
        siteCard: `0 4px 20px -2px ${AppColors.siteShadow}, 0 2px 6px ${AppColors.siteShadowNeutral}`,
        siteFloat: `0 16px 40px -8px ${AppColors.siteShadowFloat}`,
        siteGlow: `0 8px 24px -4px ${AppColors.siteGlow}`,
      },
      maxWidth: {
        site: '1360px',
      },
    },
  },
  plugins: [colorThemePlugin],
} satisfies Config;
