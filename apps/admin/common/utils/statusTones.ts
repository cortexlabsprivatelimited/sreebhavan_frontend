import type { BadgeTone } from '~/common/types/badge';
import type { EnquiryStatus, HallBookingStatus } from '~/common/types/booking';

const enquiryStatusTones: Record<EnquiryStatus, BadgeTone> = {
  new: 'info',
  contacted: 'warning',
  confirmed: 'success',
  cancelled: 'neutral',
};

const hallStatusTones: Record<HallBookingStatus, BadgeTone> = {
  booked: 'error',
  tentative: 'warning',
};

export const getEnquiryStatusTone = (status: EnquiryStatus): BadgeTone =>
  enquiryStatusTones[status];
export const getHallStatusTone = (status: HallBookingStatus): BadgeTone => hallStatusTones[status];

/** Tailwind background class for small calendar markers. */
export const getHallStatusDotClass = (status: HallBookingStatus): string =>
  status === 'booked' ? 'bg-booked' : 'bg-tentative';
