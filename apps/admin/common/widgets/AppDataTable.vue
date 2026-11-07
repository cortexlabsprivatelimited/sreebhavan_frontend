<script setup lang="ts" generic="TRow extends { id: string }">
import { TextStyles } from '~/common/styles/textStyles';
import type { TableColumn } from '~/common/types/table';

/**
 * Plain table. Override any cell with a slot named `cell-<column key>`:
 *   <template #cell-price="{ row }">{{ formatPrice(row.price) }}</template>
 */
defineProps<{ columns: TableColumn[]; rows: TRow[] }>();

const alignClasses = { left: 'text-left', center: 'text-center', right: 'text-right' } as const;

const readCellValue = (row: TRow, key: string): string => {
  const value = (row as Record<string, unknown>)[key];
  return value === null || value === undefined ? '-' : String(value);
};
</script>

<template>
  <div class="overflow-x-auto rounded-2xl border border-border/70 bg-background shadow-card">
    <table class="w-full min-w-[640px] border-collapse">
      <thead class="bg-surface">
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            scope="col"
            :class="[
              TextStyles.tableHeader,
              alignClasses[column.align ?? 'left'],
              column.widthClass,
              'px-4 py-3',
            ]"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in rows"
          :key="row.id"
          class="border-t border-border transition hover:bg-surface/60"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            :class="[TextStyles.tableCell, alignClasses[column.align ?? 'left'], 'px-4 py-3']"
          >
            <slot :name="`cell-${column.key}`" :row="row">
              {{ readCellValue(row, column.key) }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
