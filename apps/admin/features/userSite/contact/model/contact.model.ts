import type { AppIconName } from '~/common/constants/appIcons';

/** One way to reach us (call, WhatsApp, email), shown as a card. */
export interface ContactMethod {
  key: string;
  icon: AppIconName;
  title: string;
  value: string;
  href: string;
  isExternal: boolean;
}
