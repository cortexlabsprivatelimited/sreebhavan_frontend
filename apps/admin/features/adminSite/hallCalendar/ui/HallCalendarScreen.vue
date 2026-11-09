<script setup lang="ts">
import { formatDate } from '~/common/utils/formatDate';
import AppCard from '~/common/widgets/AppCard.vue';
import AppConfirmDialog from '~/common/widgets/AppConfirmDialog.vue';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppModal from '~/common/widgets/AppModal.vue';
import AppPageHeader from '~/common/widgets/AppPageHeader.vue';
import { useHallCalendarController } from '../controller/useHallCalendarController';
import HallCalendarBookingForm from './widgets/HallCalendarBookingForm.vue';
import HallCalendarDaySlots from './widgets/HallCalendarDaySlots.vue';
import HallCalendarLegend from './widgets/HallCalendarLegend.vue';
import HallCalendarMonthView from './widgets/HallCalendarMonthView.vue';

const {
  bookings,
  visibleMonth,
  isLoading,
  hasError,
  reloadBookings,
  changeMonth,
  selectedDate,
  selectedDateSlotRows,
  bookingForm,
  isEditingBooking,
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
} = useHallCalendarController();
</script>

<template>
  <div>
    <AppPageHeader
      title="Hall calendar"
      description="Mark dates as booked or tentative. Visitors see which dates are free on the website."
    >
      <template #actions><HallCalendarLegend /></template>
    </AppPageHeader>

    <AppCard>
      <AppLoader v-if="isLoading" />
      <AppErrorState v-else-if="hasError" @retry="reloadBookings" />
      <HallCalendarMonthView
        v-else
        :month="visibleMonth"
        :bookings="bookings"
        @select-date="openDay"
        @change-month="changeMonth"
      />
    </AppCard>

    <AppModal
      :is-open="Boolean(selectedDate)"
      :title="formatDate(selectedDate)"
      size="lg"
      @close="closeDay"
    >
      <HallCalendarBookingForm
        v-if="bookingForm"
        v-model="bookingForm"
        :form-errors="formErrors"
        :is-editing="isEditingBooking"
        :is-saving="isSaving"
        :save-error-message="saveErrorMessage"
        @save-booking="saveBooking"
        @cancel="cancelBookingForm"
        @delete-booking="requestDeleteEditedBooking"
      />
      <HallCalendarDaySlots
        v-else
        :slot-rows="selectedDateSlotRows"
        @new-booking="startNewBooking"
        @edit-booking="startEditBooking"
      />
    </AppModal>
    <AppConfirmDialog
      :is-open="Boolean(bookingPendingDelete)"
      title="Free this date?"
      message="The booking is removed and the slot shows as available on the website."
      confirm-label="Free date"
      :is-confirming="isDeleting"
      @confirm="confirmDeleteBooking"
      @cancel="cancelDeleteBooking"
    />
  </div>
</template>
