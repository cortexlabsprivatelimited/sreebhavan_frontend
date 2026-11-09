import type { AppIconName } from '~/common/constants/appIcons';

export interface AboutValue {
  icon: AppIconName;
  title: string;
  text: string;
}

/** The story and values shown on the About page (not managed in the admin panel). */
export const AboutStory = {
  title: 'Rooted in',
  titleAccent: 'Kerala hospitality',
  paragraphs: [
    'Sreebhavan began as a small vegetarian hotel serving honest, home-style Kerala food to travellers and families in town.',
    'Over the years our guests asked for a place to stay and to celebrate, and Sreebhavanam was born: comfortable rooms and an event hall run with the same care we put into every plate.',
  ],
} as const;

export const AboutValues: AboutValue[] = [
  {
    icon: 'leaf',
    title: 'Pure vegetarian',
    text: 'A strictly vegetarian kitchen, from breakfast to dinner.',
  },
  {
    icon: 'sparkle',
    title: 'Clean and fresh',
    text: 'Food cooked fresh daily, rooms and hall kept spotless.',
  },
  {
    icon: 'guests',
    title: 'Family first',
    text: 'A warm welcome for families, groups and celebrations.',
  },
  { icon: 'mapPin', title: 'Easy to reach', text: 'In town, with parking for guests and events.' },
];
