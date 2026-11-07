<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import type { Photo } from '~/common/types/photo';
import AppButton from '~/common/widgets/AppButton.vue';
import AppEmptyState from '~/common/widgets/AppEmptyState.vue';
import AppImageField from '~/common/widgets/AppImageField.vue';
import AppTextField from '~/common/widgets/AppTextField.vue';

defineProps<{
  photos: Photo[];
  pendingPhotoUrl: string | null;
  pendingAltError?: string;
  isUploading: boolean;
  isAddingPhoto: boolean;
  deletingPhotoId: string | null;
}>();
const pendingAlt = defineModel<string>('pendingAlt', { required: true });
const emit = defineEmits<{
  'select-file': [file: File];
  'discard-pending': [];
  'add-photo': [];
  'delete-photo': [photo: Photo];
}>();
</script>

<template>
  <div class="flex flex-col gap-5">
    <div class="flex flex-col gap-3 rounded-xl bg-surface p-4">
      <AppImageField
        label="New photo"
        :file-url="pendingPhotoUrl"
        :preview-alt="pendingAlt"
        :is-uploading="isUploading"
        @select-file="emit('select-file', $event)"
        @remove-file="emit('discard-pending')"
      />
      <template v-if="pendingPhotoUrl">
        <AppTextField
          v-model="pendingAlt"
          :label="AppStrings.fields.altText"
          :error="pendingAltError"
          is-required
        />
        <AppButton class="self-start" :is-loading="isAddingPhoto" @click="emit('add-photo')"
          >Add photo</AppButton
        >
      </template>
    </div>

    <AppEmptyState v-if="photos.length === 0" message="No photos yet." />
    <ul v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li
        v-for="photo in photos"
        :key="photo.id"
        class="overflow-hidden rounded-lg border border-border"
      >
        <NuxtImg
          :src="photo.url"
          :alt="photo.alt"
          loading="lazy"
          class="aspect-[4/3] w-full object-cover"
        />
        <div class="flex items-start justify-between gap-2 p-3">
          <p :class="[TextStyles.caption, 'line-clamp-2']">{{ photo.alt }}</p>
          <AppButton
            variant="dangerGhost"
            size="sm"
            :is-loading="deletingPhotoId === photo.id"
            @click="emit('delete-photo', photo)"
          >
            {{ AppStrings.actions.delete }}
          </AppButton>
        </div>
      </li>
    </ul>
  </div>
</template>
