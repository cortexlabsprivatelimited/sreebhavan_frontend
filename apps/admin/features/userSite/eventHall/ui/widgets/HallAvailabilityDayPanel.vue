<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import { HallSlots, type HallSlot } from '~/common/types/booking';
import { formatDate } from '~/common/utils/formatDate';
import AppSiteButton from '~/common/widgets/userSite/AppSiteButton.vue';
import type { HallDayAvailability } from '../../model/eventHall.model';
import { isSlotBookable } from '../../domain/eventHall.repository';
import HallSlotStateBadge from './HallSlotStateBadge.vue';

defineProps<{
  selectedDate: string | null;
  availability: HallDayAvailability | null;
  enquiryLinkFor: (slot: HallSlot) => string;
}>();
</script>

<template>
  <aside class="rounded-3xl border border-siteHairline bg-background p-6 shadow-siteCard">
    <template v-if="selectedDate && availability">
      <h2 :class="[TextStyles.siteHeadlineSm, 'mb-4']">{{ formatDate(selectedDate) }}</h2>
      <ul class="flex flex-col gap-3">
        <li
          v-for="slot in HallSlots"
          :key="slot"
          class="flex items-center justify-between gap-3 rounded-2xl border border-siteHairline p-3"
        >
          <div class="flex flex-col gap-1.5">
            <span :class="TextStyles.siteLabel">{{ AppStrings.hallSlot[slot] }}</span>
            <HallSlotStateBadge :state="availability[slot]" />
          </div>
          <AppSiteButton
            v-if="isSlotBookable(availability[slot])"
            :to="enquiryLinkFor(slot)"
            size="sm"
          >
            {{ AppStrings.site.bookNow }}
          </AppSiteButton>
        </li>
      </ul>
      <p :class="[TextStyles.siteBodySm, 'mt-4']">
        Tentative dates are on hold for another family. Send an enquiry and we will tell you if they
        free up.
      </p>
    </template>
    <p v-else :class="TextStyles.siteBodyLg">
      Pick a date on the calendar to see if the morning, evening or full day is free.
    </p>
  </aside>
</template>
