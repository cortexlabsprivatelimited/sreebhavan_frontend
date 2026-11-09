<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import type { SelectOption } from '~/common/types/api';
import type { FormErrors } from '~/common/types/form';
import AppButton from '~/common/widgets/AppButton.vue';
import AppImageField from '~/common/widgets/AppImageField.vue';
import AppModal from '~/common/widgets/AppModal.vue';
import AppSelectField from '~/common/widgets/AppSelectField.vue';
import AppTextField from '~/common/widgets/AppTextField.vue';
import AppToggle from '~/common/widgets/AppToggle.vue';
import type { SpecialOfferForm } from '../../model/specialOffers.model';

defineProps<{
  isOpen: boolean;
  isEditing: boolean;
  formErrors: FormErrors<SpecialOfferForm>;
  businessOptions: SelectOption[];
  isSaving: boolean;
  isUploading: boolean;
  saveErrorMessage: string | null;
}>();
const form = defineModel<SpecialOfferForm>({ required: true });
const emit = defineEmits<{ close: []; 'save-special-offer': []; 'select-image': [file: File] }>();
</script>

<template>
  <AppModal
    :is-open="isOpen"
    :title="isEditing ? 'Edit offer' : 'Add offer'"
    size="lg"
    @close="emit('close')"
  >
    <form
      id="special-offer-form"
      class="grid gap-4 sm:grid-cols-2"
      novalidate
      @submit.prevent="emit('save-special-offer')"
    >
      <AppImageField
        class="sm:col-span-2"
        label="Offer photo"
        hint="Wide image, at least 1600 × 700 px."
        :file-url="form.imageUrl || null"
        :preview-alt="form.title"
        :is-uploading="isUploading"
        :error="formErrors.imageUrl"
        is-required
        @select-file="emit('select-image', $event)"
        @remove-file="form.imageUrl = ''"
      />
      <AppTextField
        v-model="form.title"
        class="sm:col-span-2"
        label="Title"
        :error="formErrors.title"
        is-required
      />
      <AppTextField v-model="form.subtitle" class="sm:col-span-2" label="Subtitle" />
      <AppTextField v-model="form.ctaText" label="Button text" placeholder="Book now" />
      <AppTextField
        v-model="form.ctaLink"
        label="Button link"
        placeholder="/sreebhavanam/rooms"
        :error="formErrors.ctaLink"
      />
      <AppSelectField
        :model-value="form.businessId ?? ''"
        :label="AppStrings.fields.business"
        :options="businessOptions"
        placeholder="Home page (both)"
        @update:model-value="form.businessId = $event || null"
      />
      <AppTextField
        v-model.number="form.sortOrder"
        :label="AppStrings.fields.sortOrder"
        type="number"
      />
      <AppToggle v-model="form.isActive" :label="AppStrings.fields.active" />
      <p v-if="saveErrorMessage" :class="[TextStyles.errorText, 'sm:col-span-2']" role="alert">
        {{ saveErrorMessage }}
      </p>
    </form>
    <template #footer>
      <AppButton variant="secondary" @click="emit('close')">{{
        AppStrings.actions.cancel
      }}</AppButton>
      <AppButton
        type="submit"
        form="special-offer-form"
        :is-loading="isSaving"
        :is-disabled="isUploading"
      >
        {{ AppStrings.actions.save }}
      </AppButton>
    </template>
  </AppModal>
</template>
