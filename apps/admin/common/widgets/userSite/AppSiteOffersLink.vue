<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { SiteRoutes } from '~/common/constants/userSiteNavigation';
import { TextStyles } from '~/common/styles/textStyles';
import AppIcon from '~/common/widgets/AppIcon.vue';

/** Hot-deal style header link to the home page special offers: flame, label, count and a pulse. */
defineProps<{ offerCount: number; isCompact?: boolean }>();
</script>

<template>
  <NuxtLink
    :to="SiteRoutes.specialOffers"
    :aria-label="`${AppStrings.site.specialOffers} (${offerCount})`"
    :class="[
      TextStyles.siteNavLink,
      'group relative inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-tertiary to-secondary font-semibold',
      isCompact ? 'h-11 pl-3 pr-1.5' : 'py-1.5 pl-3 pr-1.5',
      'text-textOnPrimary shadow-siteGlow transition hover:-translate-y-0.5 hover:shadow-siteFloat',
    ]"
  >
    <span class="absolute -right-0.5 -top-0.5 flex h-3 w-3" aria-hidden="true">
      <span
        class="absolute inline-flex h-full w-full animate-ping rounded-full bg-tertiary opacity-60 motion-reduce:animate-none"
      />
      <span
        class="relative inline-flex h-3 w-3 rounded-full border-2 border-background bg-tertiary"
      />
    </span>
    <AppIcon name="flame" class="h-4 w-4 transition group-hover:scale-110" />
    <template v-if="!isCompact">{{ AppStrings.site.offersNavLabel }}</template>
    <span
      :class="[
        TextStyles.siteChip,
        'ml-0.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-background px-1.5 text-tertiary',
      ]"
    >
      {{ offerCount }}
    </span>
  </NuxtLink>
</template>
