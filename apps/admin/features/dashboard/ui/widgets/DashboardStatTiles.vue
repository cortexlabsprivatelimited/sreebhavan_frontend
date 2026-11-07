<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';
import AppIcon from '~/common/widgets/AppIcon.vue';
import type { DashboardStatTile, DashboardStatTone } from '../../model/dashboard.model';

defineProps<{ tiles: DashboardStatTile[] }>();

const toneClasses: Record<DashboardStatTone, { icon: string; bars: string[] }> = {
  blue: {
    icon: 'bg-primaryLight text-primary',
    bars: ['bg-primary/30', 'bg-primary/45', 'bg-primary/60', 'bg-primary/80', 'bg-primary'],
  },
  green: {
    icon: 'bg-successLight text-success',
    bars: [
      'bg-accentGreen/30',
      'bg-accentGreen/45',
      'bg-accentGreen/60',
      'bg-accentGreen/80',
      'bg-accentGreen',
    ],
  },
  orange: {
    icon: 'bg-warningLight text-accentOrange',
    bars: [
      'bg-accentOrange/30',
      'bg-accentOrange/45',
      'bg-accentOrange/60',
      'bg-accentOrange/80',
      'bg-accentOrange',
    ],
  },
  purple: {
    icon: 'bg-accentPurpleLight text-accentPurple',
    bars: [
      'bg-accentPurple/30',
      'bg-accentPurple/45',
      'bg-accentPurple/60',
      'bg-accentPurple/80',
      'bg-accentPurple',
    ],
  },
};

/** Decorative mini bar chart heights (not data). */
const barHeights = ['h-2', 'h-3', 'h-4', 'h-5', 'h-7'];
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <NuxtLink
      v-for="tile in tiles"
      :key="tile.label"
      :to="tile.to"
      class="flex items-center gap-4 rounded-2xl border border-border/70 bg-background p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-cardHover"
    >
      <span
        :class="[
          toneClasses[tile.tone].icon,
          'flex h-14 w-14 shrink-0 items-center justify-center rounded-full',
        ]"
      >
        <AppIcon :name="tile.icon" class="h-7 w-7" />
      </span>
      <div class="min-w-0 flex-1">
        <p :class="TextStyles.statLabel">{{ tile.label }}</p>
        <div class="mt-1 flex items-end justify-between gap-2">
          <p :class="TextStyles.statValue">{{ tile.value }}</p>
          <span class="flex items-end gap-1" aria-hidden="true">
            <span
              v-for="(barHeight, barIndex) in barHeights"
              :key="barIndex"
              :class="[barHeight, toneClasses[tile.tone].bars[barIndex], 'w-1.5 rounded-sm']"
            />
          </span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
