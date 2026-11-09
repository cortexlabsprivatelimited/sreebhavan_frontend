<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';
import AppIcon from '~/common/widgets/AppIcon.vue';
import { HotelHighlights } from '../../model/hotel.model';
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-3">
    <div
      v-for="highlight in HotelHighlights"
      :key="highlight.title"
      class="flex flex-col gap-2 rounded-2xl border border-siteHairline bg-background p-5"
    >
      <AppIcon :name="highlight.icon" class="h-6 w-6 text-secondary" />
      <h3 :class="TextStyles.siteLabel">{{ highlight.title }}</h3>
      <p :class="TextStyles.siteBody">{{ highlight.text }}</p>
    </div>
  </div>
</template>
