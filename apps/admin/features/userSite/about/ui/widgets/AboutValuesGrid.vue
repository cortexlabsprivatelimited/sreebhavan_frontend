<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';
import AppIcon from '~/common/widgets/AppIcon.vue';
import type { AboutValue } from '../../model/about.model';

defineProps<{ values: AboutValue[] }>();
</script>

<template>
  <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
    <div
      v-for="value in values"
      :key="value.title"
      class="flex flex-col gap-3 rounded-3xl border border-siteHairline bg-background p-6 shadow-siteCard"
    >
      <span
        class="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondaryLight text-secondaryDark"
      >
        <AppIcon :name="value.icon" class="h-6 w-6" />
      </span>
      <h3 :class="TextStyles.siteHeadlineSm">{{ value.title }}</h3>
      <p :class="TextStyles.siteBody">{{ value.text }}</p>
    </div>
  </div>
</template>
