<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-3 py-12" role="status">
    <span class="h-8 w-8 animate-spin rounded-full border-4 border-primaryLight border-t-primary" />
    <p :class="TextStyles.bodySmall">{{ AppStrings.states.loading }}</p>
  </div>
</template>
