<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { HallSlots, type HallSlot } from '~/common/types/booking';
import type { FormErrors } from '~/common/types/form';
import AppSelectField from '~/common/widgets/AppSelectField.vue';
import AppTextField from '~/common/widgets/AppTextField.vue';
import type { EnquiryForm } from '../../model/enquiry.model';

defineProps<{ formErrors: FormErrors<EnquiryForm> }>();
const form = defineModel<EnquiryForm>({ required: true });

const slotOptions = HallSlots.map((slot) => ({ label: AppStrings.hallSlot[slot], value: slot }));
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2">
    <AppTextField
      v-model="form.dateFrom"
      label="Function date"
      type="date"
      :error="formErrors.dateFrom"
      is-required
    />
    <AppSelectField
      :model-value="form.slot"
      label="Slot"
      :options="slotOptions"
      placeholder="Choose a slot"
      :error="formErrors.slot"
      is-required
      @update:model-value="form.slot = $event as HallSlot | ''"
    />
    <AppTextField
      v-model="form.eventType"
      label="Type of function"
      placeholder="Wedding, reception, birthday…"
      :error="formErrors.eventType"
    />
    <AppTextField
      :model-value="form.guests"
      label="Approximate guests"
      type="number"
      :error="formErrors.guests"
      @update:model-value="form.guests = typeof $event === 'number' ? $event : null"
    />
  </div>
</template>
