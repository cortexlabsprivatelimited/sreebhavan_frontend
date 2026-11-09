import type { EnquiryType, HallSlot } from '~/common/types/booking';
import { EnquiryTypes, HallSlots } from '~/common/types/booking';

export interface EnquiryForm {
  type: EnquiryType;
  name: string;
  phone: string;
  email: string;
  dateFrom: string;
  dateTo: string;
  slot: HallSlot | '';
  guests: number | null;
  eventType: string;
  roomSlug: string;
  message: string;
  /** Honeypot: hidden from people, bots fill it in. Must stay empty. */
  website: string;
}

/** Values the page can pre-fill from `?type=&room=&date=&slot=`. */
export interface EnquiryPrefill {
  type?: string;
  room?: string;
  date?: string;
  slot?: string;
  guests?: string;
}

const isEnquiryType = (value: unknown): value is EnquiryType =>
  EnquiryTypes.includes(value as EnquiryType);
const isHallSlot = (value: unknown): value is HallSlot => HallSlots.includes(value as HallSlot);

export const createEnquiryForm = (prefill: EnquiryPrefill = {}): EnquiryForm => ({
  type: isEnquiryType(prefill.type) ? prefill.type : 'hall',
  name: '',
  phone: '',
  email: '',
  dateFrom: prefill.date && /^\d{4}-\d{2}-\d{2}$/.test(prefill.date) ? prefill.date : '',
  dateTo: '',
  slot: isHallSlot(prefill.slot) ? prefill.slot : '',
  guests: Number(prefill.guests) > 0 ? Math.floor(Number(prefill.guests)) : null,
  eventType: '',
  roomSlug: prefill.room ?? '',
  message: '',
  website: '',
});

/** POST /public/enquiries body (snake_case, empty text as null). */
export interface CreateEnquiryRequest {
  type: EnquiryType;
  name: string;
  phone: string;
  email: string | null;
  date_from: string | null;
  date_to: string | null;
  slot: HallSlot | null;
  guests: number | null;
  event_type: string | null;
  room_id: string | null;
  room_slug: string | null;
  message: string | null;
  website: string;
  turnstile_token: string | null;
}

export interface CreateEnquiryApiResponse {
  id: string;
  whatsapp_url: string;
}

const textOrNull = (value: string) => value.trim() || null;

/** Only the fields that belong to the chosen enquiry type are sent. */
export const toCreateEnquiryRequest = (form: EnquiryForm): CreateEnquiryRequest => {
  const isHall = form.type === 'hall';
  const isRoom = form.type === 'room';
  return {
    type: form.type,
    name: form.name.trim(),
    phone: form.phone.trim(),
    email: textOrNull(form.email),
    date_from: isHall || isRoom ? textOrNull(form.dateFrom) : null,
    date_to: isRoom ? textOrNull(form.dateTo) : null,
    slot: isHall && form.slot ? form.slot : null,
    guests: isHall || isRoom ? form.guests : null,
    event_type: isHall ? textOrNull(form.eventType) : null,
    room_id: null,
    room_slug: isRoom ? textOrNull(form.roomSlug) : null,
    message: textOrNull(form.message),
    website: form.website,
    turnstile_token: null,
  };
};

/** API field names that differ from the form's after snake → camel conversion. */
export const EnquiryApiFieldNames: Record<string, string> = {
  room_id: 'roomSlug',
  room_slug: 'roomSlug',
};

export const EnquiryTypeOptions: { type: EnquiryType; title: string; text: string }[] = [
  { type: 'hall', title: 'Event hall', text: 'Weddings & functions' },
  { type: 'room', title: 'Room stay', text: 'Rooms at Sreebhavanam' },
  { type: 'hotel', title: 'Veg hotel', text: 'Dining or a question' },
];
