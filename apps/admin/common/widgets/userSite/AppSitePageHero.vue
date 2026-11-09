<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';

/**
 * Editorial top section of a user site page, with the page's single <h1>.
 * Light ivory canvas; an optional photo sits behind a soft ivory wash. `titleAccent` is set as a
 * second, italic sapphire line ("revered through generations."). It reserves room for the
 * floating header. Slots: default = buttons, `below` = e.g. the quick availability bar,
 * `background` = a custom photo layer (e.g. a slideshow) used instead of `imageUrl`.
 */
const slots = useSlots();
const props = withDefaults(
  defineProps<{
    title: string;
    titleAccent?: string | null;
    eyebrow?: string;
    subtitle?: string | null;
    imageUrl?: string | null;
    imageAlt?: string;
    /** `strong`: photo is a faint texture. `soft`: photo stays visible, fading out behind the text. */
    imageWash?: 'strong' | 'soft';
    size?: 'md' | 'lg';
  }>(),
  {
    titleAccent: null,
    eyebrow: undefined,
    subtitle: null,
    imageUrl: null,
    imageAlt: '',
    imageWash: 'strong',
    size: 'md',
  },
);

const hasPhoto = computed(() => Boolean(props.imageUrl || slots.background));

/** Long headlines put the accent on its own line; short ones ("Our menu") keep it inline. */
const isAccentOnNewLine = computed(
  () => props.title.length + (props.titleAccent?.length ?? 0) > 28,
);
</script>

<template>
  <section class="relative isolate overflow-hidden bg-surface">
    <template v-if="hasPhoto">
      <div v-if="$slots.background" class="absolute inset-0 -z-20">
        <slot name="background" />
      </div>
      <NuxtImg
        v-else-if="imageUrl"
        :src="imageUrl"
        :alt="imageAlt"
        format="webp"
        loading="eager"
        fetchpriority="high"
        class="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div
        :class="[
          'absolute inset-0 -z-10',
          imageWash === 'soft'
            ? 'bg-gradient-to-b from-surface/90 via-surface/70 to-surface/25'
            : 'bg-siteHeroWash',
        ]"
        aria-hidden="true"
      />
    </template>
    <div
      class="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-surface"
      aria-hidden="true"
    />
    <div
      :class="[
        'mx-auto flex max-w-4xl flex-col items-center gap-5 px-6 text-center',
        size === 'lg' ? 'pb-16 pt-36 md:pb-20 md:pt-44' : 'pb-12 pt-32 md:pb-16 md:pt-40',
      ]"
    >
      <p
        v-if="eyebrow && hasPhoto"
        :class="[
          TextStyles.siteEyebrowOnPhoto,
          'rounded-full border border-siteHairlineGold bg-siteGlassStrong px-5 py-2 shadow-siteCard backdrop-blur-md',
        ]"
      >
        {{ eyebrow }}
      </p>
      <p v-else-if="eyebrow" :class="[TextStyles.siteEyebrow, 'flex items-center gap-3']">
        <span class="h-px w-8 bg-secondary/60" aria-hidden="true" />
        {{ eyebrow }}
        <span class="h-px w-8 bg-secondary/60" aria-hidden="true" />
      </p>
      <h1 :class="TextStyles.siteDisplay">
        {{ title }}
        <template v-if="titleAccent">
          <br v-if="isAccentOnNewLine" />
          <span :class="TextStyles.siteAccent">{{ titleAccent }}</span>
        </template>
      </h1>
      <p v-if="subtitle" :class="[TextStyles.siteSubheading, 'max-w-2xl']">{{ subtitle }}</p>
      <div v-if="$slots.default" class="mt-3 flex flex-wrap justify-center gap-3">
        <slot />
      </div>
    </div>
    <div v-if="$slots.below" class="mx-auto max-w-5xl px-4 pb-12">
      <slot name="below" />
    </div>
  </section>
</template>
