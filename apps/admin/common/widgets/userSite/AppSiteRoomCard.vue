<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { ImageConstants } from '~/common/constants/imageConstants';
import { SiteRoutes } from '~/common/constants/userSiteNavigation';
import { TextStyles } from '~/common/styles/textStyles';
import type { PublicRoom } from '~/common/types/userSite';
import { formatPrice } from '~/common/utils/formatPrice';
import AppIcon from '~/common/widgets/AppIcon.vue';
import AppSiteArrowLink from '~/common/widgets/userSite/AppSiteArrowLink.vue';

/** Room card used by the rooms list, the home page and the Sreebhavanam overview. */
defineProps<{ room: PublicRoom }>();
</script>

<template>
  <article
    class="group flex flex-col overflow-hidden rounded-3xl border border-siteHairline bg-background shadow-siteCard transition hover:shadow-siteFloat"
  >
    <NuxtLink :to="SiteRoutes.roomBySlug(room.slug)" class="relative block overflow-hidden">
      <NuxtImg
        :src="room.coverImageUrl ?? ImageConstants.placeholders.image"
        :alt="room.coverImageAlt"
        format="webp"
        loading="lazy"
        class="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
      />
      <span
        :class="[
          TextStyles.siteChip,
          'absolute left-4 top-4 rounded-full border border-siteHairlineGold bg-siteGlass px-3 py-1.5 text-primary backdrop-blur-md',
        ]"
      >
        {{ formatPrice(room.pricePerNight) }} {{ AppStrings.site.perNight }}
      </span>
    </NuxtLink>
    <div class="flex flex-1 flex-col gap-3 p-6">
      <h3 :class="TextStyles.siteHeadlineSm">
        <NuxtLink :to="SiteRoutes.roomBySlug(room.slug)" class="transition hover:text-primary">
          {{ room.name }}
        </NuxtLink>
      </h3>
      <p :class="[TextStyles.siteBody, 'flex items-center gap-2']">
        <AppIcon name="guests" class="h-4 w-4 text-secondary" />
        {{ AppStrings.site.upToGuests(room.capacity) }}
      </p>
      <ul v-if="room.amenities.length" class="flex flex-wrap gap-1.5">
        <li
          v-for="amenity in room.amenities.slice(0, 4)"
          :key="amenity"
          :class="[
            TextStyles.siteChip,
            'rounded-full bg-surfaceMuted px-2.5 py-1 text-textSecondary',
          ]"
        >
          {{ amenity }}
        </li>
      </ul>
      <div class="mt-auto border-t border-siteHairline pt-4">
        <AppSiteArrowLink :to="SiteRoutes.roomBySlug(room.slug)">
          {{ AppStrings.actions.viewDetails }}
        </AppSiteArrowLink>
      </div>
    </div>
  </article>
</template>
