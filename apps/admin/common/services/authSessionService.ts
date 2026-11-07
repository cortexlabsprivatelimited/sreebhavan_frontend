import { ApiConstants } from '~/common/constants/apiConstants';
import { AppConfig } from '~/common/constants/appConfig';
import { useApiClient } from '~/common/services/apiClient';
import { useAdminSessionStore } from '~/common/stores/adminSession';

/** Sign-out used by the admin layout. Sign-in lives in the login feature. */
export const useAuthSessionService = () => {
  const apiClient = useApiClient();
  const adminSession = useAdminSessionStore();
  const router = useRouter();

  const signOut = async () => {
    try {
      await apiClient.post(ApiConstants.admin.auth.logout);
    } catch {
      // The local session is cleared either way; a failed logout call must not trap the admin.
    }
    adminSession.endSession();
    await router.push(AppConfig.loginRoute);
  };

  return { signOut };
};
