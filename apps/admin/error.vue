<script setup lang="ts">
import type { NuxtError } from '#app';
import { AppConfig } from '~/common/constants/appConfig';
import { AppStrings } from '~/common/constants/appStrings';
import { SiteRoutes } from '~/common/constants/userSiteNavigation';
import { TextStyles } from '~/common/styles/textStyles';
import AppButton from '~/common/widgets/AppButton.vue';
import AppIcon from '~/common/widgets/AppIcon.vue';

const props = defineProps<{ error: NuxtError }>();
const route = useRoute();

const isNotFound = computed(() => props.error.statusCode === 404);
const isAdminPage = computed(() => route.path.startsWith(AppConfig.adminRoutePrefix));

const title = computed(() =>
  isNotFound.value ? AppStrings.site.notFoundTitle : 'Something went wrong',
);
const message = computed(() => {
  if (!isNotFound.value) return 'Please reload the page or go back.';
  return isAdminPage.value ? "This admin page doesn't exist." : AppStrings.site.notFoundMessage;
});

const goHome = () =>
  clearError({ redirect: isAdminPage.value ? AppConfig.homeRoute : SiteRoutes.home });
</script>

<template>
  <main
    :class="[
      'flex min-h-screen flex-col items-center justify-center gap-4 bg-surface px-4 text-center',
      { 'theme-user-site': !isAdminPage },
    ]"
  >
    <AppIcon name="lotus" :stroke-width="1.2" class="h-16 w-16 text-secondary" />
    <h1 :class="TextStyles.heading">{{ title }}</h1>
    <p :class="TextStyles.body">{{ message }}</p>
    <AppButton @click="goHome">
      {{ isAdminPage ? 'Back to dashboard' : AppStrings.site.backHome }}
    </AppButton>
  </main>
</template>
