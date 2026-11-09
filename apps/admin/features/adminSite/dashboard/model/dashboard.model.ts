import type { AppIconName } from '~/common/constants/appIcons';
import type {
  EnquiryStatus,
  EnquiryType,
  HallBookingStatus,
  HallSlot,
} from '~/common/types/booking';

export interface DashboardBooking {
  id: string;
  date: string;
  slot: HallSlot;
  status: HallBookingStatus;
  customerName: string;
  eventType: string;
}

export interface DashboardEnquiry {
  id: string;
  type: EnquiryType;
  name: string;
  phone: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface DashboardStats {
  newEnquiryCount: number;
  openEnquiryCount: number;
  enquiriesThisMonthCount: number;
  hallBookingsThisMonthCount: number;
  upcomingBookings: DashboardBooking[];
  recentEnquiries: DashboardEnquiry[];
  monthBookings: { date: string; slot: HallSlot; status: HallBookingStatus }[];
}

/** GET /admin/dashboard/stats */
export interface DashboardStatsApiResponse {
  new_enquiries: number;
  open_enquiries: number;
  enquiries_this_month: number;
  hall_bookings_this_month: number;
  upcoming_bookings: {
    id: string;
    date: string;
    slot: HallSlot;
    status: HallBookingStatus;
    customer_name: string | null;
    event_type: string | null;
  }[];
  recent_enquiries: {
    id: string;
    type: EnquiryType;
    name: string;
    phone: string;
    status: EnquiryStatus;
    created_at: string;
  }[];
  month_bookings: { date: string; slot: HallSlot; status: HallBookingStatus }[];
}

export const mapDashboardStats = (response: DashboardStatsApiResponse): DashboardStats => ({
  newEnquiryCount: response.new_enquiries,
  openEnquiryCount: response.open_enquiries,
  enquiriesThisMonthCount: response.enquiries_this_month,
  hallBookingsThisMonthCount: response.hall_bookings_this_month,
  upcomingBookings: response.upcoming_bookings.map((booking) => ({
    id: booking.id,
    date: booking.date,
    slot: booking.slot,
    status: booking.status,
    customerName: booking.customer_name ?? '',
    eventType: booking.event_type ?? '',
  })),
  recentEnquiries: response.recent_enquiries.map((enquiry) => ({
    id: enquiry.id,
    type: enquiry.type,
    name: enquiry.name,
    phone: enquiry.phone,
    status: enquiry.status,
    createdAt: enquiry.created_at,
  })),
  monthBookings: response.month_bookings,
});

export type DashboardMonthBooking = DashboardStats['monthBookings'][number];

/** Accent used for a stat tile's icon and bars. */
export type DashboardStatTone = 'blue' | 'green' | 'orange' | 'purple';

export interface DashboardStatTile {
  label: string;
  value: number;
  to: string;
  icon: AppIconName;
  tone: DashboardStatTone;
}
