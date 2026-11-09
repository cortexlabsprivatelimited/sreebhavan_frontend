<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { SiteRoutes } from '~/common/constants/userSiteNavigation';
import AppSiteButton from '~/common/widgets/userSite/AppSiteButton.vue';
import AppEmptyState from '~/common/widgets/AppEmptyState.vue';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppSitePageHero from '~/common/widgets/userSite/AppSitePageHero.vue';
import AppSiteSectionHeading from '~/common/widgets/userSite/AppSiteSectionHeading.vue';
import { useEventHallController } from '../controller/useEventHallController';
import EventHallOverview from './widgets/EventHallOverview.vue';
import EventHallPackages from './widgets/EventHallPackages.vue';
import EventHallPhotoGrid from './widgets/EventHallPhotoGrid.vue';

const { content, heroImage, enquiryLink, isLoading, hasError, isEmpty, reloadContent } =
  useEventHallController();
</script>

<template>
  <div>
    <AppSitePageHero
      :eyebrow="AppStrings.businesses.hallAndRooms"
      :title="content.hall?.name ?? 'Event Hall'"
      subtitle="Weddings, receptions, engagements and family functions, with seating for hundreds of guests."
      :image-url="heroImage?.url"
      :image-alt="heroImage?.alt ?? ''"
      size="lg"
    >
      <AppSiteButton :to="SiteRoutes.hallAvailability">{{
        AppStrings.actions.checkAvailability
      }}</AppSiteButton>
      <AppSiteButton :to="enquiryLink" variant="outline">{{
        AppStrings.site.sendEnquiry
      }}</AppSiteButton>
    </AppSitePageHero>

    <div class="mx-auto flex max-w-site flex-col gap-16 px-6 md:px-12 py-14 lg:px-20 lg:py-20">
      <AppLoader v-if="isLoading" />
      <AppErrorState v-else-if="hasError" @retry="reloadContent" />
      <AppEmptyState v-else-if="isEmpty" message="Hall details will be published here soon." />
      <template v-else>
        <EventHallOverview v-if="content.hall" :hall="content.hall" />
        <section v-if="content.packages.length">
          <AppSiteSectionHeading
            eyebrow="Packages"
            title="Choose a package"
            description="Prices are for the hall. Tell us your plans and we will tailor the rest."
          />
          <EventHallPackages :packages="content.packages" />
        </section>
        <section v-if="content.hall && content.hall.images.length > 1">
          <AppSiteSectionHeading eyebrow="Photos" title="Inside the hall" />
          <EventHallPhotoGrid :images="content.hall.images" />
        </section>
      </template>
    </div>
  </div>
</template>
