<script setup lang="ts">
import { filterNavigationForRole } from '~/common/constants/adminNavigation';
import { useAuthSessionService } from '~/common/services/authSessionService';
import { useAdminSessionStore } from '~/common/stores/adminSession';
import AppSidebar from '~/common/widgets/AppSidebar.vue';
import AppToastList from '~/common/widgets/AppToastList.vue';
import AppTopBar from '~/common/widgets/AppTopBar.vue';

const adminSession = useAdminSessionStore();
const { signOut } = useAuthSessionService();

/** Mobile: sidebar slides over the page. Desktop: sidebar can be collapsed away. */
const isSidebarOpen = ref(false);
const isSidebarCollapsed = ref(false);
const navigationGroups = computed(() =>
  filterNavigationForRole(adminSession.profile?.role ?? null),
);

const toggleSidebar = () => {
  if (window.matchMedia('(min-width: 1024px)').matches) {
    isSidebarCollapsed.value = !isSidebarCollapsed.value;
    return;
  }
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
  <div class="min-h-screen bg-surface">
    <AppSidebar
      :navigation-groups="navigationGroups"
      :is-open="isSidebarOpen"
      :is-collapsed="isSidebarCollapsed"
      @close="isSidebarOpen = false"
    />
    <div
      :class="['transition-[padding] duration-300', isSidebarCollapsed ? 'lg:pl-0' : 'lg:pl-64']"
    >
      <AppTopBar :profile="adminSession.profile" @toggle-menu="toggleSidebar" @sign-out="signOut" />
      <main class="mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-8">
        <slot />
      </main>
    </div>
    <AppToastList />
  </div>
</template>
