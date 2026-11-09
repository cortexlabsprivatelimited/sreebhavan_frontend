import { AppStrings } from '~/common/constants/appStrings';
import type { ApiErrorBody } from '~/common/types/api';
import type { FormErrors } from '~/common/types/form';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const readErrorBody = (error: unknown): ApiErrorBody | null =>
  isRecord(error) && isRecord(error.data) ? (error.data as ApiErrorBody) : null;

/** Turns any thrown value (usually a FetchError from apiClient) into a message for the user. */
export const getErrorMessage = (error: unknown): string => {
  const body = readErrorBody(error);
  if (body?.message) return body.message;
  if (getErrorStatus(error) === null) return 'Cannot reach the server. Check your connection.';
  return AppStrings.states.genericError;
};

/** HTTP status of a FetchError, or null when the request never got a response. */
export const getErrorStatus = (error: unknown): number | null => {
  if (!isRecord(error)) return null;
  const status = error.statusCode ?? error.status;
  return typeof status === 'number' ? status : null;
};

/** API names that map to the same form name in every feature. */
const commonFieldNames: Record<string, string> = { active: 'isActive', sort: 'sortOrder' };

const snakeToCamel = (field: string) =>
  field.replace(/_([a-z])/g, (_match, letter: string) => letter.toUpperCase());

/**
 * Maps the API's `errors[].field` (snake_case, e.g. `image_url`) onto form field names (`imageUrl`), so
 * messages like "This slug is already used" appear under the right input. Fields named differently in
 * the form are listed in `fieldNameOverrides`, e.g. `{ price: 'pricePerNight' }`.
 * Fields the form doesn't have are skipped; the top-level message still shows.
 */
export const getApiFieldErrors = <TForm>(
  error: unknown,
  form: TForm,
  fieldNameOverrides: Record<string, string> = {},
): FormErrors<TForm> => {
  const fieldErrors: Record<string, string> = {};
  for (const item of readErrorBody(error)?.errors ?? []) {
    if (!item.field) continue;
    const apiField = item.field.split('.')[0] ?? item.field;
    const formField =
      fieldNameOverrides[apiField] ?? commonFieldNames[apiField] ?? snakeToCamel(apiField);
    const isFormField = typeof form === 'object' && form !== null && formField in form;
    if (isFormField && !fieldErrors[formField]) fieldErrors[formField] = item.message;
  }
  return fieldErrors as FormErrors<TForm>;
};
