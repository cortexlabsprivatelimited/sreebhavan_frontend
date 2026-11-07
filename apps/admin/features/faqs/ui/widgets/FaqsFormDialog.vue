<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import type { SelectOption } from '~/common/types/api';
import type { FormErrors } from '~/common/types/form';
import AppButton from '~/common/widgets/AppButton.vue';
import AppModal from '~/common/widgets/AppModal.vue';
import AppSelectField from '~/common/widgets/AppSelectField.vue';
import AppTextArea from '~/common/widgets/AppTextArea.vue';
import AppTextField from '~/common/widgets/AppTextField.vue';
import type { FaqForm } from '../../model/faqs.model';

defineProps<{
  isOpen: boolean;
  isEditing: boolean;
  formErrors: FormErrors<FaqForm>;
  businessOptions: SelectOption[];
  isSaving: boolean;
  saveErrorMessage: string | null;
}>();
const form = defineModel<FaqForm>({ required: true });
const emit = defineEmits<{ close: []; 'save-faq': [] }>();
</script>

<template>
  <AppModal :is-open="isOpen" :title="isEditing ? 'Edit FAQ' : 'Add FAQ'" @close="emit('close')">
    <form id="faq-form" class="flex flex-col gap-4" novalidate @submit.prevent="emit('save-faq')">
      <AppTextField
        v-model="form.question"
        label="Question"
        :error="formErrors.question"
        is-required
      />
      <AppTextArea
        v-model="form.answer"
        label="Answer"
        :rows="5"
        :error="formErrors.answer"
        is-required
      />
      <div class="grid gap-4 sm:grid-cols-2">
        <AppSelectField
          :model-value="form.businessId ?? ''"
          :label="AppStrings.fields.business"
          :options="businessOptions"
          placeholder="General"
          @update:model-value="form.businessId = $event || null"
        />
        <AppTextField
          v-model.number="form.sortOrder"
          :label="AppStrings.fields.sortOrder"
          type="number"
        />
      </div>
      <p v-if="saveErrorMessage" :class="TextStyles.errorText" role="alert">
        {{ saveErrorMessage }}
      </p>
    </form>
    <template #footer>
      <AppButton variant="secondary" @click="emit('close')">{{
        AppStrings.actions.cancel
      }}</AppButton>
      <AppButton type="submit" form="faq-form" :is-loading="isSaving">{{
        AppStrings.actions.save
      }}</AppButton>
    </template>
  </AppModal>
</template>
