<script setup lang="ts">
import { ImageConstants } from '~/common/constants/imageConstants';
import { TextStyles } from '~/common/styles/textStyles';
import type { TableColumn } from '~/common/types/table';
import { formatPrice } from '~/common/utils/formatPrice';
import AppDataTable from '~/common/widgets/AppDataTable.vue';
import AppRowActions from '~/common/widgets/AppRowActions.vue';
import AppToggle from '~/common/widgets/AppToggle.vue';
import type { MenuItem } from '../../model/menu.model';

defineProps<{ menuItems: MenuItem[]; getCategoryName: (categoryId: string) => string }>();
const emit = defineEmits<{
  'edit-item': [item: MenuItem];
  'delete-item': [item: MenuItem];
  'toggle-flag': [item: MenuItem, flag: 'isAvailable' | 'isSpecial', value: boolean];
}>();

const columns: TableColumn[] = [
  { key: 'imageUrl', label: '', widthClass: 'w-20' },
  { key: 'name', label: 'Dish' },
  { key: 'categoryId', label: 'Category' },
  { key: 'price', label: 'Price', align: 'right' },
  { key: 'isAvailable', label: 'Available' },
  { key: 'isSpecial', label: "Today's special" },
  { key: 'actions', label: '', align: 'right', widthClass: 'w-40' },
];
</script>

<template>
  <AppDataTable :columns="columns" :rows="menuItems">
    <template #cell-imageUrl="{ row }">
      <NuxtImg
        :src="row.imageUrl || ImageConstants.placeholders.image"
        :alt="row.name"
        loading="lazy"
        class="h-12 w-12 rounded-md bg-surface object-cover"
      />
    </template>
    <template #cell-name="{ row }">
      <p :class="TextStyles.label">{{ row.name }}</p>
      <p v-if="row.nameMl" :class="TextStyles.caption">{{ row.nameMl }}</p>
    </template>
    <template #cell-categoryId="{ row }">{{ getCategoryName(row.categoryId) }}</template>
    <template #cell-price="{ row }">{{ formatPrice(row.price) }}</template>
    <template #cell-isAvailable="{ row }">
      <AppToggle
        :model-value="row.isAvailable"
        :label="row.isAvailable ? 'Yes' : 'No'"
        @update:model-value="emit('toggle-flag', row, 'isAvailable', $event)"
      />
    </template>
    <template #cell-isSpecial="{ row }">
      <AppToggle
        :model-value="row.isSpecial"
        :label="row.isSpecial ? 'Yes' : 'No'"
        @update:model-value="emit('toggle-flag', row, 'isSpecial', $event)"
      />
    </template>
    <template #cell-actions="{ row }">
      <AppRowActions @edit="emit('edit-item', row)" @delete="emit('delete-item', row)" />
    </template>
  </AppDataTable>
</template>
