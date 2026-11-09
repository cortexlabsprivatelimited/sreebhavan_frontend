<script setup lang="ts">
import type { AppIconName } from '~/common/constants/appIcons';
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import type { BusinessTiming } from '~/common/types/userSite';
import AppIcon from '~/common/widgets/AppIcon.vue';

/** Sapphire side panel of the enquiry card: where we are, how to call, when we're open. */
const props = defineProps<{
  address: string | null;
  phone: string | null;
  whatsAppUrl: string | null;
  timings: (BusinessTiming & { business: string })[];
}>();

const infoItems = computed(() =>
  (
    [
      { icon: 'mapPin', title: 'Find us', lines: props.address ? [props.address] : [] },
      { icon: 'phone', title: 'Call or WhatsApp', lines: props.phone ? [props.phone] : [] },
      {
        icon: 'clock',
        title: 'Opening hours',
        lines: props.timings.map(
          (timing) => `${timing.business}: ${timing.label}, ${timing.hours}`,
        ),
      },
    ] satisfies { icon: AppIconName; title: string; lines: string[] }[]
  ).filter((item) => item.lines.length > 0),
);
</script>

<template>
  <div class="relative flex h-full flex-col gap-8 overflow-hidden bg-primary p-8 md:p-10">
    <AppIcon
      name="lotus"
      :stroke-width="0.6"
      class="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 text-secondary/15"
    />
    <div class="relative flex flex-col gap-4">
      <span
        :class="[
          TextStyles.siteEyebrow,
          'self-start rounded-full border border-secondary/40 px-3 py-1.5',
        ]"
      >
        Direct enquiry
      </span>
      <h2 :class="TextStyles.siteFooterBrand">
        Reserve your special date
        <span :class="TextStyles.siteAccentOnDark">or table</span>
      </h2>
      <p :class="TextStyles.siteFooterText">
        Tell us about your function, stay or visit to the hotel. We reply quickly by phone or
        WhatsApp, and nothing is charged online.
      </p>
    </div>
    <ul class="relative flex flex-col gap-5">
      <li v-for="item in infoItems" :key="item.title" class="flex gap-4">
        <span
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-textOnPrimary/10 text-secondary"
        >
          <AppIcon :name="item.icon" class="h-[18px] w-[18px]" />
        </span>
        <span class="flex flex-col gap-0.5">
          <span :class="TextStyles.siteInfoTitle">{{ item.title }}</span>
          <span
            v-for="line in item.lines"
            :key="line"
            :class="[TextStyles.siteInfoText, 'whitespace-pre-line']"
          >
            {{ line }}
          </span>
        </span>
      </li>
    </ul>
    <div
      class="relative mt-auto flex flex-wrap items-center gap-3 border-t border-textOnPrimary/10 pt-6"
    >
      <a
        v-if="whatsAppUrl"
        :href="whatsAppUrl"
        target="_blank"
        rel="noopener"
        :class="[
          TextStyles.siteButton,
          'inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-textOnPrimary transition hover:opacity-90',
        ]"
      >
        <AppIcon name="whatsapp" class="h-4 w-4" />{{ AppStrings.site.whatsAppUs }}
      </a>
      <span :class="[TextStyles.siteChip, 'flex items-center gap-1.5 text-secondary']">
        <AppIcon name="leaf" class="h-3.5 w-3.5" />{{ AppStrings.site.pureVeg }}
      </span>
    </div>
  </div>
</template>
