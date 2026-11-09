<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { SiteRoutes } from '~/common/constants/userSiteNavigation';
import { TextStyles } from '~/common/styles/textStyles';
import type { PublicSpecialOffer } from '~/common/types/userSite';
import AppIcon from '~/common/widgets/AppIcon.vue';
import AppSiteArrowLink from '~/common/widgets/userSite/AppSiteArrowLink.vue';

/**
 * One special offer, styled like the room cards. Without its own button the card links to the
 * enquiry form.
 */
const props = defineProps<{ specialOffer: PublicSpecialOffer }>();

const linkTo = computed(() => props.specialOffer.ctaLink || SiteRoutes.enquiry);
const linkLabel = computed(() =>
  props.specialOffer.ctaLink && props.specialOffer.ctaText
    ? props.specialOffer.ctaText
    : AppStrings.site.bookNow,
);
</script>

<template>
  <article
    class="group flex flex-col overflow-hidden rounded-3xl border border-siteHairline bg-background shadow-siteCard transition hover:shadow-siteFloat"
  >
    <div class="relative overflow-hidden">
      <NuxtImg
        :src="specialOffer.imageUrl"
        :alt="specialOffer.title"
        format="webp"
        loading="lazy"
        class="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
      />
      <span
        :class="[
          TextStyles.siteChip,
          'absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-siteHairlineGold bg-siteGlass px-3 py-1.5 text-tertiary backdrop-blur-md',
        ]"
      >
        <AppIcon name="flame" class="h-3.5 w-3.5" />
        {{ AppStrings.site.specialOffer }}
      </span>
    </div>
    <div class="flex flex-1 flex-col gap-3 p-6">
      <h2 :class="TextStyles.siteHeadlineSm">{{ specialOffer.title }}</h2>
      <p v-if="specialOffer.subtitle" :class="TextStyles.siteBody">
        {{ specialOffer.subtitle }}
      </p>
      <div class="mt-auto border-t border-siteHairline pt-4">
        <AppSiteArrowLink :to="linkTo">{{ linkLabel }}</AppSiteArrowLink>
      </div>
    </div>
  </article>
</template>
