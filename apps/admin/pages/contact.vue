<script setup lang="ts">
import { usePageSeo } from '~/common/controllers/usePageSeo';
import ContactScreen from '~/features/userSite/contact/ui/ContactScreen.vue';

useSeoMeta(
  usePageSeo('contact', {
    title: 'Contact Sreebhavan',
    description:
      'Phone, WhatsApp, address, map and opening hours for Sreebhavan Veg Hotel and Sreebhavanam.',
  }),
);
</script>

<template>
  <ContactScreen />
</template>
