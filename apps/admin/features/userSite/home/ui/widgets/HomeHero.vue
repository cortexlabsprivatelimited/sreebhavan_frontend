<script setup lang="ts">
import { ImageConstants } from '~/common/constants/imageConstants';
import { SiteRoutes } from '~/common/constants/userSiteNavigation';
import AppSiteButton from '~/common/widgets/userSite/AppSiteButton.vue';
import AppSitePageHero from '~/common/widgets/userSite/AppSitePageHero.vue';
import { HomeHeroContent, type QuickAvailabilityForm } from '../../model/home.model';
import HomeQuickAvailabilityBar from './HomeQuickAvailabilityBar.vue';

/** Home hero: the Sreebhavanam building photo, brand headline and the quick availability bar. */
const quickAvailabilityForm = defineModel<QuickAvailabilityForm>('quickAvailabilityForm', {
  required: true,
});
const emit = defineEmits<{ 'check-availability': [] }>();
</script>

<template>
  <AppSitePageHero
    size="lg"
    :eyebrow="HomeHeroContent.eyebrow"
    :title="HomeHeroContent.title"
    :title-accent="HomeHeroContent.titleAccent"
    :subtitle="HomeHeroContent.subtitle"
    :image-url="ImageConstants.backgrounds.homeHero"
    :image-alt="HomeHeroContent.imageAlt"
    image-wash="soft"
  >
    <AppSiteButton :to="SiteRoutes.menu" has-arrow>Explore dining & menu</AppSiteButton>
    <AppSiteButton :to="SiteRoutes.sreebhavanam" variant="outline"
      >Event hall & rooms</AppSiteButton
    >
    <template #below>
      <HomeQuickAvailabilityBar
        v-model="quickAvailabilityForm"
        @check-availability="emit('check-availability')"
      />
    </template>
  </AppSitePageHero>
</template>
