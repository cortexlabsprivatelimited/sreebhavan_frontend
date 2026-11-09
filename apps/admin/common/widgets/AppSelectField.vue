<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';
import type { SelectOption } from '~/common/types/api';

withDefaults(
  defineProps<{
    label: string;
    modelValue: string;
    options: SelectOption[];
    placeholder?: string;
    error?: string;
    isRequired?: boolean;
    isDisabled?: boolean;
    isLabelHidden?: boolean;
  }>(),
  { placeholder: undefined, error: undefined },
);
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

const selectId = useId();
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label :for="selectId" :class="[TextStyles.label, { 'sr-only': isLabelHidden }]">
      {{ label }}<span v-if="isRequired" :class="TextStyles.requiredMark"> *</span>
    </label>
    <select
      :id="selectId"
      :value="modelValue"
      :disabled="isDisabled"
      :aria-invalid="Boolean(error)"
      :class="[
        TextStyles.input,
        'w-full rounded-xl border bg-background px-3.5 py-2.5 outline-none focus:border-focus focus:ring-2 focus:ring-focusRing disabled:bg-surface',
        error ? 'border-error' : 'border-border',
      ]"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <p v-if="error" :class="TextStyles.errorText">{{ error }}</p>
  </div>
</template>
