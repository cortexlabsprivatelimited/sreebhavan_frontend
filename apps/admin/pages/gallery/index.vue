<script setup lang="ts">
import { usePageSeo } from '~/common/controllers/usePageSeo';
import GalleryScreen from '~/features/userSite/gallery/ui/GalleryScreen.vue';

useSeoMeta(
  usePageSeo('gallery', {
    title: 'Gallery · Sreebhavan',
    description: 'Photos of weddings and functions in our hall, our rooms and our food.',
  }),
);
</script>

<template>
  <GalleryScreen />
</template>
