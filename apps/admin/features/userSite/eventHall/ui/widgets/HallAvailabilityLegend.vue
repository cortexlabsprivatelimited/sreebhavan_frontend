<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';

const legendItems = [
  { label: AppStrings.hallStatus.available, dotClass: 'bg-available' },
  { label: AppStrings.hallStatus.tentative, dotClass: 'bg-tentative' },
  { label: AppStrings.hallStatus.booked, dotClass: 'bg-booked' },
];
</script>

<template>
  <ul class="flex flex-wrap gap-4">
    <li
      v-for="item in legendItems"
      :key="item.label"
      :class="[TextStyles.siteBody, 'flex items-center gap-2']"
    >
      <span :class="['h-3 w-3 rounded-full', item.dotClass]" />{{ item.label }}
    </li>
    <li :class="TextStyles.siteBodySm">Top dot: morning · bottom dot: evening</li>
  </ul>
</template>
