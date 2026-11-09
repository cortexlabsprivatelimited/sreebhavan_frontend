<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import type { FormErrors } from '~/common/types/form';
import AppButton from '~/common/widgets/AppButton.vue';
import AppImageField from '~/common/widgets/AppImageField.vue';
import AppModal from '~/common/widgets/AppModal.vue';
import AppTextField from '~/common/widgets/AppTextField.vue';
import AppToggle from '~/common/widgets/AppToggle.vue';
import type { MenuCategoryForm } from '../../model/menu.model';

defineProps<{
  isOpen: boolean;
  isEditing: boolean;
  formErrors: FormErrors<MenuCategoryForm>;
  isSaving: boolean;
  isUploading: boolean;
  saveErrorMessage: string | null;
}>();
const form = defineModel<MenuCategoryForm>({ required: true });
const emit = defineEmits<{ close: []; 'save-category': []; 'select-image': [file: File] }>();
</script>

<template>
  <AppModal
    :is-open="isOpen"
    :title="isEditing ? 'Edit category' : 'Add category'"
    @close="emit('close')"
  >
    <form
      id="menu-category-form"
      class="flex flex-col gap-4"
      novalidate
      @submit.prevent="emit('save-category')"
    >
      <AppTextField
        v-model="form.name"
        label="Name (English)"
        placeholder="South Indian breakfast"
        :error="formErrors.name"
        is-required
      />
      <AppTextField v-model="form.nameMl" label="Name (Malayalam)" />
      <AppTextField
        v-model="form.slug"
        :label="AppStrings.fields.slug"
        :hint="isEditing ? 'Changing the slug changes the page URL.' : undefined"
        :error="formErrors.slug"
        is-required
      />
      <AppImageField
        label="Category image"
        :file-url="form.imageUrl || null"
        :preview-alt="form.name"
        :is-uploading="isUploading"
        @select-file="emit('select-image', $event)"
        @remove-file="form.imageUrl = ''"
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
        form="menu-category-form"
        :is-loading="isSaving"
        :is-disabled="isUploading"
        >{{ AppStrings.actions.save }}</AppButton
      >
    </template>
  </AppModal>
</template>
