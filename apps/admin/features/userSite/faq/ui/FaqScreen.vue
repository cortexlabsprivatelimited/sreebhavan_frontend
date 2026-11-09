<script setup lang="ts">
import { SiteRoutes } from '~/common/constants/userSiteNavigation';
import { TextStyles } from '~/common/styles/textStyles';
import AppEmptyState from '~/common/widgets/AppEmptyState.vue';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppTextField from '~/common/widgets/AppTextField.vue';
import AppSitePageHero from '~/common/widgets/userSite/AppSitePageHero.vue';
import { useFaqController } from '../controller/useFaqController';
import FaqAccordion from './widgets/FaqAccordion.vue';

const { visibleFaqs, searchText, openFaqId, toggleFaq, isLoading, hasError, isEmpty, reloadFaqs } =
  useFaqController();
</script>

<template>
  <div>
    <AppSitePageHero
      eyebrow="FAQs"
      title="Frequently asked"
      title-accent="questions"
      subtitle="Timings, bookings, the hall, rooms and more."
    />
    <section class="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-12 lg:py-16">
      <AppLoader v-if="isLoading" />
      <AppErrorState v-else-if="hasError" @retry="reloadFaqs" />
      <AppEmptyState v-else-if="isEmpty" message="FAQs will be added here soon." />
      <template v-else>
        <AppTextField
          :model-value="searchText"
          label="Search questions"
          placeholder="e.g. parking, hall capacity"
          @update:model-value="searchText = String($event ?? '')"
        />
        <AppEmptyState v-if="!visibleFaqs.length" message="No questions match your search." />
        <FaqAccordion v-else :faqs="visibleFaqs" :open-faq-id="openFaqId" @toggle-faq="toggleFaq" />
      </template>
      <p :class="[TextStyles.siteBody, 'text-center']">
        Didn't find your answer?
        <NuxtLink :to="SiteRoutes.contact" :class="TextStyles.siteArrowLink">Contact us</NuxtLink>
      </p>
    </section>
  </div>
</template>
