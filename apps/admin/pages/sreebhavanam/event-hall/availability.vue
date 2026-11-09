<script setup lang="ts">
import { usePageSeo } from '~/common/controllers/usePageSeo';
import HallAvailabilityScreen from '~/features/userSite/eventHall/ui/HallAvailabilityScreen.vue';

useSeoMeta(
  usePageSeo('hall-availability', {
    title: 'Hall Availability · Sreebhavanam',
    description:
      'Check which dates are free at the Sreebhavanam event hall and enquire for your function.',
  }),
);
</script>

<template>
  <HallAvailabilityScreen />
</template>
