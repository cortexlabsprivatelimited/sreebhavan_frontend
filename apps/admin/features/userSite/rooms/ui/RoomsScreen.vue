<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import AppEmptyState from '~/common/widgets/AppEmptyState.vue';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppSitePageHero from '~/common/widgets/userSite/AppSitePageHero.vue';
import AppSiteRoomCard from '~/common/widgets/userSite/AppSiteRoomCard.vue';
import { useRoomsController } from '../controller/useRoomsController';

const { rooms, isLoading, hasError, isEmpty, reloadRooms } = useRoomsController();
</script>

<template>
  <div>
    <AppSitePageHero
      :eyebrow="AppStrings.businesses.hallAndRooms"
      title="Our"
      title-accent="rooms"
      subtitle="Comfortable AC and non-AC rooms at Sreebhavanam. Check prices and enquire in a minute."
    />
    <section class="mx-auto max-w-site px-6 md:px-12 py-12 lg:px-20 lg:py-16">
      <AppLoader v-if="isLoading" />
      <AppErrorState v-else-if="hasError" @retry="reloadRooms" />
      <AppEmptyState v-else-if="isEmpty" message="Rooms will be listed here soon." />
      <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AppSiteRoomCard v-for="room in rooms" :key="room.id" :room="room" />
      </div>
    </section>
  </div>
</template>
