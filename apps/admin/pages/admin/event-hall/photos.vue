<script setup lang="ts">
import HallPhotosScreen from '~/features/adminSite/eventHall/ui/HallPhotosScreen.vue';

definePageMeta({ layout: 'admin' });
useHead({ title: 'Hall photos' });
</script>

<template>
  <HallPhotosScreen />
</template>
