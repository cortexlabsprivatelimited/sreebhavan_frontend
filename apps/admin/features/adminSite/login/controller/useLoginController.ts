import { AppConfig } from '~/common/constants/appConfig';
import { AppStrings } from '~/common/constants/appStrings';
import { useAdminSessionStore } from '~/common/stores/adminSession';
import { hasFormErrors, type FormErrors } from '~/common/types/form';
import { getApiFieldErrors, getErrorMessage, getErrorStatus } from '~/common/utils/getErrorMessage';
import { isValidEmail } from '~/common/utils/validators';
import { toLoginEmail, useLoginRepository, validateLoginForm } from '../domain/login.repository';
import { createEmptyLoginForm, type LoginForm } from '../model/login.model';

/** Only same-site paths are allowed as a redirect after login. */
const readSafeRedirect = (redirect: unknown): string =>
  typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//')
    ? redirect
    : AppConfig.homeRoute;

export const useLoginController = () => {
  const loginRepository = useLoginRepository();
  const adminSession = useAdminSessionStore();
  const route = useRoute();
  const router = useRouter();

  const form = ref<LoginForm>(createEmptyLoginForm());
  const formErrors = ref<FormErrors<LoginForm>>({});
  const isSubmitting = ref(false);
  const errorMessage = ref<string | null>(null);

  const submitLogin = async () => {
    formErrors.value = validateLoginForm(form.value);
    if (hasFormErrors(formErrors.value)) return;

    isSubmitting.value = true;
    errorMessage.value = null;
    try {
      const result = await loginRepository.signIn(form.value);
      adminSession.startSession(result.accessToken, result.profile);
      await router.replace(readSafeRedirect(route.query.redirect));
    } catch (loginError) {
      formErrors.value = getApiFieldErrors(loginError, form.value, { email: 'usernameOrEmail' });
      errorMessage.value =
        getErrorStatus(loginError) === 401
          ? 'Wrong username or password.'
          : getErrorMessage(loginError);
    } finally {
      isSubmitting.value = false;
    }
  };

  // Forgot password
  const isResetMode = ref(false);
  const resetEmail = ref('');
  const resetEmailError = ref<string | undefined>(undefined);
  const isSendingReset = ref(false);
  const isResetSent = ref(false);

  const showResetForm = () => {
    resetEmail.value = form.value.usernameOrEmail ? toLoginEmail(form.value.usernameOrEmail) : '';
    resetEmailError.value = undefined;
    isResetSent.value = false;
    isResetMode.value = true;
  };

  const showLoginForm = () => {
    isResetMode.value = false;
  };

  const sendResetLink = async () => {
    resetEmailError.value = isValidEmail(resetEmail.value.trim())
      ? undefined
      : AppStrings.validation.invalidEmail;
    if (resetEmailError.value) return;

    isSendingReset.value = true;
    try {
      await loginRepository.requestPasswordReset(resetEmail.value);
      isResetSent.value = true;
    } catch (resetError) {
      resetEmailError.value = getErrorMessage(resetError);
    } finally {
      isSendingReset.value = false;
    }
  };

  return {
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
  };
};
