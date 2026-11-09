<script setup lang="ts">
import { SiteRoutes } from '~/common/constants/userSiteNavigation';
import { TextStyles } from '~/common/styles/textStyles';
import AppSiteButton from '~/common/widgets/userSite/AppSiteButton.vue';
import AppIcon from '~/common/widgets/AppIcon.vue';
import AppSiteWhatsAppButton from '~/common/widgets/userSite/AppSiteWhatsAppButton.vue';

defineProps<{ whatsAppUrl: string }>();
const emit = defineEmits<{ 'start-new-enquiry': [] }>();
</script>

<template>
  <div
    class="flex h-full flex-col items-center justify-center gap-5 py-10 text-center"
    role="status"
  >
    <span
      class="flex h-16 w-16 items-center justify-center rounded-full bg-primaryLight text-primary"
    >
      <AppIcon name="check" :stroke-width="3" class="h-8 w-8" />
    </span>
    <h2 :class="TextStyles.siteHeadline">Thank you, we got your enquiry</h2>
    <p :class="[TextStyles.siteBodyLg, 'max-w-md']">
      Our team will call you back soon. For a faster reply, send the details to us on WhatsApp; the
      message is already written for you.
    </p>
    <AppSiteWhatsAppButton :url="whatsAppUrl" label="Continue on WhatsApp" />
    <div class="flex flex-wrap justify-center gap-3">
      <AppSiteButton variant="ghost" @click="emit('start-new-enquiry')"
        >Send another enquiry</AppSiteButton
      >
      <AppSiteButton variant="ghost" :to="SiteRoutes.home">Back to home</AppSiteButton>
    </div>
  </div>
</template>
