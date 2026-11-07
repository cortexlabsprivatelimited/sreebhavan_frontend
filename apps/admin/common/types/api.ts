/** Paginated list as used by the UI. */
export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

/** Paginated list exactly as FastAPI returns it. */
export interface PaginatedApiResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
}

/**
 * Error body from FastAPI. The project uses one error format ({ error: {...} });
 * `detail` covers FastAPI's default validation errors.
 */
export interface ApiErrorBody {
  error?: { code?: string; message?: string; details?: unknown };
  detail?: string | { msg: string; loc?: (string | number)[] }[];
}

export interface SelectOption<TValue extends string | number = string> {
  label: string;
  value: TValue;
}

export const mapPaginated = <TApi, TModel>(
  response: PaginatedApiResponse<TApi>,
  mapItem: (item: TApi) => TModel,
): Paginated<TModel> => ({
  items: response.items.map(mapItem),
  total: response.total,
  page: response.page,
  pageSize: response.page_size,
});
