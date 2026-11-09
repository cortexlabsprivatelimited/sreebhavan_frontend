<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { ImageConstants } from '~/common/constants/imageConstants';
import { TextStyles } from '~/common/styles/textStyles';
import AppButton from '~/common/widgets/AppButton.vue';
import type { Business } from '../../model/businesses.model';

defineProps<{ business: Business }>();
const emit = defineEmits<{ 'edit-business': [business: Business] }>();
</script>

<template>
  <article
    class="flex flex-col gap-4 rounded-2xl border border-border/70 bg-background shadow-card p-5"
  >
    <div class="flex items-center gap-4">
      <NuxtImg
        :src="business.logoUrl || ImageConstants.placeholders.image"
        :alt="`${business.name} logo`"
        class="h-16 w-16 rounded-lg bg-surface object-contain"
      />
      <div>
        <h2 :class="TextStyles.cardTitle">{{ business.name }}</h2>
        <p :class="TextStyles.caption">/{{ business.slug }}</p>
      </div>
    </div>
    <p :class="[TextStyles.bodySmall, 'line-clamp-3']">
      {{ business.about || 'No description yet.' }}
    </p>
    <dl class="grid grid-cols-2 gap-3">
      <div>
        <dt :class="TextStyles.caption">WhatsApp</dt>
        <dd :class="TextStyles.label">{{ business.whatsAppNumber || '-' }}</dd>
      </div>
      <div>
        <dt :class="TextStyles.caption">Phone</dt>
        <dd :class="TextStyles.label">{{ business.phone || '-' }}</dd>
      </div>
      <div v-for="timing in business.timings" :key="timing.label">
        <dt :class="TextStyles.caption">{{ timing.label }}</dt>
        <dd :class="TextStyles.label">{{ timing.hours }}</dd>
      </div>
    </dl>
    <AppButton class="self-start" variant="secondary" @click="emit('edit-business', business)">
      {{ AppStrings.actions.edit }}
    </AppButton>
  </article>
</template>
