<script setup lang="ts">
import GalleryAlbumPhotosScreen from '~/features/adminSite/gallery/ui/GalleryAlbumPhotosScreen.vue';

definePageMeta({ layout: 'admin' });
useHead({ title: 'Gallery album' });

const route = useRoute();
const albumId = computed(() => String(route.params.albumId));
</script>

<template>
  <GalleryAlbumPhotosScreen :key="albumId" :album-id="albumId" />
</template>
