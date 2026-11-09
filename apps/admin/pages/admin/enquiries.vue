<script setup lang="ts">
import EnquiriesScreen from '~/features/adminSite/enquiries/ui/EnquiriesScreen.vue';

definePageMeta({ layout: 'admin' });
useHead({ title: 'Enquiries' });
</script>

<template>
  <EnquiriesScreen />
</template>
