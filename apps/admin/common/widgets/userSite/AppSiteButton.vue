<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';

/**
 * User site pill button (DESIGN.md "Buttons"). `to` renders a link (internal or external).
 * `hasArrow` adds a → that slides right on hover.
 */
type SiteButtonVariant = 'primary' | 'outline' | 'gold' | 'goldOutline' | 'onDark' | 'ghost';

const props = withDefaults(
  defineProps<{
    variant?: SiteButtonVariant;
    size?: 'sm' | 'md';
    type?: 'button' | 'submit';
    to?: string;
    isExternal?: boolean;
    hasArrow?: boolean;
    isLoading?: boolean;
    isDisabled?: boolean;
  }>(),
  { variant: 'primary', size: 'md', type: 'button', to: undefined },
);
const emit = defineEmits<{ click: [] }>();

const variantClasses: Record<SiteButtonVariant, string> = {
  primary:
    'bg-primary text-textOnPrimary hover:-translate-y-px hover:bg-primaryDark hover:shadow-siteGlow',
  outline:
    'border-[1.5px] border-primary bg-background/80 text-primary hover:-translate-y-px hover:bg-primaryLight',
  gold: 'bg-secondary text-textPrimary hover:-translate-y-px hover:bg-secondaryLight',
  goldOutline:
    'border-[1.5px] border-secondary bg-transparent text-secondaryDark hover:bg-secondaryLight',
  onDark:
    'border-[1.5px] border-textOnPrimary/50 bg-transparent text-textOnPrimary hover:bg-textOnPrimary/10',
  ghost: 'text-primary hover:bg-primaryLight',
};

const buttonClasses = computed(() => [
  TextStyles.siteButton,
  variantClasses[props.variant],
  props.size === 'sm' ? 'px-4 py-2' : 'px-7 py-3',
  'group inline-flex items-center justify-center gap-2 rounded-full transition duration-200 disabled:cursor-not-allowed disabled:opacity-60',
]);
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :external="isExternal"
    :target="isExternal ? '_blank' : undefined"
    :class="buttonClasses"
  >
    <slot />
    <span
      v-if="hasArrow"
      aria-hidden="true"
      class="transition-transform group-hover:translate-x-[3px]"
      >→</span
    >
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
    <span
      v-if="hasArrow"
      aria-hidden="true"
      class="transition-transform group-hover:translate-x-[3px]"
      >→</span
    >
  </button>
</template>
