<script setup lang="ts">
import { usePageSeo } from '~/common/controllers/usePageSeo';
import SreebhavanamScreen from '~/features/userSite/sreebhavanam/ui/SreebhavanamScreen.vue';

useSeoMeta(
  usePageSeo('sreebhavanam', {
    title: 'Sreebhavanam Event Hall & Rooms',
    description:
      'Comfortable rooms and a spacious event hall for weddings, receptions and family functions.',
  }),
);
</script>

<template>
  <SreebhavanamScreen />
</template>
