<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { EnquiryStatuses, EnquiryTypes } from '~/common/types/booking';
import AppButton from '~/common/widgets/AppButton.vue';
import AppSelectField from '~/common/widgets/AppSelectField.vue';
import AppTextField from '~/common/widgets/AppTextField.vue';
import type { EnquiryFilters } from '../../model/enquiries.model';

const filters = defineModel<EnquiryFilters>({ required: true });
const emit = defineEmits<{ 'apply-search': [] }>();

const typeOptions = EnquiryTypes.map((type) => ({
  label: AppStrings.enquiryType[type],
  value: type,
}));
const statusOptions = EnquiryStatuses.map((status) => ({
  label: AppStrings.enquiryStatus[status],
  value: status,
}));
</script>

<template>
  <form
    class="mb-4 grid items-end gap-4 rounded-2xl border border-border/70 bg-background shadow-card p-4 md:grid-cols-4"
    @submit.prevent="emit('apply-search')"
  >
    <AppTextField
      :model-value="filters.search"
      class="md:col-span-2"
      label="Search"
      placeholder="Name or phone"
      @update:model-value="filters.search = String($event ?? '')"
    />
    <AppSelectField
      :model-value="filters.type"
      label="Type"
      :options="typeOptions"
      placeholder="All types"
      @update:model-value="filters.type = $event as EnquiryFilters['type']"
    />
    <AppSelectField
      :model-value="filters.status"
      label="Status"
      :options="statusOptions"
      placeholder="All statuses"
      @update:model-value="filters.status = $event as EnquiryFilters['status']"
    />
    <AppButton type="submit" variant="secondary" class="md:hidden">Search</AppButton>
  </form>
</template>
