<script setup lang="ts">
import { useAdminSessionStore } from '~/common/stores/adminSession';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import { useDashboardController } from '../controller/useDashboardController';
import DashboardMonthCalendar from './widgets/DashboardMonthCalendar.vue';
import DashboardQuickActions from './widgets/DashboardQuickActions.vue';
import DashboardRecentEnquiries from './widgets/DashboardRecentEnquiries.vue';
import DashboardStatTiles from './widgets/DashboardStatTiles.vue';
import DashboardUpcomingBookings from './widgets/DashboardUpcomingBookings.vue';
import DashboardWelcomeBanner from './widgets/DashboardWelcomeBanner.vue';

const adminSession = useAdminSessionStore();
const {
  stats,
  statTiles,
  isLoading,
  hasError,
  reloadStats,
  visibleMonth,
  visibleMonthBookings,
  isCurrentMonthVisible,
  changeVisibleMonth,
} = useDashboardController();
</script>

<template>
  <div>
    <DashboardWelcomeBanner :admin-name="adminSession.profile?.name ?? 'Admin'" />
    <AppLoader v-if="isLoading" />
    <AppErrorState v-else-if="hasError || !stats" @retry="reloadStats" />
    <div v-else class="relative flex flex-col gap-6">
      <DashboardStatTiles :tiles="statTiles" />
      <div class="grid gap-6 xl:grid-cols-5">
        <DashboardMonthCalendar
          class="xl:col-span-3"
          :month="visibleMonth"
          :bookings="visibleMonthBookings"
          :is-current-month="isCurrentMonthVisible"
          @change-month="changeVisibleMonth"
        />
        <div class="flex flex-col gap-6 xl:col-span-2">
          <DashboardQuickActions />
          <DashboardUpcomingBookings :bookings="stats.upcomingBookings" />
        </div>
      </div>
      <DashboardRecentEnquiries :enquiries="stats.recentEnquiries" />
    </div>
  </div>
</template>
