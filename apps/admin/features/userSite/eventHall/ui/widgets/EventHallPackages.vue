<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { buildEnquiryLink } from '~/common/constants/userSiteNavigation';
import { TextStyles } from '~/common/styles/textStyles';
import { formatPrice } from '~/common/utils/formatPrice';
import AppSiteButton from '~/common/widgets/userSite/AppSiteButton.vue';
import AppSiteFeatureList from '~/common/widgets/userSite/AppSiteFeatureList.vue';
import type { HallPackage } from '../../model/eventHall.model';

defineProps<{ packages: HallPackage[] }>();
const enquiryLink = buildEnquiryLink({ type: 'hall' });
</script>

<template>
  <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    <article
      v-for="(hallPackage, index) in packages"
      :key="hallPackage.id"
      :class="[
        'flex flex-col gap-5 rounded-3xl border bg-background p-7 shadow-siteCard',
        index === 0 ? 'border-secondary ring-1 ring-secondary/40' : 'border-siteHairline',
      ]"
    >
      <h3 :class="TextStyles.siteHeadlineMd">{{ hallPackage.name }}</h3>
      <p :class="TextStyles.siteBigPrice">{{ formatPrice(hallPackage.price) }}</p>
      <AppSiteFeatureList :items="hallPackage.inclusions" is-compact class="flex-1" />
      <AppSiteButton :to="enquiryLink" :variant="index === 0 ? 'primary' : 'outline'">
        {{ AppStrings.site.bookNow }}
      </AppSiteButton>
    </article>
  </div>
</template>
