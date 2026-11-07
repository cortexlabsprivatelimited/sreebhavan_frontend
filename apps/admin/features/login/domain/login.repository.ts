import { ApiConstants } from '~/common/constants/apiConstants';
import { AppStrings } from '~/common/constants/appStrings';
import { useApiClient } from '~/common/services/apiClient';
import type { FormErrors } from '~/common/types/form';
import { isBlank, isValidEmail } from '~/common/utils/validators';
import {
  mapLoginResult,
  type LoginApiResponse,
  type LoginForm,
  type LoginResult,
} from '../model/login.model';

export const validateLoginForm = (form: LoginForm): FormErrors<LoginForm> => ({
  email: isValidEmail(form.email.trim()) ? undefined : AppStrings.validation.invalidEmail,
  password: isBlank(form.password) ? AppStrings.validation.required : undefined,
});

/** The only place in the login feature that talks to the API. */
export const useLoginRepository = () => {
  const apiClient = useApiClient();

  const signIn = async (form: LoginForm): Promise<LoginResult> => {
    const response = await apiClient.post<LoginApiResponse>(ApiConstants.admin.auth.login, {
      email: form.email.trim(),
      password: form.password,
    });
    return mapLoginResult(response);
  };

  const requestPasswordReset = async (email: string): Promise<void> => {
    await apiClient.post(ApiConstants.admin.auth.forgotPassword, { email: email.trim() });
  };

  return { signIn, requestPasswordReset };
};
