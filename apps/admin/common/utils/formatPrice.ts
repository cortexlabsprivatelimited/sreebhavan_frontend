import { AppConfig } from '~/common/constants/appConfig';

export const formatPrice = (amount: number): string =>
  new Intl.NumberFormat(AppConfig.locale, {
    style: 'currency',
    currency: AppConfig.currency,
    maximumFractionDigits: 0,
  }).format(amount);
