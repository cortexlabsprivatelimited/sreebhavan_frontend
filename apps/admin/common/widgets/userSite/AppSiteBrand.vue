<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import AppIcon from '~/common/widgets/AppIcon.vue';

/** Brand crest + name. `isOnDark` for the footer. */
defineProps<{ logoUrl: string | null; isOnDark?: boolean }>();
</script>

<template>
  <span class="flex items-center gap-3">
    <NuxtImg
      v-if="logoUrl"
      :src="logoUrl"
      :alt="AppStrings.siteName"
      class="h-11 w-11 rounded-full object-contain"
    />
    <span
      v-else
      :class="[
        'flex h-11 w-11 items-center justify-center rounded-full border',
        isOnDark
          ? 'border-secondary/40 text-secondary'
          : 'border-siteHairlineGold bg-secondaryLight text-secondaryDark',
      ]"
    >
      <AppIcon name="lotus" :stroke-width="1.4" class="h-6 w-6" />
    </span>
    <span class="flex flex-col gap-1">
      <span :class="isOnDark ? TextStyles.siteFooterBrand : TextStyles.siteBrandName">
        {{ AppStrings.siteName }}
      </span>
      <span :class="TextStyles.siteBrandTagline">{{ AppStrings.siteTagline }}</span>
    </span>
  </span>
</template>
