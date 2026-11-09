<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import { getHallStatusDotClass } from '~/common/utils/statusTones';
import AppCard from '~/common/widgets/AppCard.vue';
import AppMonthCalendar from '~/common/widgets/AppMonthCalendar.vue';
import type { DashboardMonthBooking } from '../../model/dashboard.model';

const props = defineProps<{
  month: Date;
  bookings: DashboardMonthBooking[];
  isCurrentMonth: boolean;
}>();
const emit = defineEmits<{ 'change-month': [month: Date] }>();

const router = useRouter();
const bookingsOnDate = (isoDate: string) =>
  props.bookings.filter((booking) => booking.date === isoDate);
const openDateInCalendar = (isoDate: string) =>
  router.push({ path: '/admin/hall-calendar', query: { date: isoDate } });
</script>

<template>
  <AppCard :title="isCurrentMonth ? 'Hall this month' : 'Hall calendar'" icon="calendarCheck">
    <AppMonthCalendar
      :month="month"
      @select-date="openDateInCalendar"
      @change-month="emit('change-month', $event)"
    >
      <template #day="{ isoDate }">
        <span class="flex flex-wrap gap-1">
          <span
            v-for="booking in bookingsOnDate(isoDate)"
            :key="booking.slot"
            :title="`${AppStrings.hallSlot[booking.slot]}: ${AppStrings.hallStatus[booking.status]}`"
            :class="[getHallStatusDotClass(booking.status), 'h-2.5 w-2.5 rounded-full']"
          />
        </span>
      </template>
    </AppMonthCalendar>
    <div class="mt-4 flex gap-5">
      <span class="flex items-center gap-2" :class="TextStyles.caption">
        <span class="h-2.5 w-2.5 rounded-full bg-booked" /> {{ AppStrings.hallStatus.booked }}
      </span>
      <span class="flex items-center gap-2" :class="TextStyles.caption">
        <span class="h-2.5 w-2.5 rounded-full bg-tentative" />
        {{ AppStrings.hallStatus.tentative }}
      </span>
    </div>
  </AppCard>
</template>
