<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import type { HallSlot } from '~/common/types/booking';
import { getHallStatusTone } from '~/common/utils/statusTones';
import AppButton from '~/common/widgets/AppButton.vue';
import AppStatusBadge from '~/common/widgets/AppStatusBadge.vue';
import type { HallBooking, HallCalendarSlotRow } from '../../model/hallCalendar.model';

defineProps<{ slotRows: HallCalendarSlotRow[] }>();
const emit = defineEmits<{
  'new-booking': [slot: HallSlot];
  'edit-booking': [booking: HallBooking];
}>();
</script>

<template>
  <ul class="flex flex-col gap-3">
    <li
      v-for="row in slotRows"
      :key="row.slot"
      class="flex items-center justify-between gap-3 rounded-lg border border-border p-4"
    >
      <div>
        <p :class="TextStyles.label">{{ AppStrings.hallSlot[row.slot] }}</p>
        <p v-if="row.booking" :class="TextStyles.caption">
          {{ row.booking.customerName
          }}<span v-if="row.booking.eventType"> · {{ row.booking.eventType }}</span>
          <span v-if="row.booking.phone"> · {{ row.booking.phone }}</span>
        </p>
        <p v-else-if="row.blockingBooking" :class="TextStyles.caption">
          Blocked by the {{ AppStrings.hallSlot[row.blockingBooking.slot].toLowerCase() }} booking
        </p>
      </div>
      <div class="flex items-center gap-2">
        <template v-if="row.booking">
          <AppStatusBadge
            :label="AppStrings.hallStatus[row.booking.status]"
            :tone="getHallStatusTone(row.booking.status)"
          />
          <AppButton variant="secondary" size="sm" @click="emit('edit-booking', row.booking)">
            {{ AppStrings.actions.edit }}
          </AppButton>
        </template>
        <AppStatusBadge v-else-if="row.blockingBooking" label="Unavailable" tone="neutral" />
        <template v-else>
          <AppStatusBadge :label="AppStrings.hallStatus.available" tone="success" />
          <AppButton size="sm" @click="emit('new-booking', row.slot)">Mark date</AppButton>
        </template>
      </div>
    </li>
  </ul>
</template>
