<script setup lang="ts">
import type { SelectOption } from '~/common/types/api';
import type { FormErrors } from '~/common/types/form';
import AppSelectField from '~/common/widgets/AppSelectField.vue';
import AppTextField from '~/common/widgets/AppTextField.vue';
import type { EnquiryForm } from '../../model/enquiry.model';

defineProps<{
  formErrors: FormErrors<EnquiryForm>;
  roomOptions: SelectOption[];
  isLoadingRooms: boolean;
}>();
const form = defineModel<EnquiryForm>({ required: true });
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2">
    <AppSelectField
      v-model="form.roomSlug"
      label="Room"
      :options="roomOptions"
      :placeholder="isLoadingRooms ? 'Loading rooms…' : 'Choose a room'"
      :error="formErrors.roomSlug"
      :is-disabled="isLoadingRooms"
      is-required
      class="sm:col-span-2"
    />
    <AppTextField
      v-model="form.dateFrom"
      label="Check-in"
      type="date"
      :error="formErrors.dateFrom"
    />
    <AppTextField v-model="form.dateTo" label="Check-out" type="date" :error="formErrors.dateTo" />
    <AppTextField
      :model-value="form.guests"
      label="Guests"
      type="number"
      :error="formErrors.guests"
      @update:model-value="form.guests = typeof $event === 'number' ? $event : null"
    />
  </div>
</template>
