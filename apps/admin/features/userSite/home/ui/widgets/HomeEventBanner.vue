<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { SiteRoutes } from '~/common/constants/userSiteNavigation';
import { TextStyles } from '~/common/styles/textStyles';
import AppIcon from '~/common/widgets/AppIcon.vue';
import AppSiteButton from '~/common/widgets/userSite/AppSiteButton.vue';
</script>

<template>
  <div
    class="relative flex flex-col gap-6 overflow-hidden rounded-[2rem] bg-primary px-7 py-9 md:flex-row md:items-center md:justify-between md:px-12"
  >
    <AppIcon
      name="lotus"
      :stroke-width="0.6"
      class="pointer-events-none absolute -right-10 -top-16 h-64 w-64 text-secondary/20"
    />
    <div class="relative flex max-w-2xl flex-col gap-2">
      <h2 :class="TextStyles.siteFooterBrand">Planning a family gathering or wedding feast?</h2>
      <p :class="TextStyles.siteFooterText">
        See which hall dates are free, compare packages and tell us your plans. We'll take care of
        the rest.
      </p>
    </div>
    <AppSiteButton
      :to="SiteRoutes.hallAvailability"
      variant="gold"
      has-arrow
      class="relative shrink-0"
    >
      {{ AppStrings.actions.checkAvailability }}
    </AppSiteButton>
  </div>
</template>
