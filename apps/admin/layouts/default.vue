<!-- User site layout (every page without its own layout). Admin pages set layout: 'admin' or 'auth'. -->
<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { SiteFooterNavigation, SiteHeaderNavigation } from '~/common/constants/userSiteNavigation';
import { usePublicSpecialOffersState } from '~/common/controllers/usePublicSpecialOffersState';
import { usePublicSiteState } from '~/common/controllers/usePublicSiteState';
import type { PublicBusiness } from '~/common/types/userSite';
import AppSiteFloatingWhatsApp from '~/common/widgets/userSite/AppSiteFloatingWhatsApp.vue';
import AppSiteFooter from '~/common/widgets/userSite/AppSiteFooter.vue';
import AppSiteHeader from '~/common/widgets/userSite/AppSiteHeader.vue';

const { settings, hotel, hallAndRooms, hotelWhatsAppUrl, hallAndRoomsWhatsAppUrl, primaryPhone } =
  usePublicSiteState();
const { specialOffers } = usePublicSpecialOffersState();

const businesses = computed(() =>
  [hotel.value, hallAndRooms.value].filter((business): business is PublicBusiness =>
    Boolean(business),
  ),
);
const floatingWhatsAppUrl = computed(() => hallAndRoomsWhatsAppUrl.value ?? hotelWhatsAppUrl.value);

/** Only a real GA4 measurement id is put into the inline script. */
const analyticsId = computed(() => {
  const id = settings.value.googleAnalyticsId;
  return id && /^G-[A-Z0-9]+$/.test(id) ? id : null;
});

useHead({
  // Theme on <body> too, so the page background and overscroll use the user site colors.
  bodyAttrs: { class: 'theme-user-site' },
  titleTemplate: (title) =>
    !title || title.includes(AppStrings.siteName)
      ? (title ?? AppStrings.siteName)
      : `${title} · ${AppStrings.siteName}`,
  link: () =>
    settings.value.faviconUrl
      ? [{ key: 'favicon', rel: 'icon', href: settings.value.faviconUrl }]
      : [],
  meta: () =>
    settings.value.searchConsoleVerification
      ? [{ name: 'google-site-verification', content: settings.value.searchConsoleVerification }]
      : [],
  script: () =>
    analyticsId.value
      ? [
          {
            src: `https://www.googletagmanager.com/gtag/js?id=${analyticsId.value}`,
            async: true,
          },
          {
            innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${analyticsId.value}');`,
          },
        ]
      : [],
});
</script>

<template>
  <div class="theme-user-site flex min-h-screen flex-col bg-surface">
    <AppSiteHeader
      :nav-items="SiteHeaderNavigation"
      :phone="primaryPhone"
      :logo-url="settings.brandLogoUrl"
      :offer-count="specialOffers.length"
    />
    <main class="flex-1">
      <slot />
    </main>
    <AppSiteFooter
      :settings="settings"
      :businesses="businesses"
      :link-groups="SiteFooterNavigation"
      :phone="primaryPhone"
    />
    <AppSiteFloatingWhatsApp v-if="floatingWhatsAppUrl" :url="floatingWhatsAppUrl" />
  </div>
</template>
