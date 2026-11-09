<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';
import type { MenuCategory } from '../../model/menu.model';

defineProps<{ categories: MenuCategory[]; selectedSlug: string | null }>();
const emit = defineEmits<{ 'select-category': [slug: string | null] }>();

const chipClasses = (isActive: boolean) => [
  TextStyles.siteButton,
  'whitespace-nowrap rounded-full border px-4 py-2 transition',
  isActive
    ? 'border-primary bg-primary text-textOnPrimary'
    : 'border-siteHairline bg-background text-textSecondary hover:border-primary hover:text-primary',
];
</script>

<template>
  <div
    class="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1"
    role="tablist"
    aria-label="Menu categories"
  >
    <button
      type="button"
      role="tab"
      :aria-selected="selectedSlug === null"
      :class="chipClasses(selectedSlug === null)"
      @click="emit('select-category', null)"
    >
      All
    </button>
    <button
      v-for="category in categories"
      :key="category.id"
      type="button"
      role="tab"
      :aria-selected="selectedSlug === category.slug"
      :class="chipClasses(selectedSlug === category.slug)"
      @click="emit('select-category', category.slug)"
    >
      {{ category.name }}
    </button>
  </div>
</template>
