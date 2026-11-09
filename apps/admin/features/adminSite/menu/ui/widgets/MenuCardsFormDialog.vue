<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { AppConfig } from '~/common/constants/appConfig';
import { TextStyles } from '~/common/styles/textStyles';
import type { FormErrors } from '~/common/types/form';
import AppButton from '~/common/widgets/AppButton.vue';
import AppImageField from '~/common/widgets/AppImageField.vue';
import AppModal from '~/common/widgets/AppModal.vue';
import AppTextField from '~/common/widgets/AppTextField.vue';
import AppToggle from '~/common/widgets/AppToggle.vue';
import { isPdfUrl, type MenuCardForm } from '../../model/menu.model';

defineProps<{
  isOpen: boolean;
  isEditing: boolean;
  formErrors: FormErrors<MenuCardForm>;
  isSaving: boolean;
  isUploading: boolean;
  saveErrorMessage: string | null;
}>();
const form = defineModel<MenuCardForm>({ required: true });
const emit = defineEmits<{ close: []; 'save-card': []; 'select-file': [file: File] }>();

const acceptedTypes = AppConfig.allowedMenuCardTypes.join(',');
</script>

<template>
  <AppModal
    :is-open="isOpen"
    :title="isEditing ? 'Edit menu card' : 'Add menu card'"
    @close="emit('close')"
  >
    <form
      id="menu-card-form"
      class="flex flex-col gap-4"
      novalidate
      @submit.prevent="emit('save-card')"
    >
      <AppTextField
        v-model="form.title"
        label="Title"
        placeholder="Full menu"
        :error="formErrors.title"
        is-required
      />
      <AppImageField
        label="Menu file (PDF or image)"
        :hint="`Up to ${AppConfig.maxUploadSizeMb} MB. Visitors can view and download it.`"
        :file-url="form.fileUrl || null"
        :preview-alt="form.title"
        :accept="acceptedTypes"
        :is-image="!isPdfUrl(form.fileUrl)"
        :is-uploading="isUploading"
        :error="formErrors.fileUrl"
        is-required
        @select-file="emit('select-file', $event)"
        @remove-file="form.fileUrl = ''"
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
        form="menu-card-form"
        :is-loading="isSaving"
        :is-disabled="isUploading"
        >{{ AppStrings.actions.save }}</AppButton
      >
    </template>
  </AppModal>
</template>
