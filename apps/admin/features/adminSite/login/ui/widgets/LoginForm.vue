<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import type { FormErrors } from '~/common/types/form';
import AppButton from '~/common/widgets/AppButton.vue';
import AppTextField from '~/common/widgets/AppTextField.vue';
import type { LoginForm } from '../../model/login.model';

defineProps<{
  formErrors: FormErrors<LoginForm>;
  isSubmitting: boolean;
  errorMessage: string | null;
}>();
const form = defineModel<LoginForm>({ required: true });
const emit = defineEmits<{ 'submit-login': []; 'forgot-password': [] }>();
</script>

<template>
  <form class="flex flex-col gap-4" novalidate @submit.prevent="emit('submit-login')">
    <AppTextField
      v-model="form.usernameOrEmail"
      label="Username or email"
      autocomplete="username"
      :error="formErrors.usernameOrEmail"
      is-required
    />
    <AppTextField
      v-model="form.password"
      label="Password"
      type="password"
      autocomplete="current-password"
      :error="formErrors.password"
      is-required
    />
    <p v-if="errorMessage" :class="TextStyles.errorText" role="alert">{{ errorMessage }}</p>
    <AppButton type="submit" :is-loading="isSubmitting">{{ AppStrings.actions.signIn }}</AppButton>
    <button
      type="button"
      :class="[TextStyles.linkSmall, 'self-center']"
      @click="emit('forgot-password')"
    >
      Forgot password?
    </button>
  </form>
</template>
