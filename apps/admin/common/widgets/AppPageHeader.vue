<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';

defineProps<{ title: string; description?: string }>();
</script>

<template>
  <header class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <h1 :class="TextStyles.heading">{{ title }}</h1>
      <p v-if="description" :class="[TextStyles.bodySmall, 'mt-1']">{{ description }}</p>
    </div>
    <div v-if="$slots.actions" class="flex flex-wrap gap-2">
      <slot name="actions" />
    </div>
  </header>
</template>
