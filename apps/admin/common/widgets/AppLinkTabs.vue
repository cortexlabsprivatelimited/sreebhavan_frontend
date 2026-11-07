<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';

/** Tabs that are routes (each tab is its own page). */
defineProps<{ tabs: { label: string; to: string }[] }>();

const route = useRoute();
</script>

<template>
  <nav class="mb-6 flex gap-1 overflow-x-auto border-b border-border">
    <NuxtLink
      v-for="tab in tabs"
      :key="tab.to"
      :to="tab.to"
      :class="[
        TextStyles.navLink,
        'whitespace-nowrap border-b-2 px-4 py-2.5 transition',
        route.path === tab.to
          ? 'border-primary text-primary'
          : 'border-transparent text-textSecondary hover:text-textPrimary',
      ]"
    >
      {{ tab.label }}
    </NuxtLink>
  </nav>
</template>
