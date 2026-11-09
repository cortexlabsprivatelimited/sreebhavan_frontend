<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { SiteRoutes } from '~/common/constants/userSiteNavigation';
import { TextStyles } from '~/common/styles/textStyles';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppSiteArrowLink from '~/common/widgets/userSite/AppSiteArrowLink.vue';
import AppSiteSectionHeading from '~/common/widgets/userSite/AppSiteSectionHeading.vue';
import AppSiteTestimonialCard from '~/common/widgets/userSite/AppSiteTestimonialCard.vue';
import { useHomeController } from '../controller/useHomeController';
import { HomeBrands } from '../model/home.model';
import HomeBrandCard from './widgets/HomeBrandCard.vue';
import HomeEventBanner from './widgets/HomeEventBanner.vue';
import HomeGroupStory from './widgets/HomeGroupStory.vue';
import HomeHero from './widgets/HomeHero.vue';
import HomeSpecialsGrid from './widgets/HomeSpecialsGrid.vue';

const {
  homeContent,
  hotel,
  hallAndRooms,
  quickAvailabilityForm,
  submitQuickAvailability,
  isLoading,
  hasError,
  reloadHomeContent,
} = useHomeController();
</script>

<template>
  <div>
    <HomeHero
      v-model:quick-availability-form="quickAvailabilityForm"
      @check-availability="submitQuickAvailability"
    />

    <section class="mx-auto max-w-site px-6 py-20 md:px-12 lg:px-20 lg:py-28">
      <HomeGroupStory :room-count="homeContent.roomCount" />
    </section>

    <section class="mx-auto max-w-site px-6 pb-20 md:px-12 lg:px-20 lg:pb-28">
      <AppSiteSectionHeading
        eyebrow="Our brands"
        title="Two experiences,"
        title-accent="one family"
        description="Come hungry to the Veg Hotel, or bring the whole family to Sreebhavanam."
      />
      <div class="grid gap-6 lg:grid-cols-2">
        <HomeBrandCard
          v-for="brand in HomeBrands"
          :key="brand.businessKey"
          :brand="brand"
          :business="brand.businessKey === 'hotel' ? hotel : hallAndRooms"
        />
      </div>
    </section>

    <AppLoader v-if="isLoading" />
    <AppErrorState v-else-if="hasError" @retry="reloadHomeContent" />
    <template v-else>
      <section
        v-if="homeContent.specials.length"
        class="mb-20 bg-surfaceMuted py-20 lg:mb-28 lg:py-28"
      >
        <div class="mx-auto max-w-site px-6 md:px-12 lg:px-20">
          <div class="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <AppSiteSectionHeading
              eyebrow="Fresh from our kitchen"
              title="Today's"
              title-accent="specials"
              description="Freshly made today in our pure vegetarian kitchen."
              :is-centered="false"
              is-flush
            />
            <span
              :class="[
                TextStyles.siteChip,
                'self-start rounded-full border border-siteHairlineGold bg-background px-4 py-2 text-secondaryDark md:self-auto',
              ]"
            >
              {{ AppStrings.site.pureVeg }}
            </span>
          </div>
          <HomeSpecialsGrid :specials="homeContent.specials" />
          <div class="mt-8 flex justify-center">
            <AppSiteArrowLink :to="SiteRoutes.menu">See the full menu</AppSiteArrowLink>
          </div>
        </div>
      </section>

      <section
        v-if="homeContent.testimonials.length"
        class="mx-auto max-w-site px-6 pb-20 md:px-12 lg:px-20 lg:pb-28"
      >
        <AppSiteSectionHeading
          eyebrow="Guest stories"
          title="Words from our"
          title-accent="guests"
          description="Families come back to Sreebhavan for honest food, clean rooms and celebrations handled with care."
        />
        <div class="grid gap-6 md:grid-cols-3">
          <AppSiteTestimonialCard
            v-for="testimonial in homeContent.testimonials"
            :key="testimonial.id"
            :testimonial="testimonial"
          />
        </div>
      </section>

      <section class="mx-auto max-w-site px-6 pb-20 md:px-12 lg:px-20 lg:pb-28">
        <HomeEventBanner />
      </section>
    </template>
  </div>
</template>
