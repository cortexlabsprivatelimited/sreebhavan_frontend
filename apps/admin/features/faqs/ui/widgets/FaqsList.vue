<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';
import AppRowActions from '~/common/widgets/AppRowActions.vue';
import type { Faq } from '../../model/faqs.model';

defineProps<{ faqs: Faq[]; getBusinessName: (businessId: string | null) => string }>();
const emit = defineEmits<{ 'edit-faq': [faq: Faq]; 'delete-faq': [faq: Faq] }>();
</script>

<template>
  <ul class="flex flex-col gap-3">
    <li
      v-for="faq in faqs"
      :key="faq.id"
      class="flex flex-col gap-3 rounded-2xl border border-border/70 bg-background shadow-card p-4 sm:flex-row sm:items-start sm:justify-between"
    >
      <div>
        <p :class="TextStyles.label">{{ faq.question }}</p>
        <p :class="[TextStyles.bodySmall, 'mt-1 whitespace-pre-line']">{{ faq.answer }}</p>
        <p :class="[TextStyles.caption, 'mt-2']">
          {{ faq.businessId ? getBusinessName(faq.businessId) : 'General' }} · Sort
          {{ faq.sortOrder }}
        </p>
      </div>
      <AppRowActions @edit="emit('edit-faq', faq)" @delete="emit('delete-faq', faq)" />
    </li>
  </ul>
</template>
