<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import type { TableColumn } from '~/common/types/table';
import AppDataTable from '~/common/widgets/AppDataTable.vue';
import AppRowActions from '~/common/widgets/AppRowActions.vue';
import AppStatusBadge from '~/common/widgets/AppStatusBadge.vue';
import type { Testimonial } from '../../model/testimonials.model';

defineProps<{
  testimonials: Testimonial[];
  getBusinessName: (businessId: string | null) => string;
}>();
const emit = defineEmits<{
  'edit-testimonial': [testimonial: Testimonial];
  'delete-testimonial': [testimonial: Testimonial];
}>();

const columns: TableColumn[] = [
  { key: 'name', label: 'Customer' },
  { key: 'text', label: 'Review' },
  { key: 'rating', label: 'Rating', widthClass: 'w-28' },
  { key: 'businessId', label: AppStrings.fields.business },
  { key: 'isActive', label: 'Status', widthClass: 'w-28' },
  { key: 'actions', label: '', align: 'right', widthClass: 'w-40' },
];
</script>

<template>
  <AppDataTable :columns="columns" :rows="testimonials">
    <template #cell-text="{ row }">
      <p :class="[TextStyles.bodySmall, 'line-clamp-2 max-w-md']">{{ row.text }}</p>
    </template>
    <template #cell-rating="{ row }">
      <span :class="TextStyles.ratingStars" :aria-label="`${row.rating} out of 5`">{{
        '★'.repeat(row.rating)
      }}</span>
    </template>
    <template #cell-businessId="{ row }">{{ getBusinessName(row.businessId) }}</template>
    <template #cell-isActive="{ row }">
      <AppStatusBadge
        :label="row.isActive ? 'Visible' : 'Hidden'"
        :tone="row.isActive ? 'success' : 'neutral'"
      />
    </template>
    <template #cell-actions="{ row }">
      <AppRowActions
        @edit="emit('edit-testimonial', row)"
        @delete="emit('delete-testimonial', row)"
      />
    </template>
  </AppDataTable>
</template>
