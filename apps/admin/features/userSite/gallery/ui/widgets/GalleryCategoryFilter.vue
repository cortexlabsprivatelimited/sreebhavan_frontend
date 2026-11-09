<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import type { GalleryCategory } from '../../model/gallery.model';

defineProps<{ categories: GalleryCategory[]; selectedCategory: GalleryCategory | null }>();
const emit = defineEmits<{ 'select-category': [category: GalleryCategory | null] }>();

const chipClasses = (isActive: boolean) => [
  TextStyles.siteButton,
  'whitespace-nowrap rounded-full border px-4 py-2 transition',
  isActive
    ? 'border-primary bg-primary text-textOnPrimary'
    : 'border-siteHairline bg-background text-textSecondary hover:border-primary hover:text-primary',
];
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      :aria-pressed="selectedCategory === null"
      :class="chipClasses(selectedCategory === null)"
      @click="emit('select-category', null)"
    >
      All
    </button>
    <button
      v-for="category in categories"
      :key="category"
      type="button"
      :aria-pressed="selectedCategory === category"
      :class="chipClasses(selectedCategory === category)"
      @click="emit('select-category', category)"
    >
      {{ AppStrings.galleryCategory[category] }}
    </button>
  </div>
</template>
