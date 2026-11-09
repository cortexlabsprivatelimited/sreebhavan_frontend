<script setup lang="ts">
import { usePageSeo } from '~/common/controllers/usePageSeo';
import RoomsScreen from '~/features/userSite/rooms/ui/RoomsScreen.vue';

useSeoMeta(
  usePageSeo('rooms', {
    title: 'Rooms at Sreebhavanam',
    description: 'Clean AC and non-AC rooms at Sreebhavanam. Check prices and enquire on WhatsApp.',
  }),
);
</script>

<template>
  <RoomsScreen />
</template>
