<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { ImageConstants } from '~/common/constants/imageConstants';
import { SiteRoutes } from '~/common/constants/userSiteNavigation';
import { TextStyles } from '~/common/styles/textStyles';
import type { GalleryAlbum } from '../../model/gallery.model';

defineProps<{ album: GalleryAlbum }>();
</script>

<template>
  <NuxtLink
    :to="SiteRoutes.galleryAlbumBySlug(album.slug)"
    class="group relative block overflow-hidden rounded-3xl shadow-siteCard"
  >
    <NuxtImg
      :src="album.coverUrl ?? ImageConstants.placeholders.image"
      :alt="album.title"
      format="webp"
      loading="lazy"
      class="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
    />
    <div
      class="absolute inset-0 bg-gradient-to-t from-siteFooter/90 via-siteFooter/20 to-transparent"
    />
    <div class="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5">
      <p :class="TextStyles.siteHeroEyebrow">{{ AppStrings.galleryCategory[album.category] }}</p>
      <h2 :class="TextStyles.siteFooterTitle">{{ album.title }}</h2>
      <p :class="TextStyles.siteFooterCaption">{{ AppStrings.site.photos(album.imageCount) }}</p>
    </div>
  </NuxtLink>
</template>
