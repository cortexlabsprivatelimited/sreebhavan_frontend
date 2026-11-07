import { AppConfig } from '~/common/constants/appConfig';
import { useAdminSessionStore } from '~/common/stores/adminSession';

/** Every page needs a signed-in admin, except pages with `isPublic` meta. */
export default defineNuxtRouteMiddleware((to) => {
  const adminSession = useAdminSessionStore();

  if (to.meta.isPublic) {
    return adminSession.isLoggedIn ? navigateTo(AppConfig.homeRoute) : undefined;
  }

  if (!adminSession.isLoggedIn) {
    return navigateTo({ path: AppConfig.loginRoute, query: { redirect: to.fullPath } });
  }

  if (to.meta.requiresOwner && !adminSession.isOwner) {
    return navigateTo(AppConfig.homeRoute);
  }
});
