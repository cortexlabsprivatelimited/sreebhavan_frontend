<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import type { HallSlotState } from '../../model/eventHall.model';

defineProps<{ state: HallSlotState; label?: string }>();

const stateLabels: Record<HallSlotState, string> = {
  available: AppStrings.hallStatus.available,
  booked: AppStrings.hallStatus.booked,
  tentative: AppStrings.hallStatus.tentative,
  past: '-',
};
const stateClasses: Record<HallSlotState, string> = {
  available: 'bg-available/15 text-available',
  booked: 'bg-booked/15 text-booked',
  tentative: 'bg-tentative/15 text-tentative',
  past: 'bg-surfaceMuted text-textMuted',
};
</script>

<template>
  <span :class="[TextStyles.siteChip, 'inline-flex rounded-full px-2.5 py-1', stateClasses[state]]">
    {{ label ? `${label}: ` : '' }}{{ stateLabels[state] }}
  </span>
</template>
