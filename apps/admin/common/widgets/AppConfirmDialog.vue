<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import AppButton from '~/common/widgets/AppButton.vue';
import AppModal from '~/common/widgets/AppModal.vue';

withDefaults(
  defineProps<{
    isOpen: boolean;
    title?: string;
    message?: string;
    confirmLabel?: string;
    isConfirming?: boolean;
  }>(),
  {
    title: AppStrings.confirm.deleteTitle,
    message: AppStrings.confirm.deleteMessage,
    confirmLabel: AppStrings.actions.delete,
  },
);
const emit = defineEmits<{ confirm: []; cancel: [] }>();
</script>

<template>
  <AppModal :is-open="isOpen" :title="title" @close="emit('cancel')">
    <p :class="TextStyles.body">{{ message }}</p>
    <template #footer>
      <AppButton variant="secondary" @click="emit('cancel')">
        {{ AppStrings.actions.cancel }}
      </AppButton>
      <AppButton variant="danger" :is-loading="isConfirming" @click="emit('confirm')">
        {{ confirmLabel }}
      </AppButton>
    </template>
  </AppModal>
</template>
