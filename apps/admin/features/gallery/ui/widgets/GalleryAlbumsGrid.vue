<script setup lang="ts">
import { ImageConstants } from '~/common/constants/imageConstants';
import { TextStyles } from '~/common/styles/textStyles';
import AppRowActions from '~/common/widgets/AppRowActions.vue';
import AppStatusBadge from '~/common/widgets/AppStatusBadge.vue';
import { getGalleryCategoryLabel, type GalleryAlbum } from '../../model/gallery.model';

defineProps<{ albums: GalleryAlbum[] }>();
const emit = defineEmits<{
  'edit-album': [album: GalleryAlbum];
  'delete-album': [album: GalleryAlbum];
}>();
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <article
      v-for="album in albums"
      :key="album.id"
      class="overflow-hidden rounded-2xl border border-border/70 bg-background shadow-card"
    >
      <NuxtLink :to="`/gallery/${album.id}`" class="block">
        <NuxtImg
          :src="album.coverUrl || ImageConstants.placeholders.image"
          :alt="album.title"
          loading="lazy"
          class="aspect-[4/3] w-full bg-surface object-cover"
        />
      </NuxtLink>
      <div class="flex flex-col gap-2 p-4">
        <div class="flex items-start justify-between gap-2">
          <NuxtLink :to="`/gallery/${album.id}`" :class="TextStyles.cardTitleLink">{{
            album.title
          }}</NuxtLink>
          <AppStatusBadge
            :label="album.isActive ? 'Visible' : 'Hidden'"
            :tone="album.isActive ? 'success' : 'neutral'"
          />
        </div>
        <p :class="TextStyles.caption">
          {{ getGalleryCategoryLabel(album.category) }} · {{ album.imageCount }} photos
        </p>
        <AppRowActions @edit="emit('edit-album', album)" @delete="emit('delete-album', album)" />
      </div>
    </article>
  </div>
</template>
