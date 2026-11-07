import { AppConfig } from '~/common/constants/appConfig';
import { AppStrings } from '~/common/constants/appStrings';

export const isBlank = (value: string | null | undefined): boolean => !value || !value.trim();

/** Indian mobile number: 10 digits, optional +91 / 91 prefix. */
export const isValidPhone = (value: string): boolean =>
  /^(\+?91)?[6-9]\d{9}$/.test(value.replace(/[\s-]/g, ''));

export const isValidEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const isValidSlug = (value: string): boolean => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);

/** Returns an error message, or null when the file can be uploaded. */
export const validateUploadFile = (file: File, allowedTypes: readonly string[]): string | null => {
  if (!allowedTypes.includes(file.type)) return AppStrings.validation.invalidFileType;
  if (file.size > AppConfig.maxUploadSizeMb * 1024 * 1024) {
    return AppStrings.validation.fileTooLarge(AppConfig.maxUploadSizeMb);
  }
  return null;
};
