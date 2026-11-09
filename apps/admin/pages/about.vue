<script setup lang="ts">
import { usePageSeo } from '~/common/controllers/usePageSeo';
import AboutScreen from '~/features/userSite/about/ui/AboutScreen.vue';

useSeoMeta(
  usePageSeo('about', {
    title: 'About Sreebhavan',
    description: 'The story of Sreebhavan Veg Hotel and Sreebhavanam Event Hall & Rooms.',
  }),
);
</script>

<template>
  <AboutScreen />
</template>
