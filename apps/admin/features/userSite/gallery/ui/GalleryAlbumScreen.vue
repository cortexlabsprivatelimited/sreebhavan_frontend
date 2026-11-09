<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { SiteRoutes } from '~/common/constants/userSiteNavigation';
import { TextStyles } from '~/common/styles/textStyles';
import AppEmptyState from '~/common/widgets/AppEmptyState.vue';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import { useGalleryAlbumController } from '../controller/useGalleryAlbumController';
import GalleryLightbox from './widgets/GalleryLightbox.vue';
import GalleryPhotoGrid from './widgets/GalleryPhotoGrid.vue';

const props = defineProps<{ slug: string }>();

const {
  album,
  openPhoto,
  openPhotoIndex,
  photoCount,
  openLightbox,
  closeLightbox,
  showAdjacentPhoto,
  isLoading,
  hasError,
  isEmpty,
  reloadAlbum,
} = await useGalleryAlbumController(props.slug);
</script>

<template>
  <section class="mx-auto max-w-site px-6 md:px-12 pb-14 pt-32 lg:px-20 md:pt-36">
    <NuxtLink :to="SiteRoutes.gallery" :class="[TextStyles.siteArrowLink, 'mb-6 inline-block']">
      ← All albums
    </NuxtLink>
    <AppLoader v-if="isLoading" />
    <AppErrorState v-else-if="hasError || !album" @retry="reloadAlbum" />
    <template v-else>
      <header class="mb-8 flex flex-col gap-2">
        <p :class="TextStyles.siteEyebrow">{{ AppStrings.galleryCategory[album.category] }}</p>
        <h1 :class="TextStyles.siteDisplay">{{ album.title }}</h1>
        <p :class="TextStyles.siteBody">{{ AppStrings.site.photos(photoCount) }}</p>
      </header>
      <AppEmptyState v-if="isEmpty" message="Photos for this album are coming soon." />
      <GalleryPhotoGrid v-else :photos="album.photos" @open-photo="openLightbox" />
    </template>
    <GalleryLightbox
      v-if="openPhoto && openPhotoIndex !== null"
      :photo="openPhoto"
      :position="openPhotoIndex + 1"
      :total="photoCount"
      @close="closeLightbox"
      @show-adjacent="showAdjacentPhoto"
    />
  </section>
</template>
