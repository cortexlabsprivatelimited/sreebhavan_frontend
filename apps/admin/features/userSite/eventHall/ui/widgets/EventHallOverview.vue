<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';
import AppIcon from '~/common/widgets/AppIcon.vue';
import AppSiteFeatureList from '~/common/widgets/userSite/AppSiteFeatureList.vue';
import type { Hall } from '../../model/eventHall.model';

defineProps<{ hall: Hall }>();
</script>

<template>
  <div class="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
    <dl class="grid grid-cols-2 gap-4 self-start">
      <div
        class="flex flex-col-reverse gap-1 rounded-2xl border border-siteHairline bg-background p-5"
      >
        <dt :class="TextStyles.siteBody">Seated guests</dt>
        <dd :class="TextStyles.siteStatValue">{{ hall.seatingCapacity }}</dd>
      </div>
      <div
        class="flex flex-col-reverse gap-1 rounded-2xl border border-siteHairline bg-background p-5"
      >
        <dt :class="TextStyles.siteBody">Floating guests</dt>
        <dd :class="TextStyles.siteStatValue">{{ hall.floatingCapacity }}</dd>
      </div>
    </dl>
    <div class="flex flex-col gap-8">
      <div v-if="hall.facilities.length" class="flex flex-col gap-3">
        <h2 :class="TextStyles.siteHeadlineMd">Facilities</h2>
        <AppSiteFeatureList :items="hall.facilities" />
      </div>
      <div v-if="hall.rules.length" class="flex flex-col gap-3">
        <h2 :class="TextStyles.siteHeadlineMd">Good to know</h2>
        <ul class="flex flex-col gap-2">
          <li v-for="rule in hall.rules" :key="rule" :class="[TextStyles.siteBody, 'flex gap-2']">
            <AppIcon name="sparkle" class="mt-0.5 h-4 w-4 text-secondary" />{{ rule }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
