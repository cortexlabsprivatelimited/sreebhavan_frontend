<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import AppButton from '~/common/widgets/AppButton.vue';
import AppStatusBadge from '~/common/widgets/AppStatusBadge.vue';
import type { GalleryImage } from '../../model/gallery.model';

defineProps<{ images: GalleryImage[]; coverUrl: string }>();
const emit = defineEmits<{
  'edit-image': [image: GalleryImage];
  'delete-image': [image: GalleryImage];
  'set-cover': [image: GalleryImage];
}>();
</script>

<template>
  <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <li
      v-for="image in images"
      :key="image.id"
      class="overflow-hidden rounded-2xl border border-border/70 bg-background shadow-card"
    >
      <div class="relative">
        <NuxtImg
          :src="image.thumbUrl"
          :alt="image.alt"
          loading="lazy"
          class="aspect-square w-full object-cover"
        />
        <AppStatusBadge
          v-if="image.url === coverUrl"
          class="absolute left-2 top-2"
          label="Cover"
          tone="info"
        />
      </div>
      <div class="flex flex-col gap-2 p-3">
        <p :class="[TextStyles.caption, 'line-clamp-2']">{{ image.caption || image.alt }}</p>
        <div class="flex flex-wrap gap-1">
          <AppButton variant="ghost" size="sm" @click="emit('edit-image', image)">{{
            AppStrings.actions.edit
          }}</AppButton>
          <AppButton
            v-if="image.url !== coverUrl"
            variant="ghost"
            size="sm"
            @click="emit('set-cover', image)"
            >Set as cover</AppButton
          >
          <AppButton variant="dangerGhost" size="sm" @click="emit('delete-image', image)">
            {{ AppStrings.actions.delete }}
          </AppButton>
        </div>
      </div>
    </li>
  </ul>
</template>
