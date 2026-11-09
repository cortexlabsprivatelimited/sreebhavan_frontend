<script setup lang="ts">
import SpecialOffersScreen from '~/features/adminSite/specialOffers/ui/SpecialOffersScreen.vue';

definePageMeta({ layout: 'admin' });
useHead({ title: 'Special offers' });
</script>

<template>
  <SpecialOffersScreen />
</template>
