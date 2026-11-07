<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';
import { useToastStore } from '~/common/stores/toast';

const toast = useToastStore();
</script>

<template>
  <div class="fixed bottom-4 right-4 z-[60] flex w-80 flex-col gap-2" aria-live="polite">
    <button
      v-for="message in toast.messages"
      :key="message.id"
      type="button"
      :class="[
        TextStyles.toastText,
        'rounded-xl px-4 py-3 text-left shadow-lg',
        message.tone === 'success' ? 'bg-success' : 'bg-error',
      ]"
      @click="toast.dismissToast(message.id)"
    >
      {{ message.text }}
    </button>
  </div>
</template>
