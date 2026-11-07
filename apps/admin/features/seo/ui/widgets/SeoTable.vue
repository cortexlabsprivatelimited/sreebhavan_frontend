<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';
import type { TableColumn } from '~/common/types/table';
import AppDataTable from '~/common/widgets/AppDataTable.vue';
import AppRowActions from '~/common/widgets/AppRowActions.vue';
import AppStatusBadge from '~/common/widgets/AppStatusBadge.vue';
import type { SeoMeta } from '../../model/seo.model';

defineProps<{ seoEntries: SeoMeta[] }>();
const emit = defineEmits<{ 'edit-seo': [entry: SeoMeta]; 'delete-seo': [entry: SeoMeta] }>();

const columns: TableColumn[] = [
  { key: 'pageKey', label: 'Page', widthClass: 'w-48' },
  { key: 'title', label: 'Google result preview' },
  { key: 'isNoindex', label: 'Indexing', widthClass: 'w-32' },
  { key: 'actions', label: '', align: 'right', widthClass: 'w-40' },
];
</script>

<template>
  <AppDataTable :columns="columns" :rows="seoEntries">
    <template #cell-pageKey="{ row }">
      <code :class="TextStyles.caption">{{ row.pageKey }}</code>
    </template>
    <template #cell-title="{ row }">
      <p :class="TextStyles.seoPreviewTitle">{{ row.title }}</p>
      <p :class="[TextStyles.caption, 'line-clamp-2 max-w-xl']">
        {{ row.description || 'No description' }}
      </p>
    </template>
    <template #cell-isNoindex="{ row }">
      <AppStatusBadge
        :label="row.isNoindex ? 'Hidden' : 'Indexed'"
        :tone="row.isNoindex ? 'warning' : 'success'"
      />
    </template>
    <template #cell-actions="{ row }">
      <AppRowActions @edit="emit('edit-seo', row)" @delete="emit('delete-seo', row)" />
    </template>
  </AppDataTable>
</template>
