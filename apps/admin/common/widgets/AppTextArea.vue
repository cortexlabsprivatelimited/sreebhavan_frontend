<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';

withDefaults(
  defineProps<{
    label: string;
    modelValue: string;
    rows?: number;
    placeholder?: string;
    hint?: string;
    error?: string;
    isRequired?: boolean;
  }>(),
  { rows: 4, placeholder: '', hint: undefined, error: undefined },
);
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

const inputId = useId();
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label :for="inputId" :class="TextStyles.label">
      {{ label }}<span v-if="isRequired" :class="TextStyles.requiredMark"> *</span>
    </label>
    <textarea
      :id="inputId"
      :value="modelValue"
      :rows="rows"
      :placeholder="placeholder"
      :aria-invalid="Boolean(error)"
      :class="[
        TextStyles.input,
        'w-full rounded-xl border bg-background px-3.5 py-2.5 outline-none transition focus:border-focus focus:ring-2 focus:ring-focusRing',
        error ? 'border-error' : 'border-border',
      ]"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    <p v-if="error" :class="TextStyles.errorText">{{ error }}</p>
    <p v-else-if="hint" :class="TextStyles.caption">{{ hint }}</p>
  </div>
</template>
