import { ApiConstants } from '~/common/constants/apiConstants';
import { AppConfig } from '~/common/constants/appConfig';
import { useAdminSessionStore } from '~/common/stores/adminSession';
import type { ApiEnvelope, ApiPaginatedEnvelope, PaginatedApiResponse } from '~/common/types/api';

type RequestBody = BodyInit | Record<string, unknown>;

/**
 * The only HTTP client in the app. Repositories call this; nothing else calls $fetch.
 * Base URL comes from NUXT_PUBLIC_API_BASE_URL (runtimeConfig.public.apiBaseUrl).
 * Every JSON response is an envelope ({ success, status_code, message, data }); the methods below
 * return `data`, so repositories work with the payload only.
 * The admin token is sent only to `/admin/**` endpoints; public (user site) endpoints need none.
 * A 401 on an admin request except login ends the session and sends the admin to the login page.
 */
const ADMIN_API_PREFIX = '/admin/';

export const useApiClient = () => {
  const config = useRuntimeConfig();
  const router = useRouter();
  const adminSession = useAdminSessionStore();

  const request = $fetch.create({
    baseURL: `${config.public.apiBaseUrl}${ApiConstants.version}`,
    onRequest({ request: path, options }) {
      if (adminSession.accessToken && String(path).startsWith(ADMIN_API_PREFIX)) {
        const headers = new Headers(options.headers);
        headers.set('Authorization', `Bearer ${adminSession.accessToken}`);
        options.headers = headers;
      }
    },
    onResponseError({ request: failedRequest, response }) {
      const requestUrl = String(failedRequest);
      const isAdminRequest = requestUrl.includes(`${ApiConstants.version}${ADMIN_API_PREFIX}`);
      const isLoginRequest = requestUrl.includes(ApiConstants.admin.auth.login);
      if (response.status === 401 && isAdminRequest && !isLoginRequest) {
        adminSession.endSession();
        void router.push(AppConfig.loginRoute);
      }
    },
  });

  const send = async <T>(path: string, method: 'POST' | 'PATCH' | 'PUT', body?: unknown) =>
    (await request<ApiEnvelope<T>>(path, { method, body: body as RequestBody })).data;

  return {
    get: async <T>(path: string, query?: Record<string, unknown>) =>
      (await request<ApiEnvelope<T>>(path, { method: 'GET', query })).data,
    /** Paginated list: returns the items and the envelope's `meta`. */
    getPage: async <T>(
      path: string,
      query?: Record<string, unknown>,
    ): Promise<PaginatedApiResponse<T>> => {
      const response = await request<ApiPaginatedEnvelope<T>>(path, { method: 'GET', query });
      return { data: response.data, meta: response.meta };
    },
    /** File download (e.g. CSV export). Not wrapped in an envelope. */
    getBlob: (path: string, query?: Record<string, unknown>) =>
      request<Blob>(path, { method: 'GET', query, responseType: 'blob' }),
    post: <T>(path: string, body?: unknown) => send<T>(path, 'POST', body),
    patch: <T>(path: string, body?: unknown) => send<T>(path, 'PATCH', body),
    put: <T>(path: string, body?: unknown) => send<T>(path, 'PUT', body),
    remove: async <T>(path: string) =>
      (await request<ApiEnvelope<T>>(path, { method: 'DELETE' })).data,
  };
};
