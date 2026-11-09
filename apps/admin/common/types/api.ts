/**
 * Standard envelope the FastAPI backend wraps around every JSON response
 * (sreebhavan_backend/app/core/responses.py). apiClient unwraps `data`, so repositories never see it.
 */
export interface ApiEnvelope<T> {
  success: true;
  status_code: number;
  message: string;
  data: T;
}

/** `meta` sent with paginated lists, e.g. GET /admin/enquiries. */
export interface ApiPageMeta {
  current_page: number;
  per_page: number;
  total_records: number;
  total_pages: number;
}

export interface ApiPaginatedEnvelope<T> extends ApiEnvelope<T[]> {
  meta: ApiPageMeta;
}

/** Error envelope. `errors[].field` names the request field the message belongs to (null for form-level). */
export interface ApiErrorBody {
  success?: false;
  status_code?: number;
  message?: string;
  errors?: { field: string | null; message: string }[];
}

/** Paginated list as returned by apiClient.getPage: the envelope's data plus meta. */
export interface PaginatedApiResponse<T> {
  data: T[];
  meta: ApiPageMeta;
}

/** Paginated list as used by the UI. */
export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface SelectOption<TValue extends string | number = string> {
  label: string;
  value: TValue;
}

export const mapPaginated = <TApi, TModel>(
  response: PaginatedApiResponse<TApi>,
  mapItem: (item: TApi) => TModel,
): Paginated<TModel> => ({
  items: response.data.map(mapItem),
  total: response.meta.total_records,
  page: response.meta.current_page,
  pageSize: response.meta.per_page,
});
