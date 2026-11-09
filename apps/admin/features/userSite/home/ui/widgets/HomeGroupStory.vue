<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { ImageConstants } from '~/common/constants/imageConstants';
import { SiteRoutes } from '~/common/constants/userSiteNavigation';
import { TextStyles } from '~/common/styles/textStyles';
import AppIcon from '~/common/widgets/AppIcon.vue';
import AppSiteArrowLink from '~/common/widgets/userSite/AppSiteArrowLink.vue';
import AppSiteSectionHeading from '~/common/widgets/userSite/AppSiteSectionHeading.vue';
import { HomeGroupStory } from '../../model/home.model';

/** "The Sreebhavan Group": building photo with a floating glass card, the story and its values. */
defineProps<{ roomCount: number }>();
</script>

<template>
  <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
    <div class="relative">
      <NuxtImg
        :src="ImageConstants.backgrounds.homeHero"
        :alt="HomeGroupStory.imageAlt"
        format="webp"
        loading="lazy"
        class="aspect-[4/3] w-full rounded-3xl object-cover object-[62%_center] shadow-siteFloat"
      />
      <div
        class="absolute -bottom-6 left-4 flex items-center gap-4 rounded-3xl border border-siteHairlineGold bg-siteGlassStrong px-5 py-4 shadow-siteFloat backdrop-blur-xl md:-bottom-8 md:left-8"
      >
        <span
          class="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-secondary"
        >
          <AppIcon name="lotus" class="h-6 w-6" />
        </span>
        <div class="flex flex-col">
          <span :class="TextStyles.siteLabel">{{ AppStrings.site.pureVeg }}</span>
          <span :class="TextStyles.siteBodySm">
            Veg Hotel · Event Hall<template v-if="roomCount">
              · {{ roomCount }} {{ roomCount === 1 ? 'room' : 'rooms' }}</template
            >
          </span>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-6 pt-6 lg:pt-0">
      <AppSiteSectionHeading
        :eyebrow="HomeGroupStory.eyebrow"
        :title="HomeGroupStory.title"
        :title-accent="HomeGroupStory.titleAccent"
        :is-centered="false"
        is-flush
      />
      <p
        v-for="paragraph in HomeGroupStory.paragraphs"
        :key="paragraph"
        :class="TextStyles.siteBodyLg"
      >
        {{ paragraph }}
      </p>
      <ul class="grid gap-4 border-t border-siteHairline pt-6 sm:grid-cols-3">
        <li v-for="value in HomeGroupStory.values" :key="value.title" class="flex flex-col gap-2">
          <span
            class="flex h-10 w-10 items-center justify-center rounded-full bg-secondaryLight text-secondaryDark"
          >
            <AppIcon :name="value.icon" class="h-5 w-5" />
          </span>
          <span :class="TextStyles.siteLabel">{{ value.title }}</span>
          <span :class="TextStyles.siteBodySm">{{ value.text }}</span>
        </li>
      </ul>
      <AppSiteArrowLink :to="SiteRoutes.about">Read our story</AppSiteArrowLink>
    </div>
  </div>
</template>
