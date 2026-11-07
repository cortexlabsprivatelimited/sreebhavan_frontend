import type { HallBookingStatus, HallSlot } from '~/common/types/booking';

export interface HallBooking {
  id: string;
  date: string;
  slot: HallSlot;
  status: HallBookingStatus;
  customerName: string;
  phone: string;
  eventType: string;
  notes: string;
}

export type HallBookingForm = Omit<HallBooking, 'id'>;

/** GET /admin/hall/bookings?month=YYYY-MM. Customer details are admin-only. */
export interface HallBookingApiResponse {
  id: string;
  date: string;
  slot: HallSlot;
  status: HallBookingStatus;
  customer_name: string;
  phone: string | null;
  event_type: string | null;
  notes: string | null;
}

export const mapHallBooking = (api: HallBookingApiResponse): HallBooking => ({
  id: api.id,
  date: api.date,
  slot: api.slot,
  status: api.status,
  customerName: api.customer_name,
  phone: api.phone ?? '',
  eventType: api.event_type ?? '',
  notes: api.notes ?? '',
});

export const toHallBookingRequest = (
  form: HallBookingForm,
): Omit<HallBookingApiResponse, 'id'> => ({
  date: form.date,
  slot: form.slot,
  status: form.status,
  customer_name: form.customerName.trim(),
  phone: form.phone.trim() || null,
  event_type: form.eventType.trim() || null,
  notes: form.notes.trim() || null,
});

export const createEmptyHallBookingForm = (date: string, slot: HallSlot): HallBookingForm => ({
  date,
  slot,
  status: 'tentative',
  customerName: '',
  phone: '',
  eventType: '',
  notes: '',
});

export const toHallBookingForm = ({ id: _id, ...form }: HallBooking): HallBookingForm => form;

export const EventTypeSuggestions = [
  'Wedding',
  'Engagement',
  'Reception',
  'Birthday',
  'Meeting',
  'Other',
];

/** One slot of the selected day in the day dialog. */
export interface HallCalendarSlotRow {
  slot: HallSlot;
  booking: HallBooking | null;
  /** Set when another booking blocks this slot, e.g. a full-day booking blocks morning. */
  blockingBooking: HallBooking | null;
}
