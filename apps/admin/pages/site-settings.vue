<script setup lang="ts">
import SiteSettingsScreen from '~/features/siteSettings/ui/SiteSettingsScreen.vue';

definePageMeta({ layout: 'admin' });
useHead({ title: 'Site settings' });
</script>

<template>
  <SiteSettingsScreen />
</template>
