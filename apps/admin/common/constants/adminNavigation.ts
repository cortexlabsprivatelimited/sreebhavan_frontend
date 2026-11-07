import type { AppIconName } from '~/common/constants/appIcons';
import type { AdminRole } from '~/common/types/adminSession';

/** Sidebar links of the admin panel, grouped. `ownerOnly` links are hidden from staff. */
export interface AdminNavItem {
  label: string;
  to: string;
  icon: AppIconName;
  ownerOnly?: boolean;
}

export interface AdminNavGroup {
  title: string;
  items: AdminNavItem[];
}

export const AdminNavigation: AdminNavGroup[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', to: '/', icon: 'dashboard' },
      { label: 'Enquiries', to: '/enquiries', icon: 'enquiries' },
      { label: 'Hall Calendar', to: '/hall-calendar', icon: 'calendarCheck' },
    ],
  },
  {
    title: 'Sreebhavan Veg Hotel',
    items: [{ label: 'Menu', to: '/menu', icon: 'menu' }],
  },
  {
    title: 'Sreebhavanam',
    items: [
      { label: 'Rooms', to: '/rooms', icon: 'rooms' },
      { label: 'Event hall', to: '/event-hall', icon: 'calendar' },
    ],
  },
  {
    title: 'Website content',
    items: [
      { label: 'Banners', to: '/banners', icon: 'banners' },
      { label: 'Gallery', to: '/gallery', icon: 'gallery' },
      { label: 'Testimonials', to: '/testimonials', icon: 'testimonials' },
      { label: 'FAQs', to: '/faqs', icon: 'faqs' },
      { label: 'SEO', to: '/seo', icon: 'seo' },
    ],
  },
  {
    title: 'Settings',
    items: [
      { label: 'Site settings', to: '/site-settings', icon: 'settings' },
      { label: 'Businesses', to: '/businesses', icon: 'businesses' },
      { label: 'Admin users', to: '/admin-users', icon: 'users', ownerOnly: true },
    ],
  },
];

export const filterNavigationForRole = (role: AdminRole | null): AdminNavGroup[] =>
  AdminNavigation.map((group) => ({
    ...group,
    items: group.items.filter((item) => !item.ownerOnly || role === 'owner'),
  })).filter((group) => group.items.length > 0);
