<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';

/** Eyebrow + Playfair title (+ optional italic accent) + intro, centered by default. */
withDefaults(
  defineProps<{
    title: string;
    titleAccent?: string | null;
    eyebrow?: string;
    description?: string | null;
    isCentered?: boolean;
    /** No bottom margin, when the heading sits in a row with other content. */
    isFlush?: boolean;
  }>(),
  { titleAccent: null, eyebrow: undefined, description: null, isCentered: true },
);
</script>

<template>
  <div
    :class="[
      'flex flex-col gap-3',
      isFlush ? '' : 'mb-10 md:mb-14',
      isCentered ? 'mx-auto max-w-2xl items-center text-center' : 'items-start',
    ]"
  >
    <p v-if="eyebrow" :class="TextStyles.siteEyebrow">{{ eyebrow }}</p>
    <h2 :class="TextStyles.siteHeadline">
      {{ title }}
      <span v-if="titleAccent" :class="TextStyles.siteAccent">
        {{ titleAccent }}
      </span>
    </h2>
    <p v-if="description" :class="[TextStyles.siteBodyLg, 'max-w-xl']">{{ description }}</p>
  </div>
</template>
