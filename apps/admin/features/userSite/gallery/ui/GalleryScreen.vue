<script setup lang="ts">
import AppEmptyState from '~/common/widgets/AppEmptyState.vue';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppSitePageHero from '~/common/widgets/userSite/AppSitePageHero.vue';
import { useGalleryController } from '../controller/useGalleryController';
import GalleryAlbumCard from './widgets/GalleryAlbumCard.vue';
import GalleryCategoryFilter from './widgets/GalleryCategoryFilter.vue';

const {
  visibleAlbums,
  availableCategories,
  selectedCategory,
  isLoading,
  hasError,
  isEmpty,
  reloadAlbums,
} = useGalleryController();
</script>

<template>
  <div>
    <AppSitePageHero
      eyebrow="Gallery"
      title="Moments at"
      title-accent="Sreebhavan"
      subtitle="Weddings and functions in our hall, our rooms, and the food we love to serve."
    />
    <section class="mx-auto flex max-w-site flex-col gap-8 px-6 md:px-12 py-12 lg:px-20 lg:py-16">
      <AppLoader v-if="isLoading" />
      <AppErrorState v-else-if="hasError" @retry="reloadAlbums" />
      <AppEmptyState v-else-if="isEmpty" message="Photos will be added here soon." />
      <template v-else>
        <GalleryCategoryFilter
          v-if="availableCategories.length > 1"
          :categories="availableCategories"
          :selected-category="selectedCategory"
          @select-category="selectedCategory = $event"
        />
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <GalleryAlbumCard v-for="album in visibleAlbums" :key="album.id" :album="album" />
        </div>
      </template>
    </section>
  </div>
</template>
