<script setup lang="ts">
import { usePageSeo } from '~/common/controllers/usePageSeo';
import { galleryAlbumKey } from '~/features/userSite/gallery/controller/useGalleryAlbumController';
import type { GalleryAlbumDetails } from '~/features/userSite/gallery/model/gallery.model';
import GalleryAlbumScreen from '~/features/userSite/gallery/ui/GalleryAlbumScreen.vue';

const route = useRoute();
const slug = computed(() => String(route.params.slug));
// The screen loads the album under this key; reuse it for the fallback title.
const { data: album } = useNuxtData<GalleryAlbumDetails | null>(galleryAlbumKey(slug.value));

useSeoMeta(
  usePageSeo(
    () => `gallery/${slug.value}`,
    () => ({
      title: album.value ? `${album.value.title} · Gallery` : 'Gallery · Sreebhavan',
      description: album.value
        ? `Photos from ${album.value.title} at Sreebhavan.`
        : 'Photos from Sreebhavan Veg Hotel and Sreebhavanam.',
    }),
  ),
);
</script>

<template>
  <GalleryAlbumScreen :key="slug" :slug="slug" />
</template>
