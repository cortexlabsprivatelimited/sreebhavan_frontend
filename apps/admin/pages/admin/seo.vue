<script setup lang="ts">
import SeoScreen from '~/features/adminSite/seo/ui/SeoScreen.vue';

definePageMeta({ layout: 'admin' });
useHead({ title: 'SEO' });
</script>

<template>
  <SeoScreen />
</template>
