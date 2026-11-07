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
import AppToggle from '~/common/widgets/AppToggle.vue';
import { RatingOptions, type TestimonialForm } from '../../model/testimonials.model';

defineProps<{
  isOpen: boolean;
  isEditing: boolean;
  formErrors: FormErrors<TestimonialForm>;
  businessOptions: SelectOption[];
  isSaving: boolean;
  saveErrorMessage: string | null;
}>();
const form = defineModel<TestimonialForm>({ required: true });
const emit = defineEmits<{ close: []; 'save-testimonial': [] }>();
</script>

<template>
  <AppModal
    :is-open="isOpen"
    :title="isEditing ? 'Edit testimonial' : 'Add testimonial'"
    @close="emit('close')"
  >
    <form
      id="testimonial-form"
      class="flex flex-col gap-4"
      novalidate
      @submit.prevent="emit('save-testimonial')"
    >
      <p :class="TextStyles.caption">
        Add only genuine customer reviews. Google penalises made-up ratings.
      </p>
      <AppTextField
        v-model="form.name"
        label="Customer name"
        :error="formErrors.name"
        is-required
      />
      <AppTextArea v-model="form.text" label="Review" :error="formErrors.text" is-required />
      <div class="grid gap-4 sm:grid-cols-2">
        <AppSelectField
          :model-value="String(form.rating)"
          label="Rating"
          :options="RatingOptions"
          :error="formErrors.rating"
          @update:model-value="form.rating = Number($event)"
        />
        <AppSelectField
          :model-value="form.businessId ?? ''"
          :label="AppStrings.fields.business"
          :options="businessOptions"
          :placeholder="AppStrings.fields.allBusinesses"
          @update:model-value="form.businessId = $event || null"
        />
        <AppTextField
          v-model.number="form.sortOrder"
          :label="AppStrings.fields.sortOrder"
          type="number"
        />
      </div>
      <AppToggle v-model="form.isActive" label="Show on website" />
      <p v-if="saveErrorMessage" :class="TextStyles.errorText" role="alert">
        {{ saveErrorMessage }}
      </p>
    </form>
    <template #footer>
      <AppButton variant="secondary" @click="emit('close')">{{
        AppStrings.actions.cancel
      }}</AppButton>
      <AppButton type="submit" form="testimonial-form" :is-loading="isSaving">{{
        AppStrings.actions.save
      }}</AppButton>
    </template>
  </AppModal>
</template>
