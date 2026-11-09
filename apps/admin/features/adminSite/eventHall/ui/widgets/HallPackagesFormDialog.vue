<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import type { FormErrors } from '~/common/types/form';
import AppButton from '~/common/widgets/AppButton.vue';
import AppModal from '~/common/widgets/AppModal.vue';
import AppTextArea from '~/common/widgets/AppTextArea.vue';
import AppTextField from '~/common/widgets/AppTextField.vue';
import type { HallPackageForm } from '../../model/eventHall.model';

defineProps<{
  isOpen: boolean;
  isEditing: boolean;
  formErrors: FormErrors<HallPackageForm>;
  isSaving: boolean;
  saveErrorMessage: string | null;
}>();
const form = defineModel<HallPackageForm>({ required: true });
const emit = defineEmits<{ close: []; 'save-package': [] }>();
</script>

<template>
  <AppModal
    :is-open="isOpen"
    :title="isEditing ? 'Edit package' : 'Add package'"
    @close="emit('close')"
  >
    <form
      id="hall-package-form"
      class="flex flex-col gap-4"
      novalidate
      @submit.prevent="emit('save-package')"
    >
      <AppTextField
        v-model="form.name"
        label="Package name"
        placeholder="Wedding – full day"
        :error="formErrors.name"
        is-required
      />
      <AppTextField
        v-model.number="form.price"
        label="Price (₹)"
        type="number"
        :error="formErrors.price"
        is-required
      />
      <AppTextArea
        v-model="form.inclusionsText"
        label="What's included"
        :rows="3"
        hint="Comma separated, e.g. Hall for 12 hours, Stage decoration, 2 AC rooms"
      />
      <AppTextField
        v-model.number="form.sortOrder"
        :label="AppStrings.fields.sortOrder"
        type="number"
      />
      <p v-if="saveErrorMessage" :class="TextStyles.errorText" role="alert">
        {{ saveErrorMessage }}
      </p>
    </form>
    <template #footer>
      <AppButton variant="secondary" @click="emit('close')">{{
        AppStrings.actions.cancel
      }}</AppButton>
      <AppButton type="submit" form="hall-package-form" :is-loading="isSaving">{{
        AppStrings.actions.save
      }}</AppButton>
    </template>
  </AppModal>
</template>
