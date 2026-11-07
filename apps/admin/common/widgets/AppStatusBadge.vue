<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';
import type { BadgeTone } from '~/common/types/badge';

withDefaults(defineProps<{ label: string; tone?: BadgeTone }>(), { tone: 'neutral' });

const toneClasses: Record<BadgeTone, string> = {
  success: 'bg-successLight text-success',
  warning: 'bg-warningLight text-warning',
  error: 'bg-errorLight text-error',
  info: 'bg-infoLight text-info',
  neutral: 'bg-surfaceMuted text-textSecondary',
};
</script>

<template>
  <span :class="[TextStyles.badge, toneClasses[tone], 'inline-flex rounded-full px-3 py-1']">
    {{ label }}
  </span>
</template>
