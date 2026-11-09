<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';
import AppButton from '~/common/widgets/AppButton.vue';
import AppTextField from '~/common/widgets/AppTextField.vue';

defineProps<{ error?: string; isSending: boolean; isSent: boolean }>();
const email = defineModel<string>({ required: true });
const emit = defineEmits<{ 'send-reset-link': []; 'back-to-login': [] }>();
</script>

<template>
  <form class="flex flex-col gap-4" novalidate @submit.prevent="emit('send-reset-link')">
    <p v-if="isSent" :class="TextStyles.body" role="status">
      If this email belongs to an admin, a reset link is on its way. Check your inbox.
    </p>
    <template v-else>
      <p :class="TextStyles.bodySmall">
        Enter your email and we'll send you a link to set a new password.
      </p>
      <AppTextField
        v-model="email"
        label="Email"
        type="email"
        autocomplete="email"
        :error="error"
        is-required
      />
      <AppButton type="submit" :is-loading="isSending">Send reset link</AppButton>
    </template>
    <button
      type="button"
      :class="[TextStyles.linkSmall, 'self-center']"
      @click="emit('back-to-login')"
    >
      Back to sign in
    </button>
  </form>
</template>
