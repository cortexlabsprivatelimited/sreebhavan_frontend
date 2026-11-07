<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import { EnquiryStatuses } from '~/common/types/booking';
import { formatDate, formatDateTime } from '~/common/utils/formatDate';
import AppButton from '~/common/widgets/AppButton.vue';
import AppModal from '~/common/widgets/AppModal.vue';
import AppSelectField from '~/common/widgets/AppSelectField.vue';
import AppTextArea from '~/common/widgets/AppTextArea.vue';
import type { Enquiry, EnquiryUpdateForm } from '../../model/enquiries.model';

const props = defineProps<{ enquiry: Enquiry | null; whatsAppUrl: string; isSaving: boolean }>();
const form = defineModel<EnquiryUpdateForm>({ required: true });
const emit = defineEmits<{ close: []; 'save-enquiry': [] }>();

const statusOptions = EnquiryStatuses.map((status) => ({
  label: AppStrings.enquiryStatus[status],
  value: status,
}));

const detailRows = computed(() => {
  const enquiry = props.enquiry;
  if (!enquiry) return [];
  const dateText =
    enquiry.dateTo && enquiry.dateTo !== enquiry.dateFrom
      ? `${formatDate(enquiry.dateFrom)} – ${formatDate(enquiry.dateTo)}`
      : formatDate(enquiry.dateFrom);
  return [
    {
      label: 'Enquiry for',
      value: `${AppStrings.enquiryType[enquiry.type]}${enquiry.roomName ? ` · ${enquiry.roomName}` : ''}`,
    },
    { label: 'Phone', value: enquiry.phone },
    { label: 'Email', value: enquiry.email || '-' },
    {
      label: 'Date',
      value: `${dateText}${enquiry.slot ? ` · ${AppStrings.hallSlot[enquiry.slot]}` : ''}`,
    },
    { label: 'Guests', value: enquiry.guests ? String(enquiry.guests) : '-' },
    { label: 'Event type', value: enquiry.eventType || '-' },
    { label: 'Received', value: formatDateTime(enquiry.createdAt) },
  ];
});
</script>

<template>
  <AppModal
    :is-open="Boolean(enquiry)"
    :title="enquiry?.name ?? ''"
    size="lg"
    @close="emit('close')"
  >
    <div v-if="enquiry" class="flex flex-col gap-5">
      <dl class="grid gap-3 sm:grid-cols-2">
        <div v-for="row in detailRows" :key="row.label">
          <dt :class="TextStyles.caption">{{ row.label }}</dt>
          <dd :class="TextStyles.label">{{ row.value }}</dd>
        </div>
      </dl>
      <div v-if="enquiry.message">
        <p :class="TextStyles.caption">Message</p>
        <p :class="[TextStyles.body, 'whitespace-pre-line']">{{ enquiry.message }}</p>
      </div>
      <a
        :href="whatsAppUrl"
        target="_blank"
        rel="noopener"
        :class="[
          TextStyles.button,
          'self-start rounded-lg bg-whatsapp px-4 py-2 text-textOnPrimary',
        ]"
      >
        Chat on WhatsApp
      </a>
      <form
        id="enquiry-update-form"
        class="flex flex-col gap-4 border-t border-border pt-4"
        @submit.prevent="emit('save-enquiry')"
      >
        <AppSelectField
          :model-value="form.status"
          label="Status"
          :options="statusOptions"
          @update:model-value="form.status = $event as EnquiryUpdateForm['status']"
        />
        <AppTextArea v-model="form.adminNotes" label="Notes (admin only)" :rows="3" />
        <p
          v-if="enquiry.type === 'hall' && form.status === 'confirmed'"
          :class="TextStyles.caption"
        >
          Remember to mark the date as booked in the Hall calendar.
        </p>
      </form>
    </div>
    <template #footer>
      <AppButton variant="secondary" @click="emit('close')">{{
        AppStrings.actions.cancel
      }}</AppButton>
      <AppButton type="submit" form="enquiry-update-form" :is-loading="isSaving">{{
        AppStrings.actions.save
      }}</AppButton>
    </template>
  </AppModal>
</template>
