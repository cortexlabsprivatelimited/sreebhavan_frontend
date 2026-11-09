<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import { HallBookingStatuses, HallSlots } from '~/common/types/booking';
import type { FormErrors } from '~/common/types/form';
import AppButton from '~/common/widgets/AppButton.vue';
import AppSelectField from '~/common/widgets/AppSelectField.vue';
import AppTextArea from '~/common/widgets/AppTextArea.vue';
import AppTextField from '~/common/widgets/AppTextField.vue';
import { EventTypeSuggestions, type HallBookingForm } from '../../model/hallCalendar.model';

defineProps<{
  formErrors: FormErrors<HallBookingForm>;
  isEditing: boolean;
  isSaving: boolean;
  saveErrorMessage: string | null;
}>();
const form = defineModel<HallBookingForm>({ required: true });
const emit = defineEmits<{ 'save-booking': []; cancel: []; 'delete-booking': [] }>();

const slotOptions = HallSlots.map((slot) => ({ label: AppStrings.hallSlot[slot], value: slot }));
const statusOptions = HallBookingStatuses.map((status) => ({
  label: AppStrings.hallStatus[status],
  value: status,
}));
const eventTypeOptions = EventTypeSuggestions.map((eventType) => ({
  label: eventType,
  value: eventType,
}));
</script>

<template>
  <form class="grid gap-4 sm:grid-cols-2" novalidate @submit.prevent="emit('save-booking')">
    <AppSelectField
      :model-value="form.slot"
      label="Slot"
      :options="slotOptions"
      :error="formErrors.slot"
      is-required
      @update:model-value="form.slot = $event as HallBookingForm['slot']"
    />
    <AppSelectField
      :model-value="form.status"
      label="Status"
      :options="statusOptions"
      is-required
      @update:model-value="form.status = $event as HallBookingForm['status']"
    />
    <AppTextField
      v-model="form.customerName"
      label="Customer name"
      :error="formErrors.customerName"
      is-required
    />
    <AppTextField v-model="form.phone" label="Phone" type="tel" :error="formErrors.phone" />
    <AppSelectField
      v-model="form.eventType"
      class="sm:col-span-2"
      label="Event type"
      :options="eventTypeOptions"
      placeholder="Choose"
    />
    <AppTextArea v-model="form.notes" class="sm:col-span-2" label="Notes (admin only)" :rows="3" />
    <p :class="[TextStyles.caption, 'sm:col-span-2']">
      The public calendar shows only the date and status. Customer details stay in the admin panel.
    </p>
    <p v-if="saveErrorMessage" :class="[TextStyles.errorText, 'sm:col-span-2']" role="alert">
      {{ saveErrorMessage }}
    </p>
    <div class="flex flex-wrap justify-between gap-2 sm:col-span-2">
      <AppButton v-if="isEditing" variant="dangerGhost" @click="emit('delete-booking')">
        Free this date
      </AppButton>
      <div class="ml-auto flex gap-2">
        <AppButton variant="secondary" @click="emit('cancel')">{{
          AppStrings.actions.cancel
        }}</AppButton>
        <AppButton type="submit" :is-loading="isSaving">{{ AppStrings.actions.save }}</AppButton>
      </div>
    </div>
  </form>
</template>
