<script setup lang="ts">
import { AppIcons, type AppIconName } from '~/common/constants/appIcons';

/** Inline SVG icon in the current text color. Size it with `h-5 w-5` etc. */
const props = withDefaults(defineProps<{ name: AppIconName; strokeWidth?: number }>(), {
  strokeWidth: 2,
});
const iconElements = computed(() => AppIcons[props.name]);
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="shrink-0"
  >
    <component
      :is="element.tag"
      v-for="(element, index) in iconElements"
      :key="index"
      v-bind="element.attrs"
    />
  </svg>
</template>
