<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';
import type { PublicTestimonial } from '~/common/types/userSite';
import AppIcon from '~/common/widgets/AppIcon.vue';

const props = defineProps<{ testimonial: PublicTestimonial }>();
const starIndexes = Array.from({ length: 5 }, (_value, index) => index);
const initials = computed(() =>
  props.testimonial.name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase(),
);
</script>

<template>
  <figure
    class="flex h-full flex-col gap-5 rounded-3xl border border-siteHairline bg-background p-7 shadow-siteCard"
  >
    <div class="flex gap-1" role="img" :aria-label="`${testimonial.rating} out of 5`">
      <AppIcon
        v-for="index in starIndexes"
        :key="index"
        name="star"
        :class="[
          'h-4 w-4',
          index < testimonial.rating ? 'fill-secondary text-secondary' : 'text-border',
        ]"
      />
    </div>
    <blockquote :class="[TextStyles.siteQuote, 'flex-1']">“{{ testimonial.text }}”</blockquote>
    <figcaption class="flex items-center gap-3 border-t border-siteHairline pt-5">
      <span
        :class="[
          TextStyles.siteChip,
          'flex h-10 w-10 items-center justify-center rounded-full bg-secondaryLight text-secondaryDark',
        ]"
      >
        {{ initials }}
      </span>
      <span :class="TextStyles.siteLabel">{{ testimonial.name }}</span>
    </figcaption>
  </figure>
</template>
