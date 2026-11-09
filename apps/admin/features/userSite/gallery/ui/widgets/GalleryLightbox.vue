<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import AppIcon from '~/common/widgets/AppIcon.vue';
import type { GalleryPhoto } from '../../model/gallery.model';

defineProps<{ photo: GalleryPhoto; position: number; total: number }>();
const emit = defineEmits<{ close: []; 'show-adjacent': [offset: number] }>();

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') emit('close');
  if (event.key === 'ArrowRight') emit('show-adjacent', 1);
  if (event.key === 'ArrowLeft') emit('show-adjacent', -1);
};
onMounted(() => window.addEventListener('keydown', handleKeydown));
onBeforeUnmount(() => window.removeEventListener('keydown', handleKeydown));

const navButtonClasses =
  'flex h-12 w-12 items-center justify-center rounded-full bg-textOnPrimary/10 text-textOnPrimary transition hover:bg-textOnPrimary/20';
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex flex-col bg-siteFooter/95 p-4"
    role="dialog"
    aria-modal="true"
    :aria-label="photo.alt"
  >
    <div class="flex items-center justify-between">
      <p :class="TextStyles.siteFooterCaption">{{ position }} / {{ total }}</p>
      <button
        type="button"
        :aria-label="AppStrings.actions.close"
        :class="navButtonClasses"
        @click="emit('close')"
      >
        <AppIcon name="close" class="h-6 w-6" />
      </button>
    </div>
    <div class="flex flex-1 items-center justify-center gap-3 overflow-hidden py-4">
      <button
        type="button"
        :aria-label="AppStrings.actions.previous"
        :class="[navButtonClasses, 'hidden sm:flex']"
        @click="emit('show-adjacent', -1)"
      >
        <AppIcon name="chevronLeft" class="h-6 w-6" />
      </button>
      <figure class="flex max-h-full flex-col items-center gap-3">
        <NuxtImg
          :src="photo.url"
          :alt="photo.alt"
          format="webp"
          class="max-h-[75vh] w-auto rounded-xl object-contain"
        />
        <figcaption v-if="photo.caption" :class="[TextStyles.siteFooterText, 'text-center']">
          {{ photo.caption }}
        </figcaption>
      </figure>
      <button
        type="button"
        :aria-label="AppStrings.actions.next"
        :class="[navButtonClasses, 'hidden sm:flex']"
        @click="emit('show-adjacent', 1)"
      >
        <AppIcon name="chevronRight" class="h-6 w-6" />
      </button>
    </div>
    <div class="flex justify-center gap-4 sm:hidden">
      <button
        type="button"
        :aria-label="AppStrings.actions.previous"
        :class="navButtonClasses"
        @click="emit('show-adjacent', -1)"
      >
        <AppIcon name="chevronLeft" class="h-6 w-6" />
      </button>
      <button
        type="button"
        :aria-label="AppStrings.actions.next"
        :class="navButtonClasses"
        @click="emit('show-adjacent', 1)"
      >
        <AppIcon name="chevronRight" class="h-6 w-6" />
      </button>
    </div>
  </div>
</template>
