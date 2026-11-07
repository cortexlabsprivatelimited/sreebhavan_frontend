<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { AppConfig } from '~/common/constants/appConfig';
import { TextStyles } from '~/common/styles/textStyles';
import AppButton from '~/common/widgets/AppButton.vue';
import AppCard from '~/common/widgets/AppCard.vue';
import AppTextField from '~/common/widgets/AppTextField.vue';
import type { PendingGalleryUpload } from '../../model/gallery.model';

defineProps<{ isSaving: boolean; canSave: boolean; hasMissingAlt: boolean }>();
const pendingUploads = defineModel<PendingGalleryUpload[]>({ required: true });
const emit = defineEmits<{
  'select-files': [files: File[]];
  'remove-upload': [key: string];
  'save-uploads': [];
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
  <AppCard
    title="Add photos"
    :description="`Pick several photos at once (up to ${AppConfig.maxUploadSizeMb} MB each). Alt text is required for each photo.`"
  >
    <template #actions>
      <AppButton variant="secondary" @click="fileInput?.click()">Choose photos</AppButton>
    </template>
    <input
      ref="fileInput"
      type="file"
      class="hidden"
      multiple
      :accept="acceptedTypes"
      @change="emitSelectedFiles"
    />

    <ul v-if="pendingUploads.length > 0" class="flex flex-col gap-3">
      <li
        v-for="upload in pendingUploads"
        :key="upload.key"
        class="grid items-start gap-3 rounded-lg border border-border p-3 md:grid-cols-[96px_1fr_1fr_auto]"
      >
        <div
          :class="[
            TextStyles.caption,
            'flex h-20 w-24 items-center justify-center overflow-hidden rounded-md bg-surface',
          ]"
        >
          <NuxtImg
            v-if="upload.url"
            :src="upload.thumbUrl ?? upload.url"
            :alt="upload.alt || upload.fileName"
            class="h-full w-full object-cover"
          />
          <span v-else-if="upload.isUploading">{{ AppStrings.states.uploading }}</span>
          <span v-else :class="TextStyles.errorText">Failed</span>
        </div>
        <AppTextField
          v-model="upload.alt"
          :label="AppStrings.fields.altText"
          :error="upload.errorMessage ?? undefined"
          is-required
        />
        <AppTextField v-model="upload.caption" label="Caption" />
        <AppButton
          variant="ghost"
          size="sm"
          class="md:mt-7"
          @click="emit('remove-upload', upload.key)"
        >
          {{ AppStrings.actions.removeImage }}
        </AppButton>
      </li>
    </ul>
    <div v-if="pendingUploads.length > 0" class="mt-4 flex items-center gap-4">
      <AppButton :is-loading="isSaving" :is-disabled="!canSave" @click="emit('save-uploads')">
        Save {{ pendingUploads.length }} photos
      </AppButton>
      <p v-if="hasMissingAlt" :class="TextStyles.errorText">
        {{ AppStrings.validation.altRequired }}
      </p>
    </div>
  </AppCard>
</template>
