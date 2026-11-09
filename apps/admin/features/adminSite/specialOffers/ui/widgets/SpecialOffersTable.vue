<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import type { TableColumn } from '~/common/types/table';
import AppDataTable from '~/common/widgets/AppDataTable.vue';
import AppRowActions from '~/common/widgets/AppRowActions.vue';
import AppStatusBadge from '~/common/widgets/AppStatusBadge.vue';
import type { SpecialOffer } from '../../model/specialOffers.model';

defineProps<{
  specialOffers: SpecialOffer[];
  getBusinessName: (businessId: string | null) => string;
}>();
const emit = defineEmits<{
  'edit-special-offer': [specialOffer: SpecialOffer];
  'delete-special-offer': [specialOffer: SpecialOffer];
}>();

const columns: TableColumn[] = [
  { key: 'imageUrl', label: 'Image', widthClass: 'w-32' },
  { key: 'title', label: 'Title' },
  { key: 'businessId', label: AppStrings.fields.business },
  { key: 'sortOrder', label: 'Sort', align: 'center', widthClass: 'w-20' },
  { key: 'isActive', label: 'Status', widthClass: 'w-28' },
  { key: 'actions', label: '', align: 'right', widthClass: 'w-40' },
];
</script>

<template>
  <AppDataTable :columns="columns" :rows="specialOffers">
    <template #cell-imageUrl="{ row }">
      <NuxtImg :src="row.imageUrl" :alt="row.title" class="h-14 w-24 rounded-md object-cover" />
    </template>
    <template #cell-title="{ row }">
      <p :class="TextStyles.label">{{ row.title }}</p>
      <p :class="TextStyles.caption">{{ row.subtitle }}</p>
    </template>
    <template #cell-businessId="{ row }">
      {{ row.businessId ? getBusinessName(row.businessId) : 'Home page' }}
    </template>
    <template #cell-isActive="{ row }">
      <AppStatusBadge
        :label="row.isActive ? 'Visible' : 'Hidden'"
        :tone="row.isActive ? 'success' : 'neutral'"
      />
    </template>
    <template #cell-actions="{ row }">
      <AppRowActions
        @edit="emit('edit-special-offer', row)"
        @delete="emit('delete-special-offer', row)"
      />
    </template>
  </AppDataTable>
</template>
