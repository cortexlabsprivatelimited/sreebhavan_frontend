<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';
import type { PublicBusiness } from '~/common/types/userSite';
import AppIcon from '~/common/widgets/AppIcon.vue';
import AppSiteButton from '~/common/widgets/userSite/AppSiteButton.vue';
import type { HomeBrand } from '../../model/home.model';

/**
 * One business of the Sreebhavan Group as a large brand card: logo, name, the admin's "about"
 * text, highlights, opening hours and two actions. Sapphire (`isDark`) or warm ivory.
 */
const props = defineProps<{ brand: HomeBrand; business: PublicBusiness | null }>();

const name = computed(() => props.business?.name ?? props.brand.fallbackName);
const about = computed(() => props.business?.about || props.brand.fallbackAbout);
const firstTiming = computed(() => props.business?.timings[0] ?? null);
</script>

<template>
  <article
    :class="[
      'relative flex flex-col gap-6 overflow-hidden rounded-[2rem] p-8 shadow-siteCard transition hover:-translate-y-1 hover:shadow-siteFloat md:p-10',
      brand.isDark ? 'bg-primary' : 'border border-siteHairlineGold bg-secondaryLight',
    ]"
  >
    <AppIcon
      name="lotus"
      :stroke-width="0.6"
      :class="[
        'pointer-events-none absolute -right-12 -top-12 h-60 w-60',
        brand.isDark ? 'text-secondary/20' : 'text-secondary/30',
      ]"
    />
    <div class="relative flex items-center gap-4">
      <span
        :class="[
          'flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl',
          brand.isDark
            ? 'bg-background/10 text-secondary'
            : 'bg-background text-primary shadow-siteCard',
        ]"
      >
        <NuxtImg
          v-if="business?.logoUrl"
          :src="business.logoUrl"
          :alt="`${name} logo`"
          loading="lazy"
          class="h-12 w-12 object-contain"
        />
        <AppIcon v-else name="lotus" class="h-8 w-8" />
      </span>
      <div class="flex flex-col gap-1">
        <p :class="TextStyles.siteEyebrow">{{ brand.eyebrow }}</p>
        <h3
          :class="
            brand.isDark ? TextStyles.siteBrandShowcaseNameOnDark : TextStyles.siteBrandShowcaseName
          "
        >
          {{ name }}
        </h3>
      </div>
    </div>

    <p
      :class="[
        brand.isDark ? TextStyles.siteBodyLgOnDark : TextStyles.siteBodyLg,
        'relative line-clamp-4',
      ]"
    >
      {{ about }}
    </p>

    <ul class="relative grid gap-3">
      <li
        v-for="point in brand.points"
        :key="point"
        :class="[
          brand.isDark ? TextStyles.siteLabelOnDark : TextStyles.siteLabel,
          'flex items-center gap-3',
        ]"
      >
        <span
          :class="[
            'flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
            brand.isDark ? 'bg-secondary text-primary' : 'bg-primary text-textOnPrimary',
          ]"
        >
          <AppIcon name="check" class="h-3.5 w-3.5" />
        </span>
        {{ point }}
      </li>
    </ul>

    <p
      v-if="firstTiming"
      :class="[
        brand.isDark ? TextStyles.siteBodyLgOnDark : TextStyles.siteBodyLg,
        'relative flex items-center gap-2',
      ]"
    >
      <AppIcon name="clock" class="h-4 w-4 text-secondary" />
      {{ firstTiming.label }}: {{ firstTiming.hours }}
    </p>

    <div class="relative mt-auto flex flex-wrap gap-3 pt-2">
      <AppSiteButton
        :to="brand.primaryAction.to"
        :variant="brand.isDark ? 'gold' : 'primary'"
        has-arrow
      >
        {{ brand.primaryAction.label }}
      </AppSiteButton>
      <AppSiteButton :to="brand.secondaryAction.to" :variant="brand.isDark ? 'onDark' : 'outline'">
        {{ brand.secondaryAction.label }}
      </AppSiteButton>
    </div>
  </article>
</template>
