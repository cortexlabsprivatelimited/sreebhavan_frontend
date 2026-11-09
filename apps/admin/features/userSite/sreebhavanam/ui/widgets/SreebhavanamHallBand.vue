<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { SiteRoutes } from '~/common/constants/userSiteNavigation';
import { TextStyles } from '~/common/styles/textStyles';
import AppSiteButton from '~/common/widgets/userSite/AppSiteButton.vue';
import type { SreebhavanamHallSummary } from '../../model/sreebhavanam.model';

defineProps<{ hall: SreebhavanamHallSummary | null }>();
</script>

<template>
  <div class="grid items-center gap-8 rounded-3xl bg-primary p-8 md:grid-cols-[1.4fr_1fr] md:p-12">
    <div class="flex flex-col gap-4">
      <p :class="TextStyles.siteHeroEyebrow">Event hall</p>
      <h2 :class="TextStyles.siteHeroTitle">{{ hall?.name ?? 'Sreebhavanam Hall' }}</h2>
      <p :class="TextStyles.siteHeroSubtitle">
        A spacious hall for weddings, receptions, engagements and family functions, with packages to
        suit every budget.
      </p>
      <div class="flex flex-wrap gap-3">
        <AppSiteButton :to="SiteRoutes.hallAvailability" variant="gold">
          {{ AppStrings.actions.checkAvailability }}
        </AppSiteButton>
        <AppSiteButton :to="SiteRoutes.eventHall" variant="onDark">
          {{ AppStrings.site.viewHall }} →
        </AppSiteButton>
      </div>
    </div>
    <dl v-if="hall" class="grid grid-cols-2 gap-4">
      <div class="flex flex-col-reverse rounded-2xl bg-textOnPrimary/10 p-5 text-center">
        <dt :class="TextStyles.siteFooterText">Seated guests</dt>
        <dd :class="TextStyles.siteStatValueOnDark">{{ hall.seatingCapacity }}</dd>
      </div>
      <div class="flex flex-col-reverse rounded-2xl bg-textOnPrimary/10 p-5 text-center">
        <dt :class="TextStyles.siteFooterText">Floating guests</dt>
        <dd :class="TextStyles.siteStatValueOnDark">{{ hall.floatingCapacity }}</dd>
      </div>
    </dl>
  </div>
</template>
