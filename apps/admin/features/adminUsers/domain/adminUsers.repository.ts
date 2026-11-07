import { ApiConstants } from '~/common/constants/apiConstants';
import { AppStrings } from '~/common/constants/appStrings';
import type { CrudRepository } from '~/common/controllers/useCrudListState';
import { useApiClient } from '~/common/services/apiClient';
import type { FormErrors } from '~/common/types/form';
import { isBlank, isValidEmail } from '~/common/utils/validators';
import {
  mapAdminUser,
  toAdminUserRequest,
  type AdminUser,
  type AdminUserApiResponse,
  type AdminUserForm,
} from '../model/adminUsers.model';

export const validateAdminUserForm = (form: AdminUserForm): FormErrors<AdminUserForm> => ({
  name: isBlank(form.name) ? AppStrings.validation.required : undefined,
  email: isValidEmail(form.email.trim()) ? undefined : AppStrings.validation.invalidEmail,
});

/** Owners cannot remove, deactivate or demote themselves, so the panel always keeps an owner. */
export const canChangeAdminUser = (user: AdminUser, signedInAdminId: string | null): boolean =>
  user.id !== signedInAdminId;

export const useAdminUsersRepository = () => {
  const apiClient = useApiClient();

  const crud: CrudRepository<AdminUser, AdminUserForm> = {
    getAll: async () =>
      (await apiClient.get<AdminUserApiResponse[]>(ApiConstants.admin.users)).map(mapAdminUser),
    create: async (form) =>
      mapAdminUser(
        await apiClient.post<AdminUserApiResponse>(
          ApiConstants.admin.users,
          toAdminUserRequest(form),
        ),
      ),
    update: async (id, form) =>
      mapAdminUser(
        await apiClient.patch<AdminUserApiResponse>(
          ApiConstants.admin.userById(id),
          toAdminUserRequest(form),
        ),
      ),
    remove: async (id) => {
      await apiClient.remove(ApiConstants.admin.userById(id));
    },
  };

  const sendPasswordReset = async (id: string): Promise<void> => {
    await apiClient.post(ApiConstants.admin.userPasswordReset(id));
  };

  return { ...crud, sendPasswordReset };
};
