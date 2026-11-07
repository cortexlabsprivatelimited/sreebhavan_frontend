import { AppConfig } from '~/common/constants/appConfig';

/** Builds a wa.me link. Adds the country code when the number has only 10 digits. */
export const buildWhatsAppUrl = (phone: string, message = ''): string => {
  const digits = phone.replace(/\D/g, '');
  const fullNumber = digits.length === 10 ? `${AppConfig.whatsAppCountryCode}${digits}` : digits;
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${fullNumber}${text}`;
};
