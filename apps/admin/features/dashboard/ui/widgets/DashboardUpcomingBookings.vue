<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import { formatDate } from '~/common/utils/formatDate';
import { getHallStatusTone } from '~/common/utils/statusTones';
import AppCard from '~/common/widgets/AppCard.vue';
import AppEmptyState from '~/common/widgets/AppEmptyState.vue';
import AppIcon from '~/common/widgets/AppIcon.vue';
import AppStatusBadge from '~/common/widgets/AppStatusBadge.vue';
import type { DashboardBooking } from '../../model/dashboard.model';

defineProps<{ bookings: DashboardBooking[] }>();
</script>

<template>
  <AppCard title="Upcoming hall bookings" icon="calendarCheck">
    <template #actions>
      <NuxtLink to="/hall-calendar" :class="[TextStyles.linkSmall, 'flex items-center gap-1']">
        Open calendar <AppIcon name="arrowRight" class="h-4 w-4" />
      </NuxtLink>
    </template>
    <AppEmptyState v-if="bookings.length === 0" message="No upcoming bookings." />
    <ul v-else class="divide-y divide-border">
      <li
        v-for="booking in bookings"
        :key="booking.id"
        class="flex items-center justify-between gap-3 py-3"
      >
        <div>
          <p :class="TextStyles.listTitle">
            {{ formatDate(booking.date) }} · {{ AppStrings.hallSlot[booking.slot] }}
          </p>
          <p :class="TextStyles.listSubtitle">
            {{ booking.customerName
            }}<span v-if="booking.eventType"> · {{ booking.eventType }}</span>
          </p>
        </div>
        <AppStatusBadge
          :label="AppStrings.hallStatus[booking.status]"
          :tone="getHallStatusTone(booking.status)"
        />
      </li>
    </ul>
  </AppCard>
</template>
