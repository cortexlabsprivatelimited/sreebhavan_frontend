<script setup lang="ts">
import type { NuxtError } from '#app';
import { AppConfig } from '~/common/constants/appConfig';
import { TextStyles } from '~/common/styles/textStyles';
import AppButton from '~/common/widgets/AppButton.vue';

const props = defineProps<{ error: NuxtError }>();
const isNotFound = computed(() => props.error.statusCode === 404);

const goHome = () => clearError({ redirect: AppConfig.homeRoute });
</script>

<template>
  <main
    class="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface px-4 text-center"
  >
    <h1 :class="TextStyles.heading">
      {{ isNotFound ? 'Page not found' : 'Something went wrong' }}
    </h1>
    <p :class="TextStyles.body">
      {{
        isNotFound
          ? "This admin page doesn't exist."
          : 'Please reload the page or go back to the dashboard.'
      }}
    </p>
    <AppButton @click="goHome">Back to dashboard</AppButton>
  </main>
</template>
