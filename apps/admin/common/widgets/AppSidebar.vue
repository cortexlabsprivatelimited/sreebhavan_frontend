<script setup lang="ts">
import { AppConfig } from '~/common/constants/appConfig';
import { AppStrings } from '~/common/constants/appStrings';
import type { AdminNavGroup } from '~/common/constants/adminNavigation';
import { TextStyles } from '~/common/styles/textStyles';
import AppIcon from '~/common/widgets/AppIcon.vue';

/** `logoUrl`: the brand logo from Site settings; the lotus icon is shown until one is set. */
defineProps<{
  navigationGroups: AdminNavGroup[];
  logoUrl: string | null;
  isOpen: boolean;
  isCollapsed: boolean;
}>();
const emit = defineEmits<{ close: [] }>();

const route = useRoute();
const isActiveLink = (to: string) =>
  to === AppConfig.homeRoute ? route.path === to : route.path.startsWith(to);
</script>

<template>
  <button
    v-if="isOpen"
    type="button"
    aria-label="Close menu"
    class="fixed inset-0 z-30 bg-overlay lg:hidden"
    @click="emit('close')"
  />
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-40 flex w-64 flex-col overflow-hidden bg-sidebar transition-transform duration-300',
      isOpen ? 'translate-x-0' : '-translate-x-full',
      isCollapsed ? 'lg:-translate-x-full' : 'lg:translate-x-0',
    ]"
  >
    <AppIcon
      name="lotus"
      :stroke-width="1"
      class="pointer-events-none absolute -bottom-8 -left-6 h-44 w-44 text-primary/40"
    />
    <NuxtLink
      :to="AppConfig.homeRoute"
      class="flex flex-col items-center gap-2 px-6 pb-4 pt-7"
      @click="emit('close')"
    >
      <NuxtImg
        v-if="logoUrl"
        :src="logoUrl"
        :alt="AppStrings.appName"
        class="h-14 w-14 rounded-full bg-background object-contain p-1"
      />
      <AppIcon v-else name="lotus" :stroke-width="1.5" class="h-12 w-12 text-sidebarAccent" />
      <span :class="TextStyles.brandTitle">{{ AppStrings.appName }}</span>
    </NuxtLink>
    <nav class="relative flex-1 overflow-y-auto px-3 pb-24">
      <div v-for="group in navigationGroups" :key="group.title" class="mt-5">
        <p :class="[TextStyles.navGroupTitle, 'mb-2 px-3']">{{ group.title }}</p>
        <NuxtLink
          v-for="item in group.items"
          :key="item.to"
          :to="item.to"
          :class="[
            TextStyles.navLink,
            'mb-0.5 flex items-center gap-3 rounded-xl px-3 py-2.5 transition',
            isActiveLink(item.to)
              ? 'bg-primary text-textOnPrimary shadow-cardHover'
              : 'text-textOnPrimary/85 hover:bg-sidebarHover hover:text-textOnPrimary',
          ]"
          @click="emit('close')"
        >
          <AppIcon :name="item.icon" class="h-5 w-5" />
          {{ item.label }}
        </NuxtLink>
      </div>
    </nav>
  </aside>
</template>
