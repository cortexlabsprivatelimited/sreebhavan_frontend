<script setup lang="ts">
import type { AppIconName } from '~/common/constants/appIcons';
import { TextStyles } from '~/common/styles/textStyles';
import AppIcon from '~/common/widgets/AppIcon.vue';

defineProps<{ title?: string; description?: string; icon?: AppIconName }>();
</script>

<template>
  <section class="rounded-2xl border border-border/70 bg-background p-5 shadow-card sm:p-6">
    <header v-if="title || $slots.actions" class="mb-4 flex items-start justify-between gap-4">
      <div class="flex items-center gap-3">
        <AppIcon v-if="icon" :name="icon" class="h-6 w-6 text-primary" />
        <div>
          <h2 v-if="title" :class="TextStyles.sectionTitle">{{ title }}</h2>
          <p v-if="description" :class="[TextStyles.bodySmall, 'mt-1']">{{ description }}</p>
        </div>
      </div>
      <slot name="actions" />
    </header>
    <slot />
  </section>
</template>
