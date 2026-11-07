<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { AppConfig } from '~/common/constants/appConfig';
import { TextStyles } from '~/common/styles/textStyles';
import type { FormErrors } from '~/common/types/form';
import AppButton from '~/common/widgets/AppButton.vue';
import AppImageField from '~/common/widgets/AppImageField.vue';
import AppModal from '~/common/widgets/AppModal.vue';
import AppTextArea from '~/common/widgets/AppTextArea.vue';
import AppTextField from '~/common/widgets/AppTextField.vue';
import type { BusinessForm } from '../../model/businesses.model';
import BusinessesTimingsEditor from './BusinessesTimingsEditor.vue';

defineProps<{
  isOpen: boolean;
  formErrors: FormErrors<BusinessForm>;
  isSaving: boolean;
  isUploading: boolean;
  saveErrorMessage: string | null;
}>();
const form = defineModel<BusinessForm>({ required: true });
const emit = defineEmits<{
  close: [];
  'save-business': [];
  'select-logo': [file: File];
  'add-timing': [];
  'remove-timing': [index: number];
}>();
</script>

<template>
  <AppModal :is-open="isOpen" :title="`Edit ${form.name}`" size="lg" @close="emit('close')">
    <form
      id="business-form"
      class="grid gap-4 sm:grid-cols-2"
      novalidate
      @submit.prevent="emit('save-business')"
    >
      <AppTextField
        v-model="form.name"
        class="sm:col-span-2"
        label="Business name"
        :error="formErrors.name"
        is-required
      />
      <AppImageField
        class="sm:col-span-2"
        label="Logo"
        :accept="AppConfig.allowedLogoTypes.join(',')"
        :file-url="form.logoUrl || null"
        :preview-alt="`${form.name} logo`"
        :is-uploading="isUploading"
        @select-file="emit('select-logo', $event)"
        @remove-file="form.logoUrl = ''"
      />
      <AppTextField
        v-model="form.whatsAppNumber"
        label="WhatsApp number"
        type="tel"
        hint="Enquiries for this business open WhatsApp with this number."
        :error="formErrors.whatsAppNumber"
        is-required
      />
      <AppTextField v-model="form.phone" label="Phone" type="tel" :error="formErrors.phone" />
      <AppTextArea v-model="form.about" class="sm:col-span-2" label="About" :rows="5" />
      <BusinessesTimingsEditor
        v-model="form.timings"
        class="sm:col-span-2"
        @add-timing="emit('add-timing')"
        @remove-timing="emit('remove-timing', $event)"
      />
      <p v-if="saveErrorMessage" :class="[TextStyles.errorText, 'sm:col-span-2']" role="alert">
        {{ saveErrorMessage }}
      </p>
    </form>
    <template #footer>
      <AppButton variant="secondary" @click="emit('close')">{{
        AppStrings.actions.cancel
      }}</AppButton>
      <AppButton type="submit" form="business-form" :is-loading="isSaving">{{
        AppStrings.actions.save
      }}</AppButton>
    </template>
  </AppModal>
</template>
