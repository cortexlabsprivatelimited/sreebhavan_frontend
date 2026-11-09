<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import AppIcon from '~/common/widgets/AppIcon.vue';

/** WhatsApp pill. `url` is a wa.me link (buildWhatsAppUrl or the API's whatsapp_url). */
withDefaults(defineProps<{ url: string; label?: string }>(), {
  label: AppStrings.site.whatsAppUs,
});
</script>

<template>
  <a
    :href="url"
    target="_blank"
    rel="noopener"
    :class="[
      TextStyles.siteButton,
      'inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-7 py-3 text-textOnPrimary transition hover:-translate-y-px hover:opacity-95',
    ]"
  >
    <AppIcon name="whatsapp" class="h-5 w-5" />{{ label }}
  </a>
</template>
