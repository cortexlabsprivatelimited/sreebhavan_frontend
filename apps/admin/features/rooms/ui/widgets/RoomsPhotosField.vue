<script setup lang="ts">
import { AppConfig } from '~/common/constants/appConfig';
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import AppButton from '~/common/widgets/AppButton.vue';
import AppIcon from '~/common/widgets/AppIcon.vue';
import type { RoomFormPhoto } from '../../model/rooms.model';

/** Room photos inside the add/edit form. First photo is the cover on the website. */
defineProps<{ isUploading: boolean; error?: string }>();
const photos = defineModel<RoomFormPhoto[]>({ required: true });
const emit = defineEmits<{
  'select-files': [files: File[]];
  'remove-photo': [photo: RoomFormPhoto];
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const acceptedTypes = AppConfig.allowedImageTypes.join(',');

const emitSelectedFiles = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const files = Array.from(input.files ?? []);
  if (files.length > 0) emit('select-files', files);
  input.value = '';
};
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div>
        <p :class="TextStyles.label">Room photos</p>
        <p :class="TextStyles.caption">
          Up to {{ AppConfig.maxUploadSizeMb }} MB each. The first photo is the cover.
        </p>
      </div>
      <AppButton
        variant="secondary"
        size="sm"
        :is-loading="isUploading"
        @click="fileInput?.click()"
      >
        <AppIcon name="banners" class="h-4 w-4" />
        {{ isUploading ? AppStrings.states.uploading : 'Add photos' }}
      </AppButton>
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        multiple
        :accept="acceptedTypes"
        @change="emitSelectedFiles"
      />
    </div>

    <button
      v-if="photos.length === 0"
      type="button"
      :class="[
        TextStyles.bodySmall,
        'flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border bg-surface/60 py-8 transition hover:border-primary/50 hover:bg-primaryLight',
      ]"
      @click="fileInput?.click()"
    >
      <AppIcon name="gallery" class="h-8 w-8 text-primary" />
      Click to choose room photos
    </button>

    <ul v-else class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <li
        v-for="(photo, index) in photos"
        :key="photo.key"
        class="overflow-hidden rounded-xl border border-border bg-background"
      >
        <div class="relative">
          <NuxtImg :src="photo.url" :alt="photo.alt" class="aspect-[4/3] w-full object-cover" />
          <span
            v-if="index === 0"
            :class="[
              TextStyles.badge,
              'absolute left-2 top-2 rounded-full bg-primary px-2.5 py-1 text-textOnPrimary',
            ]"
          >
            Cover
          </span>
          <button
            type="button"
            :aria-label="AppStrings.actions.removeImage"
            class="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-error shadow-card transition hover:bg-errorLight"
            @click="emit('remove-photo', photo)"
          >
            <AppIcon name="close" class="h-4 w-4" />
          </button>
        </div>
        <div class="p-2.5">
          <input
            v-model="photo.alt"
            type="text"
            placeholder="Alt text, e.g. Deluxe room with double bed"
            :aria-label="AppStrings.fields.altText"
            :disabled="photo.id !== null"
            :class="[
              TextStyles.input,
              'w-full rounded-lg border px-2.5 py-1.5 outline-none focus:border-primary focus:ring-2 focus:ring-primaryLight disabled:border-transparent disabled:bg-surface',
              error && !photo.alt.trim() ? 'border-error' : 'border-border',
            ]"
          />
        </div>
      </li>
    </ul>
    <p v-if="error" :class="TextStyles.errorText">{{ error }}</p>
  </div>
</template>
