<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'dangerGhost';

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    size?: 'sm' | 'md';
    type?: 'button' | 'submit';
    to?: string;
    isLoading?: boolean;
    isDisabled?: boolean;
  }>(),
  { variant: 'primary', size: 'md', type: 'button', to: undefined },
);
const emit = defineEmits<{ click: [] }>();

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-textOnPrimary shadow-sm hover:bg-primaryDark',
  secondary:
    'border border-border bg-background text-textPrimary hover:border-primary/40 hover:bg-primaryLight',
  danger: 'bg-error text-textOnPrimary hover:opacity-90',
  ghost: 'text-primary hover:bg-primaryLight',
  dangerGhost: 'text-error hover:bg-errorLight',
};

const buttonClasses = computed(() => [
  props.size === 'sm' ? TextStyles.buttonSmall : TextStyles.button,
  variantClasses[props.variant],
  props.size === 'sm' ? 'px-3 py-1.5' : 'px-4 py-2',
  'inline-flex items-center justify-center gap-2 rounded-xl transition disabled:cursor-not-allowed disabled:opacity-60',
]);
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="buttonClasses">
    <slot />
  </NuxtLink>
  <button
    v-else
    :type="type"
    :class="buttonClasses"
    :disabled="isDisabled || isLoading"
    @click="emit('click')"
  >
    <span
      v-if="isLoading"
      class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
    <slot />
  </button>
</template>
