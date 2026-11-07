import { ApiConstants } from '~/common/constants/apiConstants';
import { AppConfig } from '~/common/constants/appConfig';
import { useAdminSessionStore } from '~/common/stores/adminSession';

/**
 * The only HTTP client in the app. Repositories call this; nothing else calls $fetch.
 * Base URL comes from NUXT_PUBLIC_API_BASE_URL (runtimeConfig.public.apiBaseUrl).
 * A 401 on any request except login ends the session and sends the admin to the login page.
 */
export const useApiClient = () => {
  const config = useRuntimeConfig();
  const router = useRouter();
  const adminSession = useAdminSessionStore();

  const request = $fetch.create({
    baseURL: `${config.public.apiBaseUrl}${ApiConstants.version}`,
    onRequest({ options }) {
      if (adminSession.accessToken) {
        const headers = new Headers(options.headers);
        headers.set('Authorization', `Bearer ${adminSession.accessToken}`);
        options.headers = headers;
      }
    },
    onResponseError({ request: failedRequest, response }) {
      const isLoginRequest = String(failedRequest).includes(ApiConstants.admin.auth.login);
      if (response.status === 401 && !isLoginRequest) {
        adminSession.endSession();
        void router.push(AppConfig.loginRoute);
      }
    },
  });

  return {
    get: <T>(path: string, query?: Record<string, unknown>) =>
      request<T>(path, { method: 'GET', query }),
    getBlob: (path: string, query?: Record<string, unknown>) =>
      request<Blob>(path, { method: 'GET', query, responseType: 'blob' }),
    post: <T>(path: string, body?: unknown) =>
      request<T>(path, { method: 'POST', body: body as BodyInit | Record<string, unknown> }),
    patch: <T>(path: string, body?: unknown) =>
      request<T>(path, { method: 'PATCH', body: body as BodyInit | Record<string, unknown> }),
    put: <T>(path: string, body?: unknown) =>
      request<T>(path, { method: 'PUT', body: body as BodyInit | Record<string, unknown> }),
    remove: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
  };
};
