<script setup lang="ts">
import { usePageSeo } from '~/common/controllers/usePageSeo';
import EventHallScreen from '~/features/userSite/eventHall/ui/EventHallScreen.vue';

useSeoMeta(
  usePageSeo('event-hall', {
    title: 'Event Hall · Sreebhavanam',
    description:
      'Wedding and function hall with seating for hundreds. See facilities, packages and photos.',
  }),
);
</script>

<template>
  <EventHallScreen />
</template>
