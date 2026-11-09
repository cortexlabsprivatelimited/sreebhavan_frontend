<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { SiteRoutes } from '~/common/constants/userSiteNavigation';
import { TextStyles } from '~/common/styles/textStyles';
import AppSiteButton from '~/common/widgets/userSite/AppSiteButton.vue';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppSitePageHero from '~/common/widgets/userSite/AppSitePageHero.vue';
import AppSiteRoomCard from '~/common/widgets/userSite/AppSiteRoomCard.vue';
import AppSiteSectionHeading from '~/common/widgets/userSite/AppSiteSectionHeading.vue';
import AppSiteTestimonialCard from '~/common/widgets/userSite/AppSiteTestimonialCard.vue';
import { useSreebhavanamController } from '../controller/useSreebhavanamController';
import SreebhavanamHallBand from './widgets/SreebhavanamHallBand.vue';

const { content, heroOffer, isLoading, hasError, reloadContent } = useSreebhavanamController();
</script>

<template>
  <div>
    <AppSitePageHero
      eyebrow="Event Hall & Rooms"
      :title="content.business?.name ?? AppStrings.businesses.hallAndRooms"
      :subtitle="heroOffer?.subtitle ?? 'Stay, celebrate and make memories with your family.'"
      :image-url="heroOffer?.imageUrl"
      :image-alt="heroOffer?.title ?? ''"
      size="lg"
    >
      <AppSiteButton :to="SiteRoutes.rooms">{{ AppStrings.site.viewRooms }}</AppSiteButton>
      <AppSiteButton :to="SiteRoutes.eventHall" variant="outline">{{
        AppStrings.site.viewHall
      }}</AppSiteButton>
    </AppSitePageHero>

    <AppLoader v-if="isLoading" />
    <AppErrorState v-else-if="hasError" @retry="reloadContent" />
    <template v-else>
      <section
        v-if="content.business?.about"
        class="mx-auto max-w-3xl px-4 py-14 text-center lg:py-20"
      >
        <p :class="[TextStyles.siteEyebrow, 'mb-3']">About Sreebhavanam</p>
        <p :class="[TextStyles.siteQuote, 'whitespace-pre-line']">{{ content.business.about }}</p>
      </section>

      <section class="mx-auto max-w-site px-6 md:px-12 pb-16 lg:px-20">
        <SreebhavanamHallBand :hall="content.hall" />
      </section>

      <section v-if="content.rooms.length" class="mx-auto max-w-site px-6 md:px-12 pb-16 lg:px-20">
        <AppSiteSectionHeading eyebrow="Rooms" title="Rest well after the celebrations" />
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AppSiteRoomCard v-for="room in content.rooms" :key="room.id" :room="room" />
        </div>
        <AppSiteButton :to="SiteRoutes.rooms" variant="outline" class="mt-8">
          {{ AppStrings.site.viewRooms }} →
        </AppSiteButton>
      </section>

      <section v-if="content.testimonials.length" class="bg-surfaceMuted py-16">
        <div class="mx-auto max-w-site px-6 md:px-12 lg:px-20">
          <AppSiteSectionHeading :title="AppStrings.site.whatGuestsSay" eyebrow="Reviews" />
          <div class="grid gap-6 md:grid-cols-3">
            <AppSiteTestimonialCard
              v-for="testimonial in content.testimonials"
              :key="testimonial.id"
              :testimonial="testimonial"
            />
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
