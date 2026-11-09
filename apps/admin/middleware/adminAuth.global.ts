import { AppConfig } from '~/common/constants/appConfig';
import { useAdminSessionStore } from '~/common/stores/adminSession';

const isAdminRoute = (path: string) =>
  path === AppConfig.adminRoutePrefix || path.startsWith(`${AppConfig.adminRoutePrefix}/`);

/**
 * Admin pages (`/admin/**`) need a signed-in admin, except pages with `isPublic` meta (login).
 * The public user site needs no login, so this guard skips every other route.
 */
export default defineNuxtRouteMiddleware((to) => {
  if (!isAdminRoute(to.path)) return;

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
