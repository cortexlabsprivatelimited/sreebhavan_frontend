<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';

const props = withDefaults(
  defineProps<{
    label: string;
    modelValue: string | number | null;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date';
    placeholder?: string;
    hint?: string;
    error?: string;
    isRequired?: boolean;
    isDisabled?: boolean;
    autocomplete?: string;
  }>(),
  { type: 'text', placeholder: '', hint: undefined, error: undefined, autocomplete: 'off' },
);
const emit = defineEmits<{ 'update:modelValue': [value: string | number | null] }>();

const inputId = useId();

const updateValue = (event: Event) => {
  const rawValue = (event.target as HTMLInputElement).value;
  if (props.type === 'number') {
    emit('update:modelValue', rawValue === '' ? null : Number(rawValue));
    return;
  }
  emit('update:modelValue', rawValue);
};
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label :for="inputId" :class="TextStyles.label">
      {{ label }}<span v-if="isRequired" :class="TextStyles.requiredMark"> *</span>
    </label>
    <input
      :id="inputId"
      :type="type"
      :value="modelValue ?? ''"
      :placeholder="placeholder"
      :disabled="isDisabled"
      :autocomplete="autocomplete"
      :aria-invalid="Boolean(error)"
      :class="[
        TextStyles.input,
        'w-full rounded-xl border bg-background px-3.5 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primaryLight disabled:bg-surface',
        error ? 'border-error' : 'border-border',
      ]"
      @input="updateValue"
    />
    <p v-if="error" :class="TextStyles.errorText">{{ error }}</p>
    <p v-else-if="hint" :class="TextStyles.caption">{{ hint }}</p>
  </div>
</template>
