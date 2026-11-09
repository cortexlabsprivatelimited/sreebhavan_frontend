<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';

/** Uppercase text link with a micro arrow that slides 3px right on hover. */
defineProps<{ to: string }>();
</script>

<template>
  <NuxtLink :to="to" :class="[TextStyles.siteArrowLink, 'group inline-flex items-center gap-2']">
    <slot />
    <span aria-hidden="true" class="transition-transform group-hover:translate-x-[3px]">→</span>
  </NuxtLink>
</template>
