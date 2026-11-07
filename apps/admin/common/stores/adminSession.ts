import { defineStore } from 'pinia';
import { AppConfig } from '~/common/constants/appConfig';
import type { AdminProfile } from '~/common/types/adminSession';

/** Signed-in admin and token. Shared by the layout, the route guard and apiClient. */
export const useAdminSessionStore = defineStore('adminSession', () => {
  const cookieOptions = {
    maxAge: AppConfig.sessionMaxAgeSeconds,
    sameSite: 'strict' as const,
    secure: !import.meta.dev,
  };
  const accessToken = useCookie<string | null>(AppConfig.authTokenCookie, cookieOptions);
  const profile = useCookie<AdminProfile | null>(AppConfig.adminProfileCookie, cookieOptions);

  const isLoggedIn = computed(() => Boolean(accessToken.value && profile.value));
  const isOwner = computed(() => profile.value?.role === 'owner');

  const startSession = (token: string, adminProfile: AdminProfile) => {
    accessToken.value = token;
    profile.value = adminProfile;
  };

  const endSession = () => {
    accessToken.value = null;
    profile.value = null;
  };

  return { accessToken, profile, isLoggedIn, isOwner, startSession, endSession };
});
