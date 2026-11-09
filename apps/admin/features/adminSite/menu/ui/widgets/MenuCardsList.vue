<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';
import AppRowActions from '~/common/widgets/AppRowActions.vue';
import AppStatusBadge from '~/common/widgets/AppStatusBadge.vue';
import { isPdfUrl, type MenuCard } from '../../model/menu.model';

defineProps<{ menuCards: MenuCard[] }>();
const emit = defineEmits<{ 'edit-card': [card: MenuCard]; 'delete-card': [card: MenuCard] }>();
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <article
      v-for="card in menuCards"
      :key="card.id"
      class="overflow-hidden rounded-2xl border border-border/70 bg-background shadow-card"
    >
      <a :href="card.fileUrl" target="_blank" rel="noopener" class="block bg-surface">
        <div
          v-if="isPdfUrl(card.fileUrl)"
          :class="[TextStyles.cardTitle, 'flex aspect-[4/3] items-center justify-center']"
        >
          PDF
        </div>
        <NuxtImg
          v-else
          :src="card.fileUrl"
          :alt="card.title"
          loading="lazy"
          class="aspect-[4/3] w-full object-cover"
        />
      </a>
      <div class="flex items-center justify-between gap-2 p-4">
        <div>
          <p :class="TextStyles.label">{{ card.title }}</p>
          <AppStatusBadge
            class="mt-1"
            :label="card.isActive ? 'Visible' : 'Hidden'"
            :tone="card.isActive ? 'success' : 'neutral'"
          />
        </div>
        <AppRowActions @edit="emit('edit-card', card)" @delete="emit('delete-card', card)" />
      </div>
    </article>
  </div>
</template>
