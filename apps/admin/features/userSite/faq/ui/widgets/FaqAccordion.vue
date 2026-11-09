<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';
import AppIcon from '~/common/widgets/AppIcon.vue';
import type { Faq } from '../../model/faq.model';

defineProps<{ faqs: Faq[]; openFaqId: string | null }>();
const emit = defineEmits<{ 'toggle-faq': [faqId: string] }>();
</script>

<template>
  <ul class="flex flex-col gap-3">
    <li
      v-for="faq in faqs"
      :key="faq.id"
      class="overflow-hidden rounded-2xl border border-siteHairline bg-background shadow-siteCard"
    >
      <h2>
        <button
          :id="`faq-question-${faq.id}`"
          type="button"
          :aria-expanded="openFaqId === faq.id"
          :aria-controls="`faq-answer-${faq.id}`"
          :class="[
            TextStyles.siteLabel,
            'flex w-full items-center justify-between gap-4 p-5 text-left',
          ]"
          @click="emit('toggle-faq', faq.id)"
        >
          {{ faq.question }}
          <AppIcon
            name="chevronRight"
            :class="['h-5 w-5 text-primary transition', openFaqId === faq.id ? 'rotate-90' : '']"
          />
        </button>
      </h2>
      <div
        v-show="openFaqId === faq.id"
        :id="`faq-answer-${faq.id}`"
        role="region"
        :aria-labelledby="`faq-question-${faq.id}`"
        :class="[
          TextStyles.siteBodyLg,
          'whitespace-pre-line border-t border-siteHairline px-5 py-4',
        ]"
      >
        {{ faq.answer }}
      </div>
    </li>
  </ul>
</template>
