<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';

defineProps<{ label: string; modelValue: boolean; isDisabled?: boolean }>();
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>();
</script>

<template>
  <label class="inline-flex cursor-pointer items-center gap-3">
    <input
      type="checkbox"
      class="peer sr-only"
      :checked="modelValue"
      :disabled="isDisabled"
      @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />
    <span
      class="relative h-6 w-11 rounded-full bg-border transition after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-background after:transition peer-checked:bg-primary peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-primaryLight peer-disabled:opacity-50"
    />
    <span :class="TextStyles.label">{{ label }}</span>
  </label>
</template>
