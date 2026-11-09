<script setup lang="ts">
import { usePageSeo } from '~/common/controllers/usePageSeo';
import type { PublicRoom } from '~/common/types/userSite';
import { roomDetailsKey } from '~/features/userSite/rooms/controller/useRoomDetailsController';
import RoomDetailsScreen from '~/features/userSite/rooms/ui/RoomDetailsScreen.vue';

const route = useRoute();
const slug = computed(() => String(route.params.slug));
// The screen loads the room under this key; reuse it for the fallback title.
const { data: room } = useNuxtData<PublicRoom | null>(roomDetailsKey(slug.value));

useSeoMeta(
  usePageSeo(
    () => `room/${slug.value}`,
    () => ({
      title: room.value ? `${room.value.name} · Sreebhavanam` : 'Room · Sreebhavanam',
      description:
        room.value?.description?.slice(0, 160) ??
        'Comfortable room at Sreebhavanam. Check the price, amenities and photos, and enquire on WhatsApp.',
    }),
  ),
);
</script>

<template>
  <RoomDetailsScreen :key="slug" :slug="slug" />
</template>
