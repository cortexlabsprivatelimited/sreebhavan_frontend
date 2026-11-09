<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { SiteRoutes, type SiteNavItem } from '~/common/constants/userSiteNavigation';
import { TextStyles } from '~/common/styles/textStyles';
import AppIcon from '~/common/widgets/AppIcon.vue';
import AppSiteBrand from '~/common/widgets/userSite/AppSiteBrand.vue';
import AppSiteButton from '~/common/widgets/userSite/AppSiteButton.vue';
import AppSiteOffersLink from '~/common/widgets/userSite/AppSiteOffersLink.vue';

/** Floating glass "island" header suspended 1rem below the top edge (DESIGN.md). */
const props = defineProps<{
  navItems: SiteNavItem[];
  phone: string | null;
  logoUrl: string | null;
  /** Active special offers; the hot-deal "Offers" link only shows when there is at least one. */
  offerCount: number;
}>();

const route = useRoute();
const isMenuOpen = ref(false);

/** The nav item with the longest matching path is active (Menu wins over Veg Hotel on /menu). */
const activeLink = computed(() => {
  const matches = props.navItems.filter((item) =>
    item.to === SiteRoutes.home
      ? route.path === SiteRoutes.home
      : route.path === item.to || route.path.startsWith(`${item.to}/`),
  );
  return matches.sort((first, second) => second.to.length - first.to.length)[0]?.to ?? null;
});

watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false;
  },
);
</script>

<template>
  <header class="fixed inset-x-0 top-3 z-40 px-3 md:top-4 md:px-6">
    <div
      class="mx-auto max-w-site rounded-[2rem] border border-siteHairlineGold bg-siteGlass shadow-siteFloat backdrop-blur-xl"
    >
      <div class="flex h-16 items-center justify-between gap-4 pl-4 pr-2.5 md:h-[72px] md:pl-6">
        <NuxtLink :to="SiteRoutes.home" :aria-label="AppStrings.siteName">
          <AppSiteBrand :logo-url="logoUrl" />
        </NuxtLink>

        <nav class="hidden items-center gap-0.5 xl:flex" aria-label="Main">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            :class="[
              TextStyles.siteNavLink,
              'relative rounded-full px-3.5 py-2 transition',
              activeLink === item.to ? 'text-primary' : 'text-textSecondary hover:text-primary',
            ]"
          >
            {{ item.label }}
            <span
              v-if="activeLink === item.to"
              class="absolute inset-x-3.5 -bottom-0.5 h-px bg-secondary"
              aria-hidden="true"
            />
          </NuxtLink>
          <AppSiteOffersLink v-if="offerCount" :offer-count="offerCount" class="ml-2" />
        </nav>

        <div class="flex items-center gap-2">
          <AppSiteOffersLink
            v-if="offerCount"
            :offer-count="offerCount"
            is-compact
            class="xl:hidden"
          />
          <a
            v-if="phone"
            :href="`tel:${phone}`"
            :aria-label="AppStrings.site.callUs"
            class="flex h-11 w-11 items-center justify-center rounded-full border border-siteHairlineStrong text-primary transition hover:bg-primaryLight"
          >
            <AppIcon name="phone" class="h-[18px] w-[18px]" />
          </a>
          <AppSiteButton :to="SiteRoutes.enquiry" has-arrow class="hidden sm:inline-flex">
            {{ AppStrings.site.enquireAndBook }}
          </AppSiteButton>
          <button
            type="button"
            :aria-label="isMenuOpen ? AppStrings.actions.close : 'Open menu'"
            :aria-expanded="isMenuOpen"
            class="flex h-11 w-11 items-center justify-center rounded-full text-textPrimary transition hover:bg-primaryLight xl:hidden"
            @click="isMenuOpen = !isMenuOpen"
          >
            <AppIcon :name="isMenuOpen ? 'close' : 'hamburger'" class="h-6 w-6" />
          </button>
        </div>
      </div>

      <nav
        v-if="isMenuOpen"
        class="border-t border-siteHairline px-4 pb-5 pt-2 xl:hidden"
        aria-label="Mobile"
      >
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :class="[
            TextStyles.siteNavLink,
            'block rounded-2xl px-4 py-3 transition',
            activeLink === item.to
              ? 'bg-primaryLight text-primary'
              : 'text-textPrimary hover:bg-surfaceMuted',
          ]"
        >
          {{ item.label }}
        </NuxtLink>
        <AppSiteButton :to="SiteRoutes.enquiry" has-arrow class="mt-3 w-full">
          {{ AppStrings.site.enquireAndBook }}
        </AppSiteButton>
      </nav>
    </div>
  </header>
</template>
