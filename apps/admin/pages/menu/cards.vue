<script setup lang="ts">
import MenuCardsScreen from '~/features/menu/ui/MenuCardsScreen.vue';

definePageMeta({ layout: 'admin' });
useHead({ title: 'Menu card' });
</script>

<template>
  <MenuCardsScreen />
</template>
