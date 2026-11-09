<script setup lang="ts">
import type { AppIconName } from '~/common/constants/appIcons';
import { TextStyles } from '~/common/styles/textStyles';
import AppCard from '~/common/widgets/AppCard.vue';
import AppIcon from '~/common/widgets/AppIcon.vue';

const quickActions: { label: string; to: string; icon: AppIconName }[] = [
  { label: 'Mark a hall date', to: '/admin/hall-calendar', icon: 'calendarCheck' },
  { label: "Update today's specials", to: '/admin/menu', icon: 'star' },
  { label: 'Upload gallery photos', to: '/admin/gallery', icon: 'banners' },
  { label: 'Edit rooms', to: '/admin/rooms', icon: 'pencil' },
];
</script>

<template>
  <AppCard title="Quick actions" icon="bolt">
    <div class="grid gap-3 sm:grid-cols-2">
      <NuxtLink
        v-for="action in quickActions"
        :key="action.to"
        :to="action.to"
        class="flex items-center gap-3 rounded-xl border border-border bg-surface/60 p-4 transition hover:border-primary/40 hover:bg-primaryLight"
      >
        <span
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background text-primary shadow-card"
        >
          <AppIcon :name="action.icon" class="h-5 w-5" />
        </span>
        <span :class="TextStyles.quickActionLabel">{{ action.label }}</span>
      </NuxtLink>
    </div>
  </AppCard>
</template>
