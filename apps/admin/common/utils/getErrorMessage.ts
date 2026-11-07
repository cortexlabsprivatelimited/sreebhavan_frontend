import { AppStrings } from '~/common/constants/appStrings';
import type { ApiErrorBody } from '~/common/types/api';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

/** Turns any thrown value (usually a FetchError from apiClient) into a message for the user. */
export const getErrorMessage = (error: unknown): string => {
  if (!isRecord(error)) return AppStrings.states.genericError;

  const body = error.data as ApiErrorBody | undefined;
  if (body?.error?.message) return body.error.message;
  if (typeof body?.detail === 'string') return body.detail;
  if (Array.isArray(body?.detail) && body.detail[0]?.msg) return body.detail[0].msg;

  return AppStrings.states.genericError;
};

/** HTTP status of a FetchError, or null. */
export const getErrorStatus = (error: unknown): number | null => {
  if (!isRecord(error)) return null;
  const status = error.statusCode ?? error.status;
  return typeof status === 'number' ? status : null;
};
