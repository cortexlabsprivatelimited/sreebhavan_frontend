<script setup lang="ts">
import RoomsScreen from '~/features/rooms/ui/RoomsScreen.vue';

definePageMeta({ layout: 'admin' });
useHead({ title: 'Rooms' });
</script>

<template>
  <RoomsScreen />
</template>
