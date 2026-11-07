<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import AppButton from '~/common/widgets/AppButton.vue';

const props = defineProps<{ page: number; pageSize: number; total: number }>();
const emit = defineEmits<{ 'change-page': [page: number] }>();

const pageCount = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)));
const firstItemNumber = computed(() =>
  props.total === 0 ? 0 : (props.page - 1) * props.pageSize + 1,
);
const lastItemNumber = computed(() => Math.min(props.page * props.pageSize, props.total));
</script>

<template>
  <nav class="mt-4 flex items-center justify-between gap-4" aria-label="Pagination">
    <p :class="TextStyles.caption">{{ firstItemNumber }}–{{ lastItemNumber }} of {{ total }}</p>
    <div class="flex gap-2">
      <AppButton
        variant="secondary"
        size="sm"
        :is-disabled="page <= 1"
        @click="emit('change-page', page - 1)"
      >
        {{ AppStrings.actions.previous }}
      </AppButton>
      <AppButton
        variant="secondary"
        size="sm"
        :is-disabled="page >= pageCount"
        @click="emit('change-page', page + 1)"
      >
        {{ AppStrings.actions.next }}
      </AppButton>
    </div>
  </nav>
</template>
