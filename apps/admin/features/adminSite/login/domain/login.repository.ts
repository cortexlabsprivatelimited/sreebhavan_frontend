import { ApiConstants } from '~/common/constants/apiConstants';
import { AppConfig } from '~/common/constants/appConfig';
import { AppStrings } from '~/common/constants/appStrings';
import { useApiClient } from '~/common/services/apiClient';
import type { FormErrors } from '~/common/types/form';
import { isBlank } from '~/common/utils/validators';
import {
  mapLoginResult,
  type LoginApiResponse,
  type LoginForm,
  type LoginResult,
} from '../model/login.model';

/** 'superadmin' → 'superadmin@sreebhavan.com'; a full email is used as typed. */
export const toLoginEmail = (usernameOrEmail: string): string => {
  const value = usernameOrEmail.trim().toLowerCase();
  return value.includes('@') ? value : `${value}@${AppConfig.adminUsernameEmailDomain}`;
};

export const validateLoginForm = (form: LoginForm): FormErrors<LoginForm> => ({
  usernameOrEmail: isBlank(form.usernameOrEmail) ? AppStrings.validation.required : undefined,
  password: isBlank(form.password) ? AppStrings.validation.required : undefined,
});

/** The only place in the login feature that talks to the API. */
export const useLoginRepository = () => {
  const apiClient = useApiClient();

  const signIn = async (form: LoginForm): Promise<LoginResult> => {
    const response = await apiClient.post<LoginApiResponse>(ApiConstants.admin.auth.login, {
      email: toLoginEmail(form.usernameOrEmail),
      password: form.password,
    });
    return mapLoginResult(response);
  };

  const requestPasswordReset = async (email: string): Promise<void> => {
    await apiClient.post(ApiConstants.admin.auth.forgotPassword, { email: email.trim() });
  };

  return { signIn, requestPasswordReset };
};
