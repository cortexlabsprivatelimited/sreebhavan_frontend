<script setup lang="ts">
import { usePageSeo } from '~/common/controllers/usePageSeo';
import type { PublicFaq } from '~/common/types/userSite';
import { FAQ_LIST_KEY } from '~/features/userSite/faq/model/faq.model';
import FaqScreen from '~/features/userSite/faq/ui/FaqScreen.vue';

useSeoMeta(
  usePageSeo('faq', {
    title: 'FAQs · Sreebhavan',
    description:
      'Answers about timings, rooms, the event hall, bookings and parking at Sreebhavan and Sreebhavanam.',
  }),
);

// FAQPage structured data from the list the screen loads.
const { data: faqs } = useNuxtData<PublicFaq[]>(FAQ_LIST_KEY);
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () =>
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: (faqs.value ?? []).map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }),
    },
  ],
});
</script>

<template>
  <FaqScreen />
</template>
