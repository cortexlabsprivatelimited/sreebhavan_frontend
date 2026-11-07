import type { Config } from 'tailwindcss';
import { AppColors } from './common/constants/appColors';

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
      colors: { ...AppColors },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: `0 1px 2px ${AppColors.shadow}, 0 8px 24px ${AppColors.shadow}`,
        cardHover: `0 2px 4px ${AppColors.shadow}, 0 12px 32px ${AppColors.shadowStrong}`,
      },
    },
  },
} satisfies Config;
