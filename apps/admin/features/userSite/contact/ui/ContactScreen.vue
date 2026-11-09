<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { SiteRoutes } from '~/common/constants/userSiteNavigation';
import { TextStyles } from '~/common/styles/textStyles';
import AppSiteButton from '~/common/widgets/userSite/AppSiteButton.vue';
import AppEmptyState from '~/common/widgets/AppEmptyState.vue';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppSitePageHero from '~/common/widgets/userSite/AppSitePageHero.vue';
import { useContactController } from '../controller/useContactController';
import ContactMethodCards from './widgets/ContactMethodCards.vue';
import ContactVisitCard from './widgets/ContactVisitCard.vue';

const {
  settings,
  businesses,
  contactMethods,
  mapEmbedUrl,
  isLoading,
  hasError,
  isEmpty,
  reloadSiteState,
} = useContactController();
</script>

<template>
  <div>
    <AppSitePageHero
      eyebrow="Contact"
      title="We'd love to"
      title-accent="hear from you"
      subtitle="Call, WhatsApp or drop in. For rooms and hall bookings, sending an enquiry is the quickest way."
    >
      <AppSiteButton :to="SiteRoutes.enquiry">{{ AppStrings.site.sendEnquiry }}</AppSiteButton>
    </AppSitePageHero>

    <section class="mx-auto max-w-site px-6 md:px-12 py-12 lg:px-20 lg:py-16">
      <AppLoader v-if="isLoading" />
      <AppErrorState v-else-if="hasError" @retry="reloadSiteState" />
      <AppEmptyState v-else-if="isEmpty" message="Contact details will be added here soon." />
      <div v-else class="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div class="flex flex-col gap-8">
          <ContactMethodCards :methods="contactMethods" />
          <iframe
            v-if="mapEmbedUrl"
            :src="mapEmbedUrl"
            title="Map showing how to reach Sreebhavan"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            class="h-80 w-full rounded-3xl border border-siteHairline"
          />
        </div>
        <ContactVisitCard :settings="settings" :businesses="businesses" />
      </div>
      <p :class="[TextStyles.siteBody, 'mt-10 text-center']">
        Have a question first?
        <NuxtLink :to="SiteRoutes.faq" :class="TextStyles.siteArrowLink">Read our FAQs</NuxtLink>
      </p>
    </section>
  </div>
</template>
