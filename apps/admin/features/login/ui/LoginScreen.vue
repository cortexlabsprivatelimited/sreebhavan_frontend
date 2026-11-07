<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import AppIcon from '~/common/widgets/AppIcon.vue';
import { useLoginController } from '../controller/useLoginController';
import LoginForgotPasswordForm from './widgets/LoginForgotPasswordForm.vue';
import LoginForm from './widgets/LoginForm.vue';

const {
  form,
  formErrors,
  isSubmitting,
  errorMessage,
  submitLogin,
  isResetMode,
  resetEmail,
  resetEmailError,
  isSendingReset,
  isResetSent,
  showResetForm,
  showLoginForm,
  sendResetLink,
} = useLoginController();
</script>

<template>
  <section class="w-full max-w-sm rounded-2xl bg-background p-8 shadow-cardHover">
    <div class="mb-6 flex flex-col items-center gap-2 text-center">
      <span class="flex h-14 w-14 items-center justify-center rounded-full bg-primaryLight">
        <AppIcon name="lotus" :stroke-width="1.5" class="h-8 w-8 text-primary" />
      </span>
      <p :class="TextStyles.sectionTitle">{{ AppStrings.appName }}</p>
    </div>
    <h1 :class="[TextStyles.subheading, 'mb-6']">
      {{ isResetMode ? 'Reset password' : 'Sign in' }}
    </h1>
    <LoginForgotPasswordForm
      v-if="isResetMode"
      v-model="resetEmail"
      :error="resetEmailError"
      :is-sending="isSendingReset"
      :is-sent="isResetSent"
      @send-reset-link="sendResetLink"
      @back-to-login="showLoginForm"
    />
    <LoginForm
      v-else
      v-model="form"
      :form-errors="formErrors"
      :is-submitting="isSubmitting"
      :error-message="errorMessage"
      @submit-login="submitLogin"
      @forgot-password="showResetForm"
    />
  </section>
</template>
