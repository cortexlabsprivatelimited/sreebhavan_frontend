<script setup lang="ts">
import { ImageConstants } from '~/common/constants/imageConstants';
import type { Room, RoomImage } from '../../model/rooms.model';

defineProps<{ room: Room; selectedImage: RoomImage | null; selectedIndex: number }>();
const emit = defineEmits<{ 'select-image': [index: number] }>();
</script>

<template>
  <div class="flex flex-col gap-3">
    <NuxtImg
      :src="selectedImage?.url ?? ImageConstants.placeholders.image"
      :alt="selectedImage?.alt ?? room.name"
      format="webp"
      class="aspect-[4/3] w-full rounded-3xl object-cover shadow-siteCard"
    />
    <div v-if="room.images.length > 1" class="grid grid-cols-4 gap-3 sm:grid-cols-5">
      <button
        v-for="(image, index) in room.images"
        :key="image.id"
        type="button"
        :aria-label="`Show photo ${index + 1}: ${image.alt}`"
        :aria-pressed="index === selectedIndex"
        :class="[
          'overflow-hidden rounded-xl border-2 transition',
          index === selectedIndex
            ? 'border-primary'
            : 'border-transparent opacity-80 hover:opacity-100',
        ]"
        @click="emit('select-image', index)"
      >
        <NuxtImg
          :src="image.url"
          :alt="image.alt"
          format="webp"
          loading="lazy"
          class="aspect-square w-full object-cover"
        />
      </button>
    </div>
  </div>
</template>
