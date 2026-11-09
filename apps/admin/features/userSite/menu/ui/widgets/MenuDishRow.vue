<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';
import { formatPrice } from '~/common/utils/formatPrice';
import AppIcon from '~/common/widgets/AppIcon.vue';
import type { MenuDish } from '../../model/menu.model';

defineProps<{ dish: MenuDish }>();
</script>

<template>
  <article class="flex gap-4 border-b border-siteHairline py-5">
    <NuxtImg
      v-if="dish.imageUrl"
      :src="dish.imageUrl"
      :alt="dish.name"
      format="webp"
      loading="lazy"
      class="h-16 w-16 shrink-0 rounded-2xl object-cover"
    />
    <div class="flex min-w-0 flex-1 flex-col gap-1.5">
      <div class="flex items-baseline gap-3">
        <h3 :class="TextStyles.siteDishName">{{ dish.name }}</h3>
        <span
          class="min-w-6 flex-1 translate-y-[-3px] border-b border-dotted border-secondary/60"
          aria-hidden="true"
        />
        <span :class="TextStyles.sitePrice">{{ formatPrice(dish.price) }}</span>
      </div>
      <p v-if="dish.nameMalayalam" :class="TextStyles.siteMalayalamName">
        {{ dish.nameMalayalam }}
      </p>
      <p v-if="dish.description" :class="TextStyles.siteBody">{{ dish.description }}</p>
      <span
        v-if="dish.isSpecial"
        :class="[
          TextStyles.siteChip,
          'inline-flex items-center gap-1 self-start rounded-full bg-tertiaryLight px-2.5 py-1 text-tertiary',
        ]"
      >
        <AppIcon name="star" class="h-3 w-3 fill-tertiary" />Today's special
      </span>
    </div>
  </article>
</template>
