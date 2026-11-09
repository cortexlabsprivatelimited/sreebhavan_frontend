import type { EnquiryStatus, EnquiryType, HallSlot } from '~/common/types/booking';

export interface Enquiry {
  id: string;
  type: EnquiryType;
  name: string;
  phone: string;
  email: string;
  dateFrom: string | null;
  dateTo: string | null;
  slot: HallSlot | null;
  guests: number | null;
  eventType: string;
  roomName: string;
  message: string;
  status: EnquiryStatus;
  adminNotes: string;
  createdAt: string;
}

export interface EnquiryFilters {
  type: EnquiryType | '';
  status: EnquiryStatus | '';
  search: string;
}

export interface EnquiryUpdateForm {
  status: EnquiryStatus;
  adminNotes: string;
}

export interface EnquiryApiResponse {
  id: string;
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
  room_name: string | null;
  message: string | null;
  status: EnquiryStatus;
  admin_notes: string | null;
  created_at: string;
}

export const mapEnquiry = (api: EnquiryApiResponse): Enquiry => ({
  id: api.id,
  type: api.type,
  name: api.name,
  phone: api.phone,
  email: api.email ?? '',
  dateFrom: api.date_from,
  dateTo: api.date_to,
  slot: api.slot,
  guests: api.guests,
  eventType: api.event_type ?? '',
  roomName: api.room_name ?? '',
  message: api.message ?? '',
  status: api.status,
  adminNotes: api.admin_notes ?? '',
  createdAt: api.created_at,
});

/** Query params for the list and the CSV export. Empty filters are left out. */
export const toEnquiryQuery = (filters: EnquiryFilters): Record<string, string> => {
  const query: Record<string, string> = {};
  if (filters.type) query.type = filters.type;
  if (filters.status) query.status = filters.status;
  if (filters.search.trim()) query.q = filters.search.trim();
  return query;
};

export const toEnquiryUpdateRequest = (form: EnquiryUpdateForm) => ({
  status: form.status,
  admin_notes: form.adminNotes.trim() || null,
});
