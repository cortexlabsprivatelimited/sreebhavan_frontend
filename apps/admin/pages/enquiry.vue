<script setup lang="ts">
import { usePageSeo } from '~/common/controllers/usePageSeo';
import EnquiryScreen from '~/features/userSite/enquiry/ui/EnquiryScreen.vue';

useSeoMeta(
  usePageSeo('enquiry', {
    title: 'Send an Enquiry · Sreebhavan',
    description:
      'Enquire about the event hall, rooms or the veg hotel. We reply quickly by phone or WhatsApp.',
  }),
);
</script>

<template>
  <EnquiryScreen />
</template>
