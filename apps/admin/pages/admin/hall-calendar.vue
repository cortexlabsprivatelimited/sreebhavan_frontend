<script setup lang="ts">
import HallCalendarScreen from '~/features/adminSite/hallCalendar/ui/HallCalendarScreen.vue';

definePageMeta({ layout: 'admin' });
useHead({ title: 'Hall calendar' });
</script>

<template>
  <HallCalendarScreen />
</template>
