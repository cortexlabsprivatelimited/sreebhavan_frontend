<script setup lang="ts">
import BusinessesScreen from '~/features/adminSite/businesses/ui/BusinessesScreen.vue';

definePageMeta({ layout: 'admin' });
useHead({ title: 'Businesses' });
</script>

<template>
  <BusinessesScreen />
</template>
