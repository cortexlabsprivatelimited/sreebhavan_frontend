import { ApiConstants } from '~/common/constants/apiConstants';
import { AppStrings } from '~/common/constants/appStrings';
import { useApiClient } from '~/common/services/apiClient';
import type { HallSlot } from '~/common/types/booking';
import type { FormErrors } from '~/common/types/form';
import { toMonthKey } from '~/common/utils/formatDate';
import { isBlank, isValidPhone } from '~/common/utils/validators';
import {
  mapHallBooking,
  toHallBookingRequest,
  type HallBooking,
  type HallBookingApiResponse,
  type HallBookingForm,
} from '../model/hallCalendar.model';

/** A full-day booking blocks morning and evening, and either half blocks the full day. */
export const doSlotsOverlap = (firstSlot: HallSlot, secondSlot: HallSlot): boolean =>
  firstSlot === secondSlot || firstSlot === 'full' || secondSlot === 'full';

/** The booking that already holds this date + slot, ignoring the one being edited. */
export const findConflictingBooking = (
  bookings: HallBooking[],
  date: string,
  slot: HallSlot,
  ignoredBookingId: string | null = null,
): HallBooking | null =>
  bookings.find(
    (booking) =>
      booking.id !== ignoredBookingId &&
      booking.date === date &&
      doSlotsOverlap(booking.slot, slot),
  ) ?? null;

export const isSlotBookable = (bookings: HallBooking[], date: string, slot: HallSlot): boolean =>
  findConflictingBooking(bookings, date, slot) === null;

export const validateHallBookingForm = (
  form: HallBookingForm,
  bookings: HallBooking[],
  editingBookingId: string | null,
): FormErrors<HallBookingForm> => {
  const conflict = findConflictingBooking(bookings, form.date, form.slot, editingBookingId);
  return {
    customerName: isBlank(form.customerName) ? AppStrings.validation.required : undefined,
    phone:
      !isBlank(form.phone) && !isValidPhone(form.phone)
        ? AppStrings.validation.invalidPhone
        : undefined,
    slot: conflict
      ? `${AppStrings.hallSlot[conflict.slot]} is already ${AppStrings.hallStatus[conflict.status].toLowerCase()} for ${conflict.customerName}.`
      : undefined,
  };
};

export const useHallCalendarRepository = () => {
  const apiClient = useApiClient();

  const getBookingsForMonth = async (month: Date): Promise<HallBooking[]> =>
    (
      await apiClient.get<HallBookingApiResponse[]>(ApiConstants.admin.hallBookings, {
        month: toMonthKey(month),
      })
    ).map(mapHallBooking);

  const createBooking = async (form: HallBookingForm): Promise<HallBooking> =>
    mapHallBooking(
      await apiClient.post<HallBookingApiResponse>(
        ApiConstants.admin.hallBookings,
        toHallBookingRequest(form),
      ),
    );

  const updateBooking = async (id: string, form: HallBookingForm): Promise<HallBooking> =>
    mapHallBooking(
      await apiClient.patch<HallBookingApiResponse>(
        ApiConstants.admin.hallBookingById(id),
        toHallBookingRequest(form),
      ),
    );

  const deleteBooking = async (id: string): Promise<void> => {
    await apiClient.remove(ApiConstants.admin.hallBookingById(id));
  };

  return { getBookingsForMonth, createBooking, updateBooking, deleteBooking };
};
