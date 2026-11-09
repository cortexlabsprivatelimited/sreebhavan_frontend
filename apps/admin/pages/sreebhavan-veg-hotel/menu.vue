<script setup lang="ts">
import { usePageSeo } from '~/common/controllers/usePageSeo';
import MenuScreen from '~/features/userSite/menu/ui/MenuScreen.vue';

useSeoMeta(
  usePageSeo('menu', {
    title: 'Menu · Sreebhavan Veg Hotel',
    description: 'Kerala breakfast, meals, snacks and sweets with prices. Pure vegetarian.',
  }),
);
</script>

<template>
  <MenuScreen />
</template>
