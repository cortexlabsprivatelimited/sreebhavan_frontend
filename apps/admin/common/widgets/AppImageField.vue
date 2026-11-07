<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import AppButton from '~/common/widgets/AppButton.vue';

/**
 * Shows the current image (or file link) and lets the admin pick a new file.
 * The controller does the upload when `select-file` fires and passes back `fileUrl`.
 */
withDefaults(
  defineProps<{
    label: string;
    fileUrl: string | null;
    previewAlt?: string;
    accept?: string;
    isUploading?: boolean;
    isImage?: boolean;
    hint?: string;
    error?: string;
    isRequired?: boolean;
  }>(),
  {
    previewAlt: '',
    accept: 'image/jpeg,image/png,image/webp',
    isImage: true,
    hint: undefined,
    error: undefined,
  },
);
const emit = defineEmits<{ 'select-file': [file: File]; 'remove-file': [] }>();

const fileInput = ref<HTMLInputElement | null>(null);

const pickFile = () => fileInput.value?.click();

const emitSelectedFile = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) emit('select-file', file);
  input.value = '';
};
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <span :class="TextStyles.label">
      {{ label }}<span v-if="isRequired" :class="TextStyles.requiredMark"> *</span>
    </span>
    <div class="flex items-center gap-4 rounded-lg border border-dashed border-border p-3">
      <NuxtImg
        v-if="fileUrl && isImage"
        :src="fileUrl"
        :alt="previewAlt || label"
        class="h-20 w-28 rounded-md bg-surface object-cover"
      />
      <a
        v-else-if="fileUrl"
        :href="fileUrl"
        target="_blank"
        rel="noopener"
        :class="[TextStyles.link, 'truncate']"
      >
        {{ fileUrl.split('/').pop() }}
      </a>
      <div
        v-else
        :class="[
          TextStyles.caption,
          'flex h-20 w-28 items-center justify-center rounded-md bg-surface',
        ]"
      >
        No file
      </div>
      <div class="flex flex-wrap gap-2">
        <AppButton variant="secondary" size="sm" :is-loading="isUploading" @click="pickFile">
          {{
            isUploading
              ? AppStrings.states.uploading
              : fileUrl
                ? AppStrings.actions.replaceImage
                : AppStrings.actions.upload
          }}
        </AppButton>
        <AppButton v-if="fileUrl" variant="ghost" size="sm" @click="emit('remove-file')">
          {{ AppStrings.actions.removeImage }}
        </AppButton>
      </div>
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        :accept="accept"
        @change="emitSelectedFile"
      />
    </div>
    <p v-if="error" :class="TextStyles.errorText">{{ error }}</p>
    <p v-else-if="hint" :class="TextStyles.caption">{{ hint }}</p>
  </div>
</template>
