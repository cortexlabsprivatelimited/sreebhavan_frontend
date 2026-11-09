<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { SiteRoutes } from '~/common/constants/userSiteNavigation';
import { TextStyles } from '~/common/styles/textStyles';
import AppSiteButton from '~/common/widgets/userSite/AppSiteButton.vue';
import AppSitePageHero from '~/common/widgets/userSite/AppSitePageHero.vue';
import AppSiteSectionHeading from '~/common/widgets/userSite/AppSiteSectionHeading.vue';
import { useAboutController } from '../controller/useAboutController';
import { AboutStory, AboutValues } from '../model/about.model';
import AboutValuesGrid from './widgets/AboutValuesGrid.vue';

const { businesses } = useAboutController();
</script>

<template>
  <div>
    <AppSitePageHero
      eyebrow="About us"
      :title="AboutStory.title"
      :title-accent="AboutStory.titleAccent"
      :subtitle="AppStrings.siteTagline"
    />

    <section class="mx-auto flex max-w-3xl flex-col gap-5 px-4 py-14 lg:py-20">
      <p v-for="paragraph in AboutStory.paragraphs" :key="paragraph" :class="TextStyles.siteBodyLg">
        {{ paragraph }}
      </p>
    </section>

    <section class="mx-auto max-w-site px-6 md:px-12 pb-16 lg:px-20">
      <AppSiteSectionHeading
        eyebrow="What we stand for"
        title="Our promise to every guest"
        is-centered
      />
      <AboutValuesGrid :values="AboutValues" />
    </section>

    <section v-if="businesses.length" class="bg-surfaceMuted py-16">
      <div class="mx-auto grid max-w-site gap-8 px-6 md:px-12 md:grid-cols-2 lg:px-20">
        <article v-for="business in businesses" :key="business.id" class="flex flex-col gap-3">
          <h2 :class="TextStyles.siteHeadlineMd">{{ business.name }}</h2>
          <p :class="[TextStyles.siteBodyLg, 'whitespace-pre-line']">{{ business.about }}</p>
        </article>
      </div>
    </section>

    <section class="mx-auto flex max-w-site flex-wrap justify-center gap-3 px-6 md:px-12 py-14">
      <AppSiteButton :to="SiteRoutes.contact">Visit us</AppSiteButton>
      <AppSiteButton :to="SiteRoutes.gallery" variant="outline">{{
        AppStrings.site.viewGallery
      }}</AppSiteButton>
    </section>
  </div>
</template>
