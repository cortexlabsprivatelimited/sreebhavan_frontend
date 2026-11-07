<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';

defineProps<{ message?: string }>();
const emit = defineEmits<{ retry: [] }>();
</script>

<template>
  <div class="flex flex-col items-center gap-4 py-12 text-center">
    <p :class="TextStyles.errorText">{{ message ?? AppStrings.states.genericError }}</p>
    <button
      type="button"
      :class="[TextStyles.button, 'rounded-lg bg-primary px-5 py-2 text-textOnPrimary']"
      @click="emit('retry')"
    >
      {{ AppStrings.actions.retry }}
    </button>
  </div>
</template>
