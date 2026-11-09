<script setup lang="ts">
import AdminUsersScreen from '~/features/adminSite/adminUsers/ui/AdminUsersScreen.vue';

definePageMeta({ layout: 'admin', requiresOwner: true });
useHead({ title: 'Admin users' });
</script>

<template>
  <AdminUsersScreen />
</template>
