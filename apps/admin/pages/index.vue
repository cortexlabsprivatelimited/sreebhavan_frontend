<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { usePageSeo } from '~/common/controllers/usePageSeo';
import { usePublicSiteState } from '~/common/controllers/usePublicSiteState';
import EnquirySectionScreen from '~/features/userSite/enquiry/ui/EnquirySectionScreen.vue';
import HomeScreen from '~/features/userSite/home/ui/HomeScreen.vue';

useSeoMeta(
  usePageSeo('home', {
    title: 'Sreebhavan · Pure Veg Hotel, Event Hall & Rooms',
    description:
      'Sreebhavan Veg Hotel serves pure vegetarian Kerala food. Sreebhavanam offers rooms and an event hall for weddings and functions.',
  }),
);

// Structured data for Google: the restaurant and the venue.
const { settings, hotel, hallAndRooms } = usePublicSiteState();
const config = useRuntimeConfig();
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () =>
        JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Restaurant',
              name: hotel.value?.name ?? AppStrings.businesses.hotel,
              servesCuisine: ['Kerala', 'South Indian', 'Vegetarian'],
              telephone: hotel.value?.phone ?? settings.value.contactPhone ?? undefined,
              address: settings.value.address ?? undefined,
              url: config.public.siteUrl || undefined,
            },
            {
              '@type': 'EventVenue',
              name: hallAndRooms.value?.name ?? AppStrings.businesses.hallAndRooms,
              telephone: hallAndRooms.value?.phone ?? settings.value.contactPhone ?? undefined,
              address: settings.value.address ?? undefined,
            },
          ],
        }),
    },
  ],
});
</script>

<template>
  <div class="pb-20 lg:pb-28">
    <HomeScreen />
    <EnquirySectionScreen />
  </div>
</template>
