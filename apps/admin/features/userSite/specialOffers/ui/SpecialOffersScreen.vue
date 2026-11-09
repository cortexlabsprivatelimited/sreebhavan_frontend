<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import AppEmptyState from '~/common/widgets/AppEmptyState.vue';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppSitePageHero from '~/common/widgets/userSite/AppSitePageHero.vue';
import { useSpecialOffersController } from '../controller/useSpecialOffersController';
import SpecialOffersCard from './widgets/SpecialOffersCard.vue';

const { specialOffers, isLoading, hasError, isEmpty, reloadSpecialOffers } =
  useSpecialOffersController();
</script>

<template>
  <div>
    <AppSitePageHero
      :eyebrow="AppStrings.site.specialOffers"
      title="Offers you"
      title-accent="shouldn't miss"
      subtitle="Current deals on dining, room stays and the event hall. Enquire early, offers run for a limited time."
    />
    <section class="mx-auto max-w-site px-6 pb-20 md:px-12 lg:px-20 lg:pb-28">
      <AppLoader v-if="isLoading" />
      <AppErrorState v-else-if="hasError" @retry="reloadSpecialOffers" />
      <AppEmptyState
        v-else-if="isEmpty"
        message="No offers running right now. Please check back soon."
      />
      <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <SpecialOffersCard
          v-for="specialOffer in specialOffers"
          :key="specialOffer.id"
          :special-offer="specialOffer"
        />
      </div>
    </section>
  </div>
</template>
