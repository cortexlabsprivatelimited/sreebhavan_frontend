<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import type { TableColumn } from '~/common/types/table';
import { formatDate, formatDateTime } from '~/common/utils/formatDate';
import { getEnquiryStatusTone } from '~/common/utils/statusTones';
import AppButton from '~/common/widgets/AppButton.vue';
import AppDataTable from '~/common/widgets/AppDataTable.vue';
import AppStatusBadge from '~/common/widgets/AppStatusBadge.vue';
import type { Enquiry } from '../../model/enquiries.model';

defineProps<{ enquiries: Enquiry[] }>();
const emit = defineEmits<{ 'open-enquiry': [enquiry: Enquiry] }>();

const columns: TableColumn[] = [
  { key: 'createdAt', label: 'Received', widthClass: 'w-44' },
  { key: 'name', label: 'Customer' },
  { key: 'type', label: 'For' },
  { key: 'dateFrom', label: 'Date' },
  { key: 'status', label: 'Status', widthClass: 'w-32' },
  { key: 'actions', label: '', align: 'right', widthClass: 'w-28' },
];
</script>

<template>
  <AppDataTable :columns="columns" :rows="enquiries">
    <template #cell-createdAt="{ row }">
      <span :class="TextStyles.caption">{{ formatDateTime(row.createdAt) }}</span>
    </template>
    <template #cell-name="{ row }">
      <p :class="TextStyles.label">{{ row.name }}</p>
      <p :class="TextStyles.caption">{{ row.phone }}</p>
    </template>
    <template #cell-type="{ row }">
      {{ AppStrings.enquiryType[row.type]
      }}<span v-if="row.roomName" :class="TextStyles.caption"> · {{ row.roomName }}</span>
    </template>
    <template #cell-dateFrom="{ row }">
      {{ formatDate(row.dateFrom)
      }}<span v-if="row.slot" :class="TextStyles.caption">
        · {{ AppStrings.hallSlot[row.slot] }}</span
      >
    </template>
    <template #cell-status="{ row }">
      <AppStatusBadge
        :label="AppStrings.enquiryStatus[row.status]"
        :tone="getEnquiryStatusTone(row.status)"
      />
    </template>
    <template #cell-actions="{ row }">
      <AppButton variant="ghost" size="sm" @click="emit('open-enquiry', row)">Open</AppButton>
    </template>
  </AppDataTable>
</template>
