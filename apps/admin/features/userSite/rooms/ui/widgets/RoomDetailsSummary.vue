<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import { formatPrice } from '~/common/utils/formatPrice';
import AppSiteButton from '~/common/widgets/userSite/AppSiteButton.vue';
import AppIcon from '~/common/widgets/AppIcon.vue';
import AppSiteFeatureList from '~/common/widgets/userSite/AppSiteFeatureList.vue';
import AppSiteWhatsAppButton from '~/common/widgets/userSite/AppSiteWhatsAppButton.vue';
import type { Room } from '../../model/rooms.model';

defineProps<{ room: Room; enquiryLink: string; whatsAppUrl: string | null }>();
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-3">
      <p :class="TextStyles.siteEyebrow">{{ AppStrings.businesses.hallAndRooms }}</p>
      <h1 :class="TextStyles.siteDisplay">{{ room.name }}</h1>
      <p :class="[TextStyles.siteBodyLg, 'flex items-center gap-2']">
        <AppIcon name="guests" class="h-5 w-5 text-primary" />
        {{ AppStrings.site.upToGuests(room.capacity) }}
      </p>
    </div>
    <p>
      <span :class="TextStyles.siteBigPrice">{{ formatPrice(room.pricePerNight) }}</span>
      <span :class="TextStyles.siteBodyLg"> {{ AppStrings.site.perNight }}</span>
    </p>
    <p v-if="room.description" :class="[TextStyles.siteBodyLg, 'whitespace-pre-line']">
      {{ room.description }}
    </p>
    <div v-if="room.amenities.length" class="flex flex-col gap-3">
      <h2 :class="TextStyles.siteHeadlineSm">Amenities</h2>
      <AppSiteFeatureList :items="room.amenities" />
    </div>
    <div class="flex flex-wrap gap-3 border-t border-siteHairline pt-6">
      <AppSiteButton :to="enquiryLink">{{ AppStrings.site.sendEnquiry }}</AppSiteButton>
      <AppSiteWhatsAppButton v-if="whatsAppUrl" :url="whatsAppUrl" />
    </div>
  </div>
</template>
