<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppSitePageHero from '~/common/widgets/userSite/AppSitePageHero.vue';
import AppSiteSectionHeading from '~/common/widgets/userSite/AppSiteSectionHeading.vue';
import AppSiteTestimonialCard from '~/common/widgets/userSite/AppSiteTestimonialCard.vue';
import { useHotelController } from '../controller/useHotelController';
import HotelHighlightTiles from './widgets/HotelHighlightTiles.vue';
import HotelVisitCard from './widgets/HotelVisitCard.vue';

const { hotelContent, heroOffer, whatsAppUrl, isLoading, hasError, reloadHotelContent } =
  useHotelController();
</script>

<template>
  <div>
    <AppSitePageHero
      :eyebrow="AppStrings.site.pureVeg"
      :title="hotelContent.business?.name ?? AppStrings.businesses.hotel"
      :subtitle="heroOffer?.subtitle ?? 'Authentic Kerala vegetarian food, made fresh every day.'"
      :image-url="heroOffer?.imageUrl"
      :image-alt="heroOffer?.title ?? ''"
    />

    <AppLoader v-if="isLoading" />
    <AppErrorState v-else-if="hasError" @retry="reloadHotelContent" />
    <template v-else>
      <section
        class="mx-auto grid max-w-site gap-10 px-6 md:px-12 py-14 lg:grid-cols-[1fr_360px] lg:px-20 lg:py-20"
      >
        <div class="flex flex-col gap-8">
          <div>
            <AppSiteSectionHeading eyebrow="About us" title="Simple food, made with care" />
            <p :class="[TextStyles.siteBodyLg, 'whitespace-pre-line']">
              {{
                hotelContent.business?.about ??
                'Sreebhavan Veg Hotel serves traditional Kerala vegetarian food: crisp dosas and idlis in the morning, full meals at noon and hot snacks in the evening.'
              }}
            </p>
          </div>
          <HotelHighlightTiles />
        </div>
        <HotelVisitCard
          :business="hotelContent.business"
          :menu-cards="hotelContent.menuCards"
          :whats-app-url="whatsAppUrl"
        />
      </section>

      <section v-if="hotelContent.testimonials.length" class="bg-surfaceMuted py-16">
        <div class="mx-auto max-w-site px-6 md:px-12 lg:px-20">
          <AppSiteSectionHeading :title="AppStrings.site.whatGuestsSay" eyebrow="Reviews" />
          <div class="grid gap-6 md:grid-cols-3">
            <AppSiteTestimonialCard
              v-for="testimonial in hotelContent.testimonials"
              :key="testimonial.id"
              :testimonial="testimonial"
            />
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
