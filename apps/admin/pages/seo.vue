<script setup lang="ts">
import SeoScreen from '~/features/seo/ui/SeoScreen.vue';

definePageMeta({ layout: 'admin' });
useHead({ title: 'SEO' });
</script>

<template>
  <SeoScreen />
</template>
