<script setup lang="ts">
import MenuItemsScreen from '~/features/menu/ui/MenuItemsScreen.vue';

definePageMeta({ layout: 'admin' });
useHead({ title: 'Menu' });
</script>

<template>
  <MenuItemsScreen />
</template>
