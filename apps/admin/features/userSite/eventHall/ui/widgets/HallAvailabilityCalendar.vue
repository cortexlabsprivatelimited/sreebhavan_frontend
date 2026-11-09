<script setup lang="ts">
import AppMonthCalendar from '~/common/widgets/AppMonthCalendar.vue';
import type { HallDayAvailability, HallSlotState } from '../../model/eventHall.model';

defineProps<{ month: Date; dayAvailability: (isoDate: string) => HallDayAvailability }>();
const emit = defineEmits<{ 'select-date': [isoDate: string]; 'change-month': [month: Date] }>();

const dotClasses: Record<HallSlotState, string> = {
  available: 'bg-available',
  booked: 'bg-booked',
  tentative: 'bg-tentative',
  past: 'bg-border',
};
</script>

<template>
  <AppMonthCalendar
    :month="month"
    @select-date="emit('select-date', $event)"
    @change-month="emit('change-month', $event)"
  >
    <template #day="{ isoDate }">
      <span class="flex flex-col gap-1">
        <span
          :class="['h-1.5 w-full rounded-full', dotClasses[dayAvailability(isoDate).morning]]"
        />
        <span
          :class="['h-1.5 w-full rounded-full', dotClasses[dayAvailability(isoDate).evening]]"
        />
      </span>
    </template>
  </AppMonthCalendar>
</template>
