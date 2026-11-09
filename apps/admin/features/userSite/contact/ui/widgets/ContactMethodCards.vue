<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';
import AppIcon from '~/common/widgets/AppIcon.vue';
import type { ContactMethod } from '../../model/contact.model';

defineProps<{ methods: ContactMethod[] }>();
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2">
    <a
      v-for="method in methods"
      :key="method.key"
      :href="method.href"
      :target="method.isExternal ? '_blank' : undefined"
      :rel="method.isExternal ? 'noopener' : undefined"
      class="flex items-center gap-4 rounded-2xl border border-siteHairline bg-background p-5 shadow-siteCard transition hover:border-primary/40 hover:shadow-siteFloat"
    >
      <span
        :class="[
          'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl',
          method.icon === 'whatsapp'
            ? 'bg-whatsapp/15 text-whatsapp'
            : 'bg-primaryLight text-primary',
        ]"
      >
        <AppIcon :name="method.icon" class="h-6 w-6" />
      </span>
      <span class="flex min-w-0 flex-col gap-0.5">
        <span :class="TextStyles.siteBodySm">{{ method.title }}</span>
        <span :class="[TextStyles.siteLabel, 'truncate']">{{ method.value }}</span>
      </span>
    </a>
  </div>
</template>
