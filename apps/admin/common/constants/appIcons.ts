/**
 * Inline SVG icons (24×24, stroke-based, drawn with currentColor) rendered by AppIcon.vue.
 * Each icon is a list of SVG child elements.
 */
export interface AppIconElement {
  tag: 'path' | 'rect' | 'circle';
  attrs: Record<string, string | number>;
}

const path = (d: string): AppIconElement => ({ tag: 'path', attrs: { d } });
const rect = (x: number, y: number, width: number, height: number, rx = 2): AppIconElement => ({
  tag: 'rect',
  attrs: { x, y, width, height, rx },
});
const circle = (cx: number, cy: number, r: number): AppIconElement => ({
  tag: 'circle',
  attrs: { cx, cy, r },
});

export const AppIcons = {
  lotus: [
    path('M12 3.5c-2.2 2.8-2.2 7.6 0 11.5 2.2-3.9 2.2-8.7 0-11.5Z'),
    path('M12 15c-1.4-3.6-4.4-6.2-8.3-6.8.3 4 3.6 6.8 8.3 6.8Z'),
    path('M12 15c1.4-3.6 4.4-6.2 8.3-6.8-.3 4-3.6 6.8-8.3 6.8Z'),
    path('M3.5 17.5c2.6 1.6 5.4 2.3 8.5 2.3s5.9-.7 8.5-2.3'),
  ],
  dashboard: [
    rect(3, 3, 7, 7, 1.5),
    rect(14, 3, 7, 7, 1.5),
    rect(3, 14, 7, 7, 1.5),
    rect(14, 14, 7, 7, 1.5),
  ],
  enquiries: [
    rect(8, 2, 8, 4, 1),
    path('M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'),
    path('m9 14 2 2 4-4'),
  ],
  calendar: [rect(3, 4, 18, 18), path('M16 2v4M8 2v4M3 10h18')],
  calendarCheck: [rect(3, 4, 18, 18), path('M16 2v4M8 2v4M3 10h18'), path('m9 16 2 2 4-4')],
  menu: [
    path('M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20'),
    path('M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7'),
  ],
  rooms: [path('M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z')],
  banners: [rect(3, 3, 18, 18), circle(9, 9, 2), path('m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21')],
  gallery: [
    path('M18 22H4a2 2 0 0 1-2-2V6'),
    rect(6, 2, 16, 16),
    circle(12, 8, 2),
    path('m22 13-1.3-1.3a2.4 2.4 0 0 0-3.4 0L11 18'),
  ],
  testimonials: [path('M7.9 20A9 9 0 1 0 4 16.1L2 22Z')],
  faqs: [circle(12, 12, 10), path('M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01')],
  seo: [circle(11, 11, 8), path('m21 21-4.3-4.3')],
  settings: [
    path('M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3'),
    path('M14 2v4M8 10v4M16 18v4'),
  ],
  businesses: [rect(2, 7, 20, 14), path('M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16')],
  users: [
    path('M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'),
    circle(9, 7, 4),
    path('M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8'),
  ],
  hamburger: [path('M4 6h16M4 12h16M4 18h16')],
  close: [path('M18 6 6 18M6 6l12 12')],
  chevronLeft: [path('m15 18-6-6 6-6')],
  chevronRight: [path('m9 18 6-6-6-6')],
  arrowRight: [path('M5 12h14m-7-7 7 7-7 7')],
  signOut: [path('M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'), path('m16 17 5-5-5-5M21 12H9')],
  star: [path('m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1Z')],
  pencil: [path('M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z')],
  bolt: [path('M13 2 3 14h9l-1 8 10-12h-9l1-8Z')],

  // User site
  phone: [
    path(
      'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z',
    ),
  ],
  whatsapp: [
    path('M3 21l1.7-5A8.5 8.5 0 1 1 8 19.4Z'),
    path('M9 9.5c.3 2.4 2.6 4.8 5 5.2l1.2-1.2-1.7-1-1 .7c-.9-.4-1.6-1.1-2-2l.7-1-1-1.7Z'),
  ],
  mapPin: [path('M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z'), circle(12, 10, 3)],
  clock: [circle(12, 12, 10), path('M12 6v6l4 2')],
  mail: [rect(2, 4, 20, 16), path('m22 7-10 6L2 7')],
  check: [path('M20 6 9 17l-5-5')],
  leaf: [
    path('M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z'),
    path('M2 21c0-3 1.9-5.4 5.2-6'),
  ],
  guests: [
    path('M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'),
    circle(9, 7, 4),
    path('M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8'),
  ],
  download: [path('M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'), path('m7 10 5 5 5-5M12 15V3')],
  externalLink: [
    path('M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'),
    path('M15 3h6v6M10 14 21 3'),
  ],
  facebook: [path('M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z')],
  instagram: [rect(2, 2, 20, 20, 5), circle(12, 12, 4), path('M17.5 6.5h.01')],
  youtube: [
    path(
      'M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17',
    ),
    path('m10 15 5-3-5-3Z'),
  ],
  offer: [
    path('M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z'),
    circle(7.5, 7.5, 1.5),
  ],
  flame: [
    path(
      'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4.1 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3a2.5 2.5 0 0 0 2.5 2.5Z',
    ),
  ],
  sparkle: [path('M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2Z')],
} as const satisfies Record<string, readonly AppIconElement[]>;

export type AppIconName = keyof typeof AppIcons;
