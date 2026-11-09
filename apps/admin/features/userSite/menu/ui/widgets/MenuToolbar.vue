<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import AppIcon from '~/common/widgets/AppIcon.vue';
import AppToggle from '~/common/widgets/AppToggle.vue';
import type { MenuCardFile } from '../../model/menu.model';

defineProps<{ searchText: string; isSpecialsOnly: boolean; menuCards: MenuCardFile[] }>();
const emit = defineEmits<{
  'update:searchText': [value: string];
  'update:isSpecialsOnly': [value: boolean];
}>();
</script>

<template>
  <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div class="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
      <label class="relative flex-1 md:max-w-sm">
        <span class="sr-only">Search dishes</span>
        <AppIcon
          name="seo"
          class="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-textMuted"
        />
        <input
          type="search"
          :value="searchText"
          placeholder="Search dosa, meals, payasam…"
          :class="[
            TextStyles.input,
            'w-full rounded-full border border-siteHairline bg-background py-2.5 pl-10 pr-4 outline-none focus:border-focus focus:ring-2 focus:ring-focusRing',
          ]"
          @input="emit('update:searchText', ($event.target as HTMLInputElement).value)"
        />
      </label>
      <AppToggle
        :model-value="isSpecialsOnly"
        :label="AppStrings.site.todaysSpecials"
        @update:model-value="emit('update:isSpecialsOnly', $event)"
      />
    </div>
    <div v-if="menuCards.length" class="flex flex-wrap gap-3">
      <a
        v-for="card in menuCards"
        :key="card.id"
        :href="card.fileUrl"
        target="_blank"
        rel="noopener"
        :class="[TextStyles.siteArrowLink, 'flex items-center gap-2']"
      >
        <AppIcon name="download" class="h-4 w-4" />{{ card.title }}
      </a>
    </div>
  </div>
</template>
