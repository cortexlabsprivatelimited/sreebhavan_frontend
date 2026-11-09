<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import AppEmptyState from '~/common/widgets/AppEmptyState.vue';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppSitePageHero from '~/common/widgets/userSite/AppSitePageHero.vue';
import { useMenuController } from '../controller/useMenuController';
import MenuCategoryTabs from './widgets/MenuCategoryTabs.vue';
import MenuSectionCard from './widgets/MenuSectionCard.vue';
import MenuToolbar from './widgets/MenuToolbar.vue';

const {
  menuContent,
  menuSections,
  searchText,
  isSpecialsOnly,
  selectedCategorySlug,
  selectCategory,
  isLoading,
  hasError,
  isEmpty,
  hasNoMatches,
  reloadMenu,
} = useMenuController();
</script>

<template>
  <div>
    <AppSitePageHero
      :eyebrow="AppStrings.businesses.hotel"
      title="Our"
      title-accent="menu"
      subtitle="Kerala breakfast, full meals, snacks and sweets. Prices include taxes."
    />

    <section class="mx-auto max-w-6xl px-4 py-10 lg:px-8 lg:py-14">
      <AppLoader v-if="isLoading" />
      <AppErrorState v-else-if="hasError" @retry="reloadMenu" />
      <AppEmptyState v-else-if="isEmpty" message="The menu will be published here soon." />
      <div v-else class="flex flex-col gap-6">
        <MenuToolbar
          v-model:search-text="searchText"
          v-model:is-specials-only="isSpecialsOnly"
          :menu-cards="menuContent.menuCards"
        />
        <MenuCategoryTabs
          :categories="menuContent.categories"
          :selected-slug="selectedCategorySlug"
          @select-category="selectCategory"
        />
        <AppEmptyState v-if="hasNoMatches" message="No dishes match your search." />
        <MenuSectionCard
          v-for="section in menuSections"
          :key="section.category.id"
          :section="section"
        />
      </div>
    </section>
  </div>
</template>
