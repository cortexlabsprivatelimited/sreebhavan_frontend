<script setup lang="ts">
import AppSitePageHero from '~/common/widgets/userSite/AppSitePageHero.vue';
import EnquirySectionScreen from './EnquirySectionScreen.vue';
</script>

<template>
  <div class="pb-20 lg:pb-28">
    <AppSitePageHero
      eyebrow="Enquiry"
      title="Send us an"
      title-accent="enquiry"
      subtitle="Weddings, functions, room stays or a question about the hotel: tell us what you need and we will get back to you quickly."
    />
    <EnquirySectionScreen />
  </div>
</template>
