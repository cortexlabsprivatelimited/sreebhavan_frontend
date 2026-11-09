<script setup lang="ts">
import type { AppIconName } from '~/common/constants/appIcons';
import { AppStrings } from '~/common/constants/appStrings';
import type { SiteNavItem } from '~/common/constants/userSiteNavigation';
import { TextStyles } from '~/common/styles/textStyles';
import type { PublicBusiness, PublicSiteSettings } from '~/common/types/userSite';
import AppIcon from '~/common/widgets/AppIcon.vue';
import AppSiteBrand from '~/common/widgets/userSite/AppSiteBrand.vue';

const props = defineProps<{
  settings: PublicSiteSettings;
  businesses: PublicBusiness[];
  linkGroups: { title: string; items: SiteNavItem[] }[];
  phone: string | null;
}>();

const socialLinks = computed(() =>
  (
    [
      { label: 'Facebook', icon: 'facebook', url: props.settings.facebookUrl },
      { label: 'Instagram', icon: 'instagram', url: props.settings.instagramUrl },
      { label: 'YouTube', icon: 'youtube', url: props.settings.youtubeUrl },
    ] satisfies { label: string; icon: AppIconName; url: string | null }[]
  ).filter((link) => Boolean(link.url)),
);

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="bg-siteFooter">
    <div
      class="mx-auto grid max-w-site gap-12 px-6 py-16 md:px-12 lg:grid-cols-[1.5fr_repeat(4,1fr)] lg:px-20"
    >
      <div class="flex flex-col gap-5">
        <AppSiteBrand :logo-url="settings.brandLogoUrl" is-on-dark />
        <p :class="[TextStyles.siteFooterText, 'max-w-xs']">
          Pure vegetarian Kerala cuisine, restful rooms and a grand hall for your celebrations.
        </p>
        <div v-if="socialLinks.length" class="flex gap-2">
          <a
            v-for="link in socialLinks"
            :key="link.label"
            :href="link.url ?? undefined"
            :aria-label="link.label"
            target="_blank"
            rel="noopener"
            class="flex h-10 w-10 items-center justify-center rounded-full border border-textOnPrimary/15 text-textOnPrimary/80 transition hover:border-secondary hover:text-secondary"
          >
            <AppIcon :name="link.icon" class="h-4 w-4" />
          </a>
        </div>
      </div>

      <nav v-for="group in linkGroups" :key="group.title" :aria-label="group.title">
        <h2 :class="[TextStyles.siteFooterTitle, 'mb-5']">{{ group.title }}</h2>
        <ul class="flex flex-col gap-3">
          <li v-for="item in group.items" :key="item.to">
            <NuxtLink :to="item.to" :class="TextStyles.siteFooterLink">{{ item.label }}</NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="flex flex-col gap-3">
        <h2 :class="[TextStyles.siteFooterTitle, 'mb-2']">Get in touch</h2>
        <p v-if="settings.address" :class="[TextStyles.siteFooterText, 'whitespace-pre-line']">
          {{ settings.address }}
        </p>
        <a
          v-if="settings.contactEmail"
          :href="`mailto:${settings.contactEmail}`"
          :class="TextStyles.siteFooterLink"
        >
          {{ settings.contactEmail }}
        </a>
        <a v-if="phone" :href="`tel:${phone}`" :class="TextStyles.siteFooterLink">{{ phone }}</a>
        <p v-for="business in businesses" :key="business.id" :class="TextStyles.siteFooterCaption">
          <template v-for="timing in business.timings" :key="timing.label">
            {{ business.name }}: {{ timing.label }}, {{ timing.hours }}<br />
          </template>
        </p>
      </div>
    </div>
    <div class="border-t border-textOnPrimary/10">
      <div
        class="mx-auto flex max-w-site flex-col gap-2 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-12 lg:px-20"
      >
        <p :class="TextStyles.siteFooterCaption">
          {{
            settings.footerText ?? `© ${currentYear} ${AppStrings.siteName}. All rights reserved.`
          }}
        </p>
        <p :class="[TextStyles.siteFooterCaption, 'flex items-center gap-2']">
          <AppIcon name="leaf" class="h-3.5 w-3.5 text-secondary" />{{ AppStrings.site.pureVeg }}
        </p>
      </div>
    </div>
  </footer>
</template>
