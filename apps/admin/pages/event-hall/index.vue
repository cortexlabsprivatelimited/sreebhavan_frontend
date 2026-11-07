<script setup lang="ts">
import EventHallDetailsScreen from '~/features/eventHall/ui/EventHallDetailsScreen.vue';

definePageMeta({ layout: 'admin' });
useHead({ title: 'Event hall' });
</script>

<template>
  <EventHallDetailsScreen />
</template>
