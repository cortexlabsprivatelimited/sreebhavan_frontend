<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { SiteRoutes } from '~/common/constants/userSiteNavigation';
import { TextStyles } from '~/common/styles/textStyles';
import type { PublicBusiness } from '~/common/types/userSite';
import AppSiteButton from '~/common/widgets/userSite/AppSiteButton.vue';
import AppIcon from '~/common/widgets/AppIcon.vue';
import AppSiteWhatsAppButton from '~/common/widgets/userSite/AppSiteWhatsAppButton.vue';
import type { HotelMenuCard } from '../../model/hotel.model';

defineProps<{
  business: PublicBusiness | null;
  menuCards: HotelMenuCard[];
  whatsAppUrl: string | null;
}>();
</script>

<template>
  <aside
    class="flex flex-col gap-5 rounded-3xl border border-siteHairline bg-background p-6 shadow-siteCard"
  >
    <div v-if="business?.timings.length">
      <h2 :class="[TextStyles.siteHeadlineSm, 'mb-3 flex items-center gap-2']">
        <AppIcon name="clock" class="h-5 w-5 text-primary" />{{ AppStrings.site.openingHours }}
      </h2>
      <dl class="flex flex-col gap-2">
        <div
          v-for="timing in business.timings"
          :key="timing.label"
          class="flex justify-between gap-4 border-b border-border/70 pb-2 last:border-0"
        >
          <dt :class="TextStyles.siteLabel">{{ timing.label }}</dt>
          <dd :class="TextStyles.siteBody">{{ timing.hours }}</dd>
        </div>
      </dl>
    </div>
    <div class="flex flex-col gap-2">
      <AppSiteButton :to="SiteRoutes.menu">{{ AppStrings.actions.viewMenu }}</AppSiteButton>
      <a
        v-for="card in menuCards"
        :key="card.id"
        :href="card.fileUrl"
        target="_blank"
        rel="noopener"
        :class="[TextStyles.siteArrowLink, 'flex items-center justify-center gap-2 py-1']"
      >
        <AppIcon name="download" class="h-4 w-4" />{{ card.title }}
      </a>
    </div>
    <div class="flex flex-col gap-2 border-t border-siteHairline pt-5">
      <AppSiteWhatsAppButton v-if="whatsAppUrl" :url="whatsAppUrl" />
      <AppSiteButton v-if="business?.phone" :to="`tel:${business.phone}`" variant="outline">
        <AppIcon name="phone" class="h-4 w-4" />{{ business.phone }}
      </AppSiteButton>
    </div>
  </aside>
</template>
