<script setup lang="ts">
import { ImageConstants } from '~/common/constants/imageConstants';
import { TextStyles } from '~/common/styles/textStyles';
import type { TableColumn } from '~/common/types/table';
import AppDataTable from '~/common/widgets/AppDataTable.vue';
import AppRowActions from '~/common/widgets/AppRowActions.vue';
import AppStatusBadge from '~/common/widgets/AppStatusBadge.vue';
import type { MenuCategory } from '../../model/menu.model';

defineProps<{ categories: MenuCategory[] }>();
const emit = defineEmits<{
  'edit-category': [category: MenuCategory];
  'delete-category': [category: MenuCategory];
}>();

const columns: TableColumn[] = [
  { key: 'imageUrl', label: '', widthClass: 'w-20' },
  { key: 'name', label: 'Category' },
  { key: 'slug', label: 'URL slug' },
  { key: 'sortOrder', label: 'Sort', align: 'center', widthClass: 'w-20' },
  { key: 'isActive', label: 'Status', widthClass: 'w-28' },
  { key: 'actions', label: '', align: 'right', widthClass: 'w-40' },
];
</script>

<template>
  <AppDataTable :columns="columns" :rows="categories">
    <template #cell-imageUrl="{ row }">
      <NuxtImg
        :src="row.imageUrl || ImageConstants.placeholders.image"
        :alt="row.name"
        class="h-12 w-12 rounded-md bg-surface object-cover"
      />
    </template>
    <template #cell-name="{ row }">
      <p :class="TextStyles.label">{{ row.name }}</p>
      <p v-if="row.nameMl" :class="TextStyles.caption">{{ row.nameMl }}</p>
    </template>
    <template #cell-slug="{ row }">
      <code :class="TextStyles.caption">/menu/{{ row.slug }}</code>
    </template>
    <template #cell-isActive="{ row }">
      <AppStatusBadge
        :label="row.isActive ? 'Visible' : 'Hidden'"
        :tone="row.isActive ? 'success' : 'neutral'"
      />
    </template>
    <template #cell-actions="{ row }">
      <AppRowActions @edit="emit('edit-category', row)" @delete="emit('delete-category', row)" />
    </template>
  </AppDataTable>
</template>
