<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';
import { formatPrice } from '~/common/utils/formatPrice';
import AppRowActions from '~/common/widgets/AppRowActions.vue';
import type { HallPackage } from '../../model/eventHall.model';

defineProps<{ hallPackages: HallPackage[] }>();
const emit = defineEmits<{
  'edit-package': [hallPackage: HallPackage];
  'delete-package': [hallPackage: HallPackage];
}>();
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    <article
      v-for="hallPackage in hallPackages"
      :key="hallPackage.id"
      class="flex flex-col rounded-2xl border border-border/70 bg-background shadow-card p-5"
    >
      <h3 :class="TextStyles.cardTitle">{{ hallPackage.name }}</h3>
      <p :class="[TextStyles.price, 'mt-1']">{{ formatPrice(hallPackage.price) }}</p>
      <ul class="mt-3 flex-1 list-inside list-disc">
        <li
          v-for="inclusion in hallPackage.inclusions"
          :key="inclusion"
          :class="TextStyles.bodySmall"
        >
          {{ inclusion }}
        </li>
      </ul>
      <AppRowActions
        class="mt-4"
        @edit="emit('edit-package', hallPackage)"
        @delete="emit('delete-package', hallPackage)"
      />
    </article>
  </div>
</template>
