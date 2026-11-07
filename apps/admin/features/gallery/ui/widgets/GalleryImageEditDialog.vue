<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import AppButton from '~/common/widgets/AppButton.vue';
import AppModal from '~/common/widgets/AppModal.vue';
import AppTextField from '~/common/widgets/AppTextField.vue';
import type { GalleryImage, GalleryImageEditForm } from '../../model/gallery.model';

defineProps<{ image: GalleryImage | null; altError?: string; isSaving: boolean }>();
const form = defineModel<GalleryImageEditForm>({ required: true });
const emit = defineEmits<{ close: []; 'save-image': [] }>();
</script>

<template>
  <AppModal :is-open="Boolean(image)" title="Edit photo" @close="emit('close')">
    <form
      v-if="image"
      id="gallery-image-form"
      class="flex flex-col gap-4"
      novalidate
      @submit.prevent="emit('save-image')"
    >
      <NuxtImg
        :src="image.thumbUrl"
        :alt="image.alt"
        class="max-h-64 w-full rounded-lg object-contain"
      />
      <AppTextField
        v-model="form.alt"
        :label="AppStrings.fields.altText"
        :error="altError"
        is-required
      />
      <AppTextField v-model="form.caption" label="Caption" />
      <AppTextField
        v-model.number="form.sortOrder"
        :label="AppStrings.fields.sortOrder"
        type="number"
      />
    </form>
    <template #footer>
      <AppButton variant="secondary" @click="emit('close')">{{
        AppStrings.actions.cancel
      }}</AppButton>
      <AppButton type="submit" form="gallery-image-form" :is-loading="isSaving">{{
        AppStrings.actions.save
      }}</AppButton>
    </template>
  </AppModal>
</template>
