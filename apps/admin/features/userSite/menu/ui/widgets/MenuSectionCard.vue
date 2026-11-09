<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';
import type { MenuSection } from '../../model/menu.model';
import MenuDishRow from './MenuDishRow.vue';

defineProps<{ section: MenuSection }>();
</script>

<template>
  <section
    :id="section.category.slug"
    class="scroll-mt-28 rounded-3xl border border-siteHairline bg-background p-6 shadow-siteCard md:p-8"
  >
    <header class="mb-2 flex items-center gap-4 border-b border-siteHairlineGold pb-5">
      <NuxtImg
        v-if="section.category.imageUrl"
        :src="section.category.imageUrl"
        :alt="section.category.name"
        format="webp"
        loading="lazy"
        class="h-14 w-14 rounded-2xl object-cover"
      />
      <div>
        <h2 :class="TextStyles.siteHeadlineMd">{{ section.category.name }}</h2>
        <p v-if="section.category.nameMalayalam" :class="TextStyles.siteMalayalamName">
          {{ section.category.nameMalayalam }}
        </p>
      </div>
    </header>
    <div class="grid md:grid-cols-2 md:gap-x-12">
      <MenuDishRow v-for="dish in section.dishes" :key="dish.id" :dish="dish" />
    </div>
  </section>
</template>
