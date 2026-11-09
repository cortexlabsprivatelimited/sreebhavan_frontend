<script setup lang="ts">
import { ImageConstants } from '~/common/constants/imageConstants';
import { TextStyles } from '~/common/styles/textStyles';
import type { TableColumn } from '~/common/types/table';
import { formatPrice } from '~/common/utils/formatPrice';
import AppDataTable from '~/common/widgets/AppDataTable.vue';
import AppRowActions from '~/common/widgets/AppRowActions.vue';
import AppStatusBadge from '~/common/widgets/AppStatusBadge.vue';
import type { Room } from '../../model/rooms.model';

defineProps<{ rooms: Room[] }>();
const emit = defineEmits<{
  'edit-room': [room: Room];
  'delete-room': [room: Room];
}>();

const columns: TableColumn[] = [
  { key: 'images', label: '', widthClass: 'w-24' },
  { key: 'name', label: 'Room type' },
  { key: 'pricePerNight', label: 'Price / night', align: 'right' },
  { key: 'capacity', label: 'Guests', align: 'center' },
  { key: 'isActive', label: 'Status' },
  { key: 'actions', label: '', align: 'right', widthClass: 'w-40' },
];
</script>

<template>
  <AppDataTable :columns="columns" :rows="rooms">
    <template #cell-images="{ row }">
      <NuxtImg
        :src="row.images[0]?.url ?? ImageConstants.placeholders.image"
        :alt="row.images[0]?.alt ?? row.name"
        class="h-14 w-20 rounded-md bg-surface object-cover"
      />
    </template>
    <template #cell-name="{ row }">
      <p :class="TextStyles.label">{{ row.name }}</p>
      <p :class="TextStyles.caption">{{ row.amenities.join(' · ') || 'No amenities listed' }}</p>
      <p :class="TextStyles.caption">{{ row.images.length }} photo(s)</p>
    </template>
    <template #cell-pricePerNight="{ row }">{{ formatPrice(row.pricePerNight) }}</template>
    <template #cell-isActive="{ row }">
      <AppStatusBadge
        :label="row.isActive ? 'Visible' : 'Hidden'"
        :tone="row.isActive ? 'success' : 'neutral'"
      />
    </template>
    <template #cell-actions="{ row }">
      <AppRowActions @edit="emit('edit-room', row)" @delete="emit('delete-room', row)" />
    </template>
  </AppDataTable>
</template>
