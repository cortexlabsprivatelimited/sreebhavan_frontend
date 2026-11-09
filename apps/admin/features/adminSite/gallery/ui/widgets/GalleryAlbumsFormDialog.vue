<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import type { FormErrors } from '~/common/types/form';
import AppButton from '~/common/widgets/AppButton.vue';
import AppImageField from '~/common/widgets/AppImageField.vue';
import AppModal from '~/common/widgets/AppModal.vue';
import AppSelectField from '~/common/widgets/AppSelectField.vue';
import AppTextField from '~/common/widgets/AppTextField.vue';
import AppToggle from '~/common/widgets/AppToggle.vue';
import { GalleryCategoryOptions, type GalleryAlbumForm } from '../../model/gallery.model';

defineProps<{
  isOpen: boolean;
  isEditing: boolean;
  formErrors: FormErrors<GalleryAlbumForm>;
  isSaving: boolean;
  isUploading: boolean;
  saveErrorMessage: string | null;
}>();
const form = defineModel<GalleryAlbumForm>({ required: true });
const emit = defineEmits<{ close: []; 'save-album': []; 'select-cover': [file: File] }>();
</script>

<template>
  <AppModal
    :is-open="isOpen"
    :title="isEditing ? 'Edit album' : 'Add album'"
    @close="emit('close')"
  >
    <form
      id="gallery-album-form"
      class="flex flex-col gap-4"
      novalidate
      @submit.prevent="emit('save-album')"
    >
      <AppTextField
        v-model="form.title"
        label="Album title"
        placeholder="Wedding of Arun & Meera"
        :error="formErrors.title"
        is-required
      />
      <AppTextField
        v-model="form.slug"
        :label="AppStrings.fields.slug"
        :hint="`/gallery/${form.slug}`"
        :error="formErrors.slug"
        is-required
      />
      <AppSelectField
        :model-value="form.category"
        label="Category"
        :options="GalleryCategoryOptions"
        @update:model-value="form.category = $event as GalleryAlbumForm['category']"
      />
      <AppImageField
        label="Cover image"
        hint="You can also pick a cover from the album's photos."
        :file-url="form.coverUrl || null"
        :preview-alt="form.title"
        :is-uploading="isUploading"
        @select-file="emit('select-cover', $event)"
        @remove-file="form.coverUrl = ''"
      />
      <AppTextField
        v-model.number="form.sortOrder"
        :label="AppStrings.fields.sortOrder"
        type="number"
      />
      <AppToggle v-model="form.isActive" label="Show on website" />
      <p v-if="saveErrorMessage" :class="TextStyles.errorText" role="alert">
        {{ saveErrorMessage }}
      </p>
    </form>
    <template #footer>
      <AppButton variant="secondary" @click="emit('close')">{{
        AppStrings.actions.cancel
      }}</AppButton>
      <AppButton
        type="submit"
        form="gallery-album-form"
        :is-loading="isSaving"
        :is-disabled="isUploading"
        >{{ AppStrings.actions.save }}</AppButton
      >
    </template>
  </AppModal>
</template>
