<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';

/** Gold-dot list of short items: amenities, facilities, package inclusions. */
defineProps<{ items: string[]; isCompact?: boolean }>();
</script>

<template>
  <ul :class="['grid gap-2.5', isCompact ? '' : 'sm:grid-cols-2']">
    <li v-for="item in items" :key="item" :class="[TextStyles.siteBody, 'flex items-start gap-3']">
      <span class="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-secondary" aria-hidden="true" />
      {{ item }}
    </li>
  </ul>
</template>
