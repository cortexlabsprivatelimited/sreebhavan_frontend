<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import AppTextArea from '~/common/widgets/AppTextArea.vue';
import AppSiteButton from '~/common/widgets/userSite/AppSiteButton.vue';
import { useEnquiryController } from '../controller/useEnquiryController';
import EnquiryContactFields from './widgets/EnquiryContactFields.vue';
import EnquiryContactPanel from './widgets/EnquiryContactPanel.vue';
import EnquiryHallFields from './widgets/EnquiryHallFields.vue';
import EnquiryRoomFields from './widgets/EnquiryRoomFields.vue';
import EnquirySuccessCard from './widgets/EnquirySuccessCard.vue';
import EnquiryTypePicker from './widgets/EnquiryTypePicker.vue';

/**
 * Enquiry card: sapphire contact panel + form. Used on /enquiry and at the end of the home page.
 */
const {
  form,
  formErrors,
  submitErrorMessage,
  isSubmitting,
  isSubmitted,
  whatsAppUrl,
  roomOptions,
  isLoadingRooms,
  settings,
  primaryPhone,
  contactWhatsAppUrl,
  businessTimings,
  submitEnquiry,
  startNewEnquiry,
} = useEnquiryController();
</script>

<template>
  <section id="enquiry" class="mx-auto max-w-site scroll-mt-28 px-6 md:px-12 lg:px-20">
    <div
      class="grid overflow-hidden rounded-[2rem] border border-siteHairline bg-background shadow-siteFloat lg:grid-cols-[2fr_3fr]"
    >
      <EnquiryContactPanel
        :address="settings.address"
        :phone="primaryPhone"
        :whats-app-url="contactWhatsAppUrl"
        :timings="businessTimings"
      />
      <div class="p-6 md:p-10">
        <EnquirySuccessCard
          v-if="isSubmitted && whatsAppUrl"
          :whats-app-url="whatsAppUrl"
          @start-new-enquiry="startNewEnquiry"
        />
        <form
          v-else
          class="relative flex flex-col gap-7"
          novalidate
          @submit.prevent="submitEnquiry"
        >
          <div class="flex flex-col gap-2">
            <p :class="TextStyles.siteEyebrow">Send an enquiry</p>
            <h2 :class="TextStyles.siteHeadlineMd">Tell us what you're planning</h2>
          </div>
          <EnquiryTypePicker v-model="form.type" />
          <EnquiryHallFields v-if="form.type === 'hall'" v-model="form" :form-errors="formErrors" />
          <EnquiryRoomFields
            v-else-if="form.type === 'room'"
            v-model="form"
            :form-errors="formErrors"
            :room-options="roomOptions"
            :is-loading-rooms="isLoadingRooms"
          />
          <EnquiryContactFields v-model="form" :form-errors="formErrors" />
          <AppTextArea
            v-model="form.message"
            label="Guests, menu wishes or special requests (optional)"
            :rows="3"
            :error="formErrors.message"
          />

          <!-- Honeypot for bots: hidden from people and screen readers. -->
          <div class="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
            <label>
              Website
              <input
                v-model="form.website"
                type="text"
                name="website"
                tabindex="-1"
                autocomplete="off"
              />
            </label>
          </div>

          <p v-if="submitErrorMessage" :class="TextStyles.errorText" role="alert">
            {{ submitErrorMessage }}
          </p>
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <AppSiteButton type="submit" :is-loading="isSubmitting" has-arrow>
              {{ AppStrings.site.sendEnquiry }}
            </AppSiteButton>
            <p :class="TextStyles.siteBodySm">We only use your details to reply to you.</p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
