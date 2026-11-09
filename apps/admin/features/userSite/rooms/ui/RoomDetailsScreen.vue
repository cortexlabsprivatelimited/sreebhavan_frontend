<script setup lang="ts">
import { SiteRoutes } from '~/common/constants/userSiteNavigation';
import { TextStyles } from '~/common/styles/textStyles';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import { useRoomDetailsController } from '../controller/useRoomDetailsController';
import RoomDetailsGallery from './widgets/RoomDetailsGallery.vue';
import RoomDetailsSummary from './widgets/RoomDetailsSummary.vue';

const props = defineProps<{ slug: string }>();

const {
  room,
  selectedImage,
  selectedImageIndex,
  enquiryLink,
  whatsAppUrl,
  isLoading,
  hasError,
  reloadRoom,
} = await useRoomDetailsController(props.slug);
</script>

<template>
  <section class="mx-auto max-w-site px-6 md:px-12 pb-14 pt-32 lg:px-20 md:pt-36">
    <NuxtLink :to="SiteRoutes.rooms" :class="[TextStyles.siteArrowLink, 'mb-6 inline-block']">
      ← All rooms
    </NuxtLink>
    <AppLoader v-if="isLoading" />
    <AppErrorState v-else-if="hasError || !room" @retry="reloadRoom" />
    <div v-else class="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
      <RoomDetailsGallery
        :room="room"
        :selected-image="selectedImage"
        :selected-index="selectedImageIndex"
        @select-image="selectedImageIndex = $event"
      />
      <RoomDetailsSummary :room="room" :enquiry-link="enquiryLink" :whats-app-url="whatsAppUrl" />
    </div>
  </section>
</template>
