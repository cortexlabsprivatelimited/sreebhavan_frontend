import { AppConfig } from '~/common/constants/appConfig';

/** Parses 'YYYY-MM-DD' as a local date (no timezone shift). */
export const parseIsoDate = (isoDate: string): Date => {
  const [year, month, day] = isoDate.slice(0, 10).split('-').map(Number);
  return new Date(year ?? 1970, (month ?? 1) - 1, day ?? 1);
};

/** Date → 'YYYY-MM-DD' in local time. */
export const toIsoDate = (date: Date): string => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
};

/** Date → 'YYYY-MM', the month format the API uses. */
export const toMonthKey = (date: Date): string => toIsoDate(date).slice(0, 7);

/** '2026-12-12' → '12 Dec 2026' */
export const formatDate = (isoDate: string | null): string => {
  if (!isoDate) return '-';
  return new Intl.DateTimeFormat(AppConfig.locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(parseIsoDate(isoDate));
};

/** ISO timestamp → '12 Dec 2026, 4:30 pm' */
export const formatDateTime = (isoTimestamp: string): string =>
  new Intl.DateTimeFormat(AppConfig.locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(isoTimestamp));

/** Date → 'December 2026' */
export const formatMonthTitle = (date: Date): string =>
  new Intl.DateTimeFormat(AppConfig.locale, { month: 'long', year: 'numeric' }).format(date);
