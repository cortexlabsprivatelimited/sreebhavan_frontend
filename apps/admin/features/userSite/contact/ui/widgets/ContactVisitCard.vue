<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import type { PublicBusiness, PublicSiteSettings } from '~/common/types/userSite';
import AppSiteButton from '~/common/widgets/userSite/AppSiteButton.vue';
import AppIcon from '~/common/widgets/AppIcon.vue';

defineProps<{ settings: PublicSiteSettings; businesses: PublicBusiness[] }>();
</script>

<template>
  <div
    class="flex flex-col gap-6 rounded-3xl border border-siteHairline bg-background p-6 shadow-siteCard"
  >
    <div v-if="settings.address" class="flex flex-col gap-3">
      <h2 :class="[TextStyles.siteHeadlineSm, 'flex items-center gap-2']">
        <AppIcon name="mapPin" class="h-5 w-5 text-primary" />Address
      </h2>
      <p :class="[TextStyles.siteBodyLg, 'whitespace-pre-line']">{{ settings.address }}</p>
      <AppSiteButton
        v-if="settings.mapLinkUrl"
        :to="settings.mapLinkUrl"
        is-external
        variant="outline"
        class="self-start"
      >
        <AppIcon name="externalLink" class="h-4 w-4" />{{ AppStrings.site.getDirections }}
      </AppSiteButton>
    </div>
    <div v-for="business in businesses" :key="business.id" class="flex flex-col gap-2">
      <h2
        v-if="business.timings.length"
        :class="[TextStyles.siteHeadlineSm, 'flex items-center gap-2']"
      >
        <AppIcon name="clock" class="h-5 w-5 text-primary" />{{ business.name }}
      </h2>
      <p
        v-for="timing in business.timings"
        :key="timing.label"
        :class="[TextStyles.siteBody, 'flex justify-between gap-4']"
      >
        <span>{{ timing.label }}</span
        ><span>{{ timing.hours }}</span>
      </p>
    </div>
  </div>
</template>
