<script setup lang="ts">
import type { GalleryPhoto } from '../../model/gallery.model';

defineProps<{ photos: GalleryPhoto[] }>();
const emit = defineEmits<{ 'open-photo': [index: number] }>();
</script>

<template>
  <div class="columns-2 gap-3 md:columns-3 lg:columns-4">
    <button
      v-for="(photo, index) in photos"
      :key="photo.id"
      type="button"
      :aria-label="`Open photo: ${photo.alt}`"
      class="mb-3 block w-full overflow-hidden rounded-2xl"
      @click="emit('open-photo', index)"
    >
      <NuxtImg
        :src="photo.thumbUrl"
        :alt="photo.alt"
        format="webp"
        loading="lazy"
        class="w-full object-cover transition duration-300 hover:scale-105"
      />
    </button>
  </div>
</template>
