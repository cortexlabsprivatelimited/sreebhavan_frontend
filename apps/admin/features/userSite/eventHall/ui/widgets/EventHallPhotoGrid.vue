<script setup lang="ts">
import type { PublicImage } from '~/common/types/userSite';

defineProps<{ images: PublicImage[] }>();
</script>

<template>
  <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
    <NuxtImg
      v-for="(image, index) in images"
      :key="image.id"
      :src="image.url"
      :alt="image.alt"
      format="webp"
      loading="lazy"
      :class="[
        'h-full w-full rounded-2xl object-cover',
        index === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square',
      ]"
    />
  </div>
</template>
