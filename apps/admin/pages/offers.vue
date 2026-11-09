<script setup lang="ts">
import { usePageSeo } from '~/common/controllers/usePageSeo';
import SpecialOffersScreen from '~/features/userSite/specialOffers/ui/SpecialOffersScreen.vue';

useSeoMeta(
  usePageSeo('offers', {
    title: 'Special offers · Sreebhavan',
    description:
      'Current offers on Kerala vegetarian dining, room stays and the event hall at Sreebhavan.',
  }),
);
</script>

<template>
  <SpecialOffersScreen />
</template>
