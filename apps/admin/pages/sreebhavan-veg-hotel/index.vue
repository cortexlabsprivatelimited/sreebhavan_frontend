<script setup lang="ts">
import { usePageSeo } from '~/common/controllers/usePageSeo';
import HotelScreen from '~/features/userSite/hotel/ui/HotelScreen.vue';

useSeoMeta(
  usePageSeo('hotel', {
    title: 'Sreebhavan Veg Hotel',
    description:
      'Pure vegetarian Kerala food, cooked fresh every day. See our timings, specials and menu.',
  }),
);
</script>

<template>
  <HotelScreen />
</template>
