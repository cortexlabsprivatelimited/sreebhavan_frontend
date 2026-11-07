import { useToastStore } from '~/common/stores/toast';
import { toMonthKey } from '~/common/utils/formatDate';
import { getErrorMessage } from '~/common/utils/getErrorMessage';
import { useDashboardRepository } from '../domain/dashboard.repository';
import type {
  DashboardMonthBooking,
  DashboardStatTile,
  DashboardStats,
} from '../model/dashboard.model';

export const useDashboardController = () => {
  const dashboardRepository = useDashboardRepository();
  const toast = useToastStore();
  const currentMonth = new Date();

  const {
    data: stats,
    status,
    error,
    refresh: reloadStats,
  } = useAsyncData<DashboardStats | null>('admin-dashboard-stats', () =>
    dashboardRepository.getStats(currentMonth),
  );

  const isLoading = computed(() => status.value === 'pending' && !stats.value);
  const hasError = computed(() => Boolean(error.value));

  const statTiles = computed<DashboardStatTile[]>(() =>
    stats.value
      ? [
          {
            label: 'New enquiries',
            value: stats.value.newEnquiryCount,
            to: '/enquiries?status=new',
            icon: 'users',
            tone: 'blue',
          },
          {
            label: 'Open enquiries',
            value: stats.value.openEnquiryCount,
            to: '/enquiries',
            icon: 'calendarCheck',
            tone: 'green',
          },
          {
            label: 'Enquiries this month',
            value: stats.value.enquiriesThisMonthCount,
            to: '/enquiries',
            icon: 'calendar',
            tone: 'orange',
          },
          {
            label: 'Hall bookings this month',
            value: stats.value.hallBookingsThisMonthCount,
            to: '/hall-calendar',
            icon: 'calendarCheck',
            tone: 'purple',
          },
        ]
      : [],
  );

  // Calendar card can browse other months; the stat tiles always stay on the current month.
  const visibleMonth = ref(currentMonth);
  const otherMonthBookings = ref<DashboardMonthBooking[] | null>(null);
  const isCurrentMonthVisible = computed(
    () => toMonthKey(visibleMonth.value) === toMonthKey(currentMonth),
  );
  const visibleMonthBookings = computed(
    () => otherMonthBookings.value ?? stats.value?.monthBookings ?? [],
  );

  const changeVisibleMonth = async (month: Date) => {
    visibleMonth.value = month;
    if (toMonthKey(month) === toMonthKey(currentMonth)) {
      otherMonthBookings.value = null;
      return;
    }
    try {
      const monthStats = await dashboardRepository.getStats(month);
      if (toMonthKey(visibleMonth.value) === toMonthKey(month)) {
        otherMonthBookings.value = monthStats.monthBookings;
      }
    } catch (monthError) {
      otherMonthBookings.value = [];
      toast.showError(getErrorMessage(monthError));
    }
  };

  return {
    stats,
    statTiles,
    isLoading,
    hasError,
    reloadStats,
    visibleMonth,
    visibleMonthBookings,
    isCurrentMonthVisible,
    changeVisibleMonth,
  };
};
