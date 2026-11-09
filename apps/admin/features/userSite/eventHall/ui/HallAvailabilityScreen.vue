<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { SiteRoutes } from '~/common/constants/userSiteNavigation';
import { TextStyles } from '~/common/styles/textStyles';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppSitePageHero from '~/common/widgets/userSite/AppSitePageHero.vue';
import { useHallAvailabilityController } from '../controller/useHallAvailabilityController';
import HallAvailabilityCalendar from './widgets/HallAvailabilityCalendar.vue';
import HallAvailabilityDayPanel from './widgets/HallAvailabilityDayPanel.vue';
import HallAvailabilityLegend from './widgets/HallAvailabilityLegend.vue';

const {
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
} = useHallAvailabilityController();
</script>

<template>
  <div>
    <AppSitePageHero
      :eyebrow="AppStrings.businesses.hallAndRooms"
      title="Hall"
      title-accent="availability"
      subtitle="Check which dates are free for your function, then send us an enquiry for the slot you want."
    />
    <section
      class="mx-auto grid max-w-site gap-8 px-6 md:px-12 py-12 lg:grid-cols-[1fr_340px] lg:px-20"
    >
      <div
        class="flex flex-col gap-5 rounded-3xl border border-siteHairline bg-background p-4 shadow-siteCard sm:p-6"
      >
        <AppErrorState v-if="hasError" @retry="reloadAvailability" />
        <div v-else :class="{ 'pointer-events-none opacity-60': isLoading }" :aria-busy="isLoading">
          <HallAvailabilityCalendar
            :month="visibleMonth"
            :day-availability="dayAvailability"
            @select-date="selectDate"
            @change-month="changeMonth"
          />
        </div>
        <HallAvailabilityLegend />
      </div>
      <div class="flex flex-col gap-4">
        <HallAvailabilityDayPanel
          :selected-date="selectedDate"
          :availability="selectedDayAvailability"
          :enquiry-link-for="enquiryLinkFor"
        />
        <NuxtLink :to="SiteRoutes.eventHall" :class="TextStyles.siteArrowLink">
          ← Hall details and packages
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
