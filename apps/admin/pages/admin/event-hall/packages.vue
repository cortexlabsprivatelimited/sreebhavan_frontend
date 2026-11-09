<script setup lang="ts">
import HallPackagesScreen from '~/features/adminSite/eventHall/ui/HallPackagesScreen.vue';

definePageMeta({ layout: 'admin' });
useHead({ title: 'Hall packages' });
</script>

<template>
  <HallPackagesScreen />
</template>
