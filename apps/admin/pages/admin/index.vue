<script setup lang="ts">
import DashboardScreen from '~/features/adminSite/dashboard/ui/DashboardScreen.vue';

definePageMeta({ layout: 'admin' });
useHead({ title: 'Dashboard' });
</script>

<template>
  <DashboardScreen />
</template>
