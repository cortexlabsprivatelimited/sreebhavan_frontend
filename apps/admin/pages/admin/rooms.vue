<script setup lang="ts">
import RoomsScreen from '~/features/adminSite/rooms/ui/RoomsScreen.vue';

definePageMeta({ layout: 'admin' });
useHead({ title: 'Rooms' });
</script>

<template>
  <RoomsScreen />
</template>
