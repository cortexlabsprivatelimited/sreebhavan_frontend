/** Status and slot values shared by the dashboard, enquiries and hall calendar. */
export type HallSlot = 'morning' | 'evening' | 'full';
export type HallBookingStatus = 'booked' | 'tentative';
export type EnquiryStatus = 'new' | 'contacted' | 'confirmed' | 'cancelled';
export type EnquiryType = 'room' | 'hall' | 'hotel';

export const HallSlots: HallSlot[] = ['morning', 'evening', 'full'];
export const HallBookingStatuses: HallBookingStatus[] = ['booked', 'tentative'];
export const EnquiryStatuses: EnquiryStatus[] = ['new', 'contacted', 'confirmed', 'cancelled'];
export const EnquiryTypes: EnquiryType[] = ['room', 'hall', 'hotel'];
