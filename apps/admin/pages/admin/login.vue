<script setup lang="ts">
import LoginScreen from '~/features/adminSite/login/ui/LoginScreen.vue';

definePageMeta({ layout: 'auth', isPublic: true });
useHead({ title: 'Sign in' });
</script>

<template>
  <LoginScreen />
</template>
