<script setup lang="ts">
import FaqsScreen from '~/features/faqs/ui/FaqsScreen.vue';

definePageMeta({ layout: 'admin' });
useHead({ title: 'FAQs' });
</script>

<template>
  <FaqsScreen />
</template>
