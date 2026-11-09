import { AppConfig } from '~/common/constants/appConfig';
import { buildEnquiryLink } from '~/common/constants/userSiteNavigation';
import type { HallSlot } from '~/common/types/booking';
import { parseIsoDate, toIsoDate, toMonthKey } from '~/common/utils/formatDate';
import { getDayAvailability, useEventHallRepository } from '../domain/eventHall.repository';

const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);

/** Public hall calendar: one month at a time, from this month up to a year ahead. */
export const useHallAvailabilityController = () => {
  const eventHallRepository = useEventHallRepository();

  const today = new Date();
  const todayIsoDate = toIsoDate(today);
  const firstMonth = startOfMonth(today);
  const lastMonth = new Date(
    firstMonth.getFullYear(),
    firstMonth.getMonth() + AppConfig.hallAvailabilityMonthsAhead,
    1,
  );

  // `?date=YYYY-MM-DD` (from the home page availability bar) opens that month with the day selected.
  const route = useRoute();
  const requestedDate =
    typeof route.query.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(route.query.date)
      ? route.query.date
      : null;
  const isRequestedDateValid = Boolean(
    requestedDate &&
    requestedDate >= todayIsoDate &&
    startOfMonth(parseIsoDate(requestedDate)) <= lastMonth,
  );

  const visibleMonth = ref(
    isRequestedDateValid && requestedDate ? startOfMonth(parseIsoDate(requestedDate)) : firstMonth,
  );
  const monthKey = computed(() => toMonthKey(visibleMonth.value));
  const selectedDate = ref<string | null>(isRequestedDateValid ? requestedDate : null);

  const {
    data: entries,
    status,
    error,
    refresh: reloadAvailability,
  } = useAsyncData(
    () => `hall-availability-${monthKey.value}`,
    () => eventHallRepository.getAvailability(monthKey.value),
    { default: () => [] },
  );

  const changeMonth = (month: Date) => {
    const target = startOfMonth(month);
    if (target < firstMonth) visibleMonth.value = firstMonth;
    else if (target > lastMonth) visibleMonth.value = lastMonth;
    else visibleMonth.value = target;
    selectedDate.value = null;
  };

  const dayAvailability = (isoDate: string) =>
    getDayAvailability(entries.value, isoDate, todayIsoDate);

  const selectedDayAvailability = computed(() =>
    selectedDate.value ? dayAvailability(selectedDate.value) : null,
  );

  const selectDate = (isoDate: string) => {
    selectedDate.value = isoDate < todayIsoDate ? null : isoDate;
  };

  const enquiryLinkFor = (slot: HallSlot) =>
    buildEnquiryLink({ type: 'hall', date: selectedDate.value ?? undefined, slot });

  const isLoading = computed(() => status.value === 'pending');
  const hasError = computed(() => Boolean(error.value));

  return {
    visibleMonth,
    selectedDate,
    selectedDayAvailability,
    dayAvailability,
    changeMonth,
    selectDate,
    enquiryLinkFor,
    isLoading,
    hasError,
    reloadAvailability,
  };
};
