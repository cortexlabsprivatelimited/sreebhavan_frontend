import { ApiConstants } from '~/common/constants/apiConstants';
import { useApiClient } from '~/common/services/apiClient';
import { useAdminSessionStore } from '~/common/stores/adminSession';
import {
  mapSiteBranding,
  type SiteBranding,
  type SiteBrandingApiResponse,
} from '~/common/types/siteBranding';

/**
 * Loads the brand logo and favicon. Signed in, it reads the admin settings, which are never cached, so a
 * change shows on the next page load. On the login page there is no token, so it reads the public settings.
 */
export const useSiteBrandingService = () => {
  const apiClient = useApiClient();
  const adminSession = useAdminSessionStore();

  const getBranding = async (): Promise<SiteBranding> =>
    mapSiteBranding(
      await apiClient.get<SiteBrandingApiResponse>(
        adminSession.isLoggedIn ? ApiConstants.admin.settings : ApiConstants.public.settings,
      ),
    );

  return { getBranding };
};
