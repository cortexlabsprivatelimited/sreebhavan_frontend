<script setup lang="ts">
import BannersScreen from '~/features/banners/ui/BannersScreen.vue';

definePageMeta({ layout: 'admin' });
useHead({ title: 'Banners' });
</script>

<template>
  <BannersScreen />
</template>
