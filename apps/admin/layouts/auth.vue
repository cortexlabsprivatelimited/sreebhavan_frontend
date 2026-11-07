<script setup lang="ts">
import AppIcon from '~/common/widgets/AppIcon.vue';
import AppToastList from '~/common/widgets/AppToastList.vue';
</script>

<template>
  <div
    class="relative flex min-h-screen items-center justify-center overflow-hidden bg-sidebar px-4 py-10"
  >
    <AppIcon
      name="lotus"
      :stroke-width="0.8"
      class="pointer-events-none absolute -bottom-16 -left-16 h-80 w-80 text-primary/40"
    />
    <AppIcon
      name="lotus"
      :stroke-width="0.8"
      class="pointer-events-none absolute -right-10 -top-10 h-64 w-64 text-primary/25"
    />
    <div class="relative flex w-full justify-center">
      <slot />
    </div>
    <AppToastList />
  </div>
</template>
