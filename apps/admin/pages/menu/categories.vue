<script setup lang="ts">
import MenuCategoriesScreen from '~/features/menu/ui/MenuCategoriesScreen.vue';

definePageMeta({ layout: 'admin' });
useHead({ title: 'Menu categories' });
</script>

<template>
  <MenuCategoriesScreen />
</template>
