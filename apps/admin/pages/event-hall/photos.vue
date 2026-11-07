<script setup lang="ts">
import HallPhotosScreen from '~/features/eventHall/ui/HallPhotosScreen.vue';

definePageMeta({ layout: 'admin' });
useHead({ title: 'Hall photos' });
</script>

<template>
  <HallPhotosScreen />
</template>
