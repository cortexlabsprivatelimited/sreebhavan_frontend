import type { AppIconName } from '~/common/constants/appIcons';
import { AppConfig } from '~/common/constants/appConfig';
import type { AdminRole } from '~/common/types/adminSession';

/** Sidebar links of the admin panel, grouped. `ownerOnly` links are hidden from staff. */
export interface AdminNavItem {
  label: string;
  to: string;
  icon: AppIconName;
  ownerOnly?: boolean;
  /** Hidden until a phase turns it on. */
  isEnabled?: boolean;
}

export interface AdminNavGroup {
  title: string;
  items: AdminNavItem[];
}

export const AdminNavigation: AdminNavGroup[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', to: '/admin', icon: 'dashboard' },
      { label: 'Enquiries', to: '/admin/enquiries', icon: 'enquiries' },
      { label: 'Hall Calendar', to: '/admin/hall-calendar', icon: 'calendarCheck' },
    ],
  },
  {
    title: 'Sreebhavan Veg Hotel',
    items: [{ label: 'Menu', to: '/admin/menu', icon: 'menu' }],
  },
  {
    title: 'Sreebhavanam',
    items: [
      { label: 'Rooms', to: '/admin/rooms', icon: 'rooms' },
      { label: 'Event hall', to: '/admin/event-hall', icon: 'calendar' },
    ],
  },
  {
    title: 'Website content',
    items: [
      { label: 'Special offers', to: '/admin/special-offers', icon: 'offer' },
      { label: 'Gallery', to: '/admin/gallery', icon: 'gallery' },
      { label: 'Testimonials', to: '/admin/testimonials', icon: 'testimonials' },
      { label: 'FAQs', to: '/admin/faqs', icon: 'faqs' },
      { label: 'SEO', to: '/admin/seo', icon: 'seo' },
    ],
  },
  {
    title: 'Settings',
    items: [
      { label: 'Site settings', to: '/admin/site-settings', icon: 'settings' },
      { label: 'Businesses', to: '/admin/businesses', icon: 'businesses' },
      {
        label: 'Admin users',
        to: '/admin/admin-users',
        icon: 'users',
        ownerOnly: true,
        isEnabled: AppConfig.isStaffManagementEnabled,
      },
    ],
  },
];

export const filterNavigationForRole = (role: AdminRole | null): AdminNavGroup[] =>
  AdminNavigation.map((group) => ({
    ...group,
    items: group.items.filter(
      (item) => item.isEnabled !== false && (!item.ownerOnly || role === 'owner'),
    ),
  })).filter((group) => group.items.length > 0);
