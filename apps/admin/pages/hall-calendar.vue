<script setup lang="ts">
import HallCalendarScreen from '~/features/hallCalendar/ui/HallCalendarScreen.vue';

definePageMeta({ layout: 'admin' });
useHead({ title: 'Hall calendar' });
</script>

<template>
  <HallCalendarScreen />
</template>
