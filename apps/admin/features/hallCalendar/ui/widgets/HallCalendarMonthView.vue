<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import AppMonthCalendar from '~/common/widgets/AppMonthCalendar.vue';
import type { HallBooking } from '../../model/hallCalendar.model';

const props = defineProps<{ month: Date; bookings: HallBooking[] }>();
const emit = defineEmits<{ 'select-date': [isoDate: string]; 'change-month': [month: Date] }>();

const bookingsOnDate = (isoDate: string) =>
  props.bookings.filter((booking) => booking.date === isoDate);
</script>

<template>
  <AppMonthCalendar
    :month="month"
    @select-date="emit('select-date', $event)"
    @change-month="emit('change-month', $event)"
  >
    <template #day="{ isoDate }">
      <span
        v-for="booking in bookingsOnDate(isoDate)"
        :key="booking.id"
        :class="[
          TextStyles.calendarChip,
          'truncate rounded px-1 py-0.5',
          booking.status === 'booked' ? 'bg-booked' : 'bg-tentative',
        ]"
      >
        {{ AppStrings.hallSlot[booking.slot]
        }}<span class="hidden sm:inline"> · {{ booking.customerName }}</span>
      </span>
    </template>
  </AppMonthCalendar>
</template>
