import { AppStrings } from '~/common/constants/appStrings';
import { useToastStore } from '~/common/stores/toast';
import { HallSlots, type HallSlot } from '~/common/types/booking';
import { hasFormErrors, type FormErrors } from '~/common/types/form';
import { parseIsoDate } from '~/common/utils/formatDate';
import { getErrorMessage, getErrorStatus } from '~/common/utils/getErrorMessage';
import {
  findConflictingBooking,
  useHallCalendarRepository,
  validateHallBookingForm,
} from '../domain/hallCalendar.repository';
import {
  createEmptyHallBookingForm,
  toHallBookingForm,
  type HallBooking,
  type HallBookingForm,
  type HallCalendarSlotRow,
} from '../model/hallCalendar.model';

export const useHallCalendarController = () => {
  const hallCalendarRepository = useHallCalendarRepository();
  const toast = useToastStore();
  const route = useRoute();

  const linkedDate = typeof route.query.date === 'string' ? route.query.date : null;
  const visibleMonth = ref<Date>(linkedDate ? parseIsoDate(linkedDate) : new Date());

  const {
    data: bookings,
    status,
    error,
    refresh: reloadBookings,
  } = useAsyncData(
    'admin-hall-bookings',
    () => hallCalendarRepository.getBookingsForMonth(visibleMonth.value),
    {
      default: () => [],
      watch: [visibleMonth],
    },
  );

  const isLoading = computed(() => status.value === 'pending');
  const hasError = computed(() => Boolean(error.value));

  const changeMonth = (month: Date) => {
    visibleMonth.value = new Date(month.getFullYear(), month.getMonth(), 1);
  };

  // Day dialog: shows the three slots; the booking form opens inside it.
  const selectedDate = ref<string | null>(linkedDate);
  const selectedDateBookings = computed(() =>
    bookings.value.filter((booking) => booking.date === selectedDate.value),
  );

  /** One row per slot: its booking, or the booking that blocks it (e.g. a full-day booking). */
  const selectedDateSlotRows = computed<HallCalendarSlotRow[]>(() =>
    HallSlots.map((slot) => {
      const ownBooking =
        selectedDateBookings.value.find((booking) => booking.slot === slot) ?? null;
      const blockingBooking = ownBooking
        ? null
        : findConflictingBooking(selectedDateBookings.value, selectedDate.value ?? '', slot);
      return { slot, booking: ownBooking, blockingBooking };
    }),
  );

  const bookingForm = ref<HallBookingForm | null>(null);
  const editingBookingId = ref<string | null>(null);
  const formErrors = ref<FormErrors<HallBookingForm>>({});
  const isSaving = ref(false);
  const saveErrorMessage = ref<string | null>(null);

  const openDay = (isoDate: string) => {
    selectedDate.value = isoDate;
    bookingForm.value = null;
  };

  const closeDay = () => {
    selectedDate.value = null;
    bookingForm.value = null;
  };

  const startNewBooking = (slot: HallSlot) => {
    if (!selectedDate.value) return;
    editingBookingId.value = null;
    bookingForm.value = createEmptyHallBookingForm(selectedDate.value, slot);
    formErrors.value = {};
    saveErrorMessage.value = null;
  };

  const startEditBooking = (booking: HallBooking) => {
    editingBookingId.value = booking.id;
    bookingForm.value = toHallBookingForm(booking);
    formErrors.value = {};
    saveErrorMessage.value = null;
  };

  const cancelBookingForm = () => {
    bookingForm.value = null;
  };

  const saveBooking = async () => {
    if (!bookingForm.value) return;
    formErrors.value = validateHallBookingForm(
      bookingForm.value,
      bookings.value,
      editingBookingId.value,
    );
    if (hasFormErrors(formErrors.value)) return;

    isSaving.value = true;
    saveErrorMessage.value = null;
    try {
      if (editingBookingId.value) {
        await hallCalendarRepository.updateBooking(editingBookingId.value, bookingForm.value);
      } else {
        await hallCalendarRepository.createBooking(bookingForm.value);
      }
      bookingForm.value = null;
      toast.showSuccess(AppStrings.states.saved);
      await reloadBookings();
    } catch (saveError) {
      // 409: someone else booked this slot meanwhile (UNIQUE(date, slot) in the database).
      saveErrorMessage.value =
        getErrorStatus(saveError) === 409
          ? 'This slot was just booked by someone else. Reload and pick another slot.'
          : getErrorMessage(saveError);
    } finally {
      isSaving.value = false;
    }
  };

  const bookingPendingDelete = ref<HallBooking | null>(null);
  const isDeleting = ref(false);

  const requestDeleteBooking = (booking: HallBooking) => {
    bookingPendingDelete.value = booking;
  };

  const requestDeleteEditedBooking = () => {
    const editedBooking = bookings.value.find((booking) => booking.id === editingBookingId.value);
    if (editedBooking) requestDeleteBooking(editedBooking);
  };

  const cancelDeleteBooking = () => {
    bookingPendingDelete.value = null;
  };

  const confirmDeleteBooking = async () => {
    if (!bookingPendingDelete.value) return;
    isDeleting.value = true;
    try {
      await hallCalendarRepository.deleteBooking(bookingPendingDelete.value.id);
      bookingPendingDelete.value = null;
      bookingForm.value = null;
      toast.showSuccess('Date is free again.');
      await reloadBookings();
    } catch (deleteError) {
      toast.showError(getErrorMessage(deleteError));
    } finally {
      isDeleting.value = false;
    }
  };

  return {
    bookings,
    visibleMonth,
    isLoading,
    hasError,
    reloadBookings,
    changeMonth,
    selectedDate,
    selectedDateSlotRows,
    bookingForm,
    isEditingBooking: computed(() => editingBookingId.value !== null),
    formErrors,
    isSaving,
    saveErrorMessage,
    openDay,
    closeDay,
    startNewBooking,
    startEditBooking,
    cancelBookingForm,
    saveBooking,
    bookingPendingDelete,
    isDeleting,
    requestDeleteEditedBooking,
    cancelDeleteBooking,
    confirmDeleteBooking,
  };
};
