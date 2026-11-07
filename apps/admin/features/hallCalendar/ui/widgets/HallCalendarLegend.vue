<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';

const legendItems = [
  { label: AppStrings.hallStatus.booked, dotClass: 'bg-booked' },
  { label: AppStrings.hallStatus.tentative, dotClass: 'bg-tentative' },
  { label: AppStrings.hallStatus.available, dotClass: 'border border-border bg-background' },
];
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <span
      v-for="item in legendItems"
      :key="item.label"
      :class="[TextStyles.caption, 'flex items-center gap-2']"
    >
      <span :class="[item.dotClass, 'h-3 w-3 rounded-sm']" /> {{ item.label }}
    </span>
  </div>
</template>
