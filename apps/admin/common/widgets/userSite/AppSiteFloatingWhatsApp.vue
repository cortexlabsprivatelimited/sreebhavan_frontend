<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import AppIcon from '~/common/widgets/AppIcon.vue';

defineProps<{ url: string }>();
</script>

<template>
  <a
    :href="url"
    target="_blank"
    rel="noopener"
    :aria-label="AppStrings.site.whatsAppUs"
    class="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-textOnPrimary shadow-siteFloat transition hover:scale-105"
  >
    <AppIcon name="whatsapp" class="h-7 w-7" />
  </a>
</template>
