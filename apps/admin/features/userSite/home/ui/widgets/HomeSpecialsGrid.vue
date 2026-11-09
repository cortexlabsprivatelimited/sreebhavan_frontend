<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';
import { formatPrice } from '~/common/utils/formatPrice';
import AppIcon from '~/common/widgets/AppIcon.vue';
import type { HomeSpecialDish } from '../../model/home.model';

defineProps<{ specials: HomeSpecialDish[] }>();
</script>

<template>
  <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    <article
      v-for="dish in specials"
      :key="dish.id"
      class="flex flex-col gap-3 rounded-3xl border border-siteHairline bg-background p-6 shadow-siteCard"
    >
      <div class="flex items-start justify-between gap-3">
        <h3 :class="[TextStyles.siteDishName, 'flex items-start gap-2']">
          <span
            class="mt-1.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center border border-success"
            aria-label="Vegetarian"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-success" />
          </span>
          {{ dish.name }}
        </h3>
        <span :class="[TextStyles.sitePrice, 'shrink-0 rounded-full bg-secondaryLight px-3 py-1']">
          {{ formatPrice(dish.price) }}
        </span>
      </div>
      <p v-if="dish.nameMalayalam" :class="TextStyles.siteMalayalamName">
        {{ dish.nameMalayalam }}
      </p>
      <p v-if="dish.description" :class="[TextStyles.siteBody, 'line-clamp-3 flex-1']">
        {{ dish.description }}
      </p>
      <p
        :class="[
          TextStyles.siteChip,
          'mt-auto flex items-center gap-1.5 border-t border-siteHairline pt-3 text-tertiary',
        ]"
      >
        <AppIcon name="star" class="h-3.5 w-3.5 fill-tertiary" />Today's special
      </p>
    </article>
  </div>
</template>
