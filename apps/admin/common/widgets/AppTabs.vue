<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';

defineProps<{ tabs: { key: string; label: string }[]; modelValue: string }>();
const emit = defineEmits<{ 'update:modelValue': [key: string] }>();
</script>

<template>
  <div role="tablist" class="mb-6 flex gap-1 overflow-x-auto border-b border-border">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      type="button"
      role="tab"
      :aria-selected="tab.key === modelValue"
      :class="[
        TextStyles.navLink,
        'whitespace-nowrap border-b-2 px-4 py-2.5 transition',
        tab.key === modelValue
          ? 'border-primary text-primary'
          : 'border-transparent text-textSecondary hover:text-textPrimary',
      ]"
      @click="emit('update:modelValue', tab.key)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>
