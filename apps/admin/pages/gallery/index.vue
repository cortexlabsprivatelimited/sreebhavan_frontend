<script setup lang="ts">
import GalleryAlbumsScreen from '~/features/gallery/ui/GalleryAlbumsScreen.vue';

definePageMeta({ layout: 'admin' });
useHead({ title: 'Gallery' });
</script>

<template>
  <GalleryAlbumsScreen />
</template>
