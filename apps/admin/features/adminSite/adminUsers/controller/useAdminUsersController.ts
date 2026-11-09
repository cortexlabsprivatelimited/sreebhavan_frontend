import { useCrudListState } from '~/common/controllers/useCrudListState';
import { useAdminSessionStore } from '~/common/stores/adminSession';
import { useToastStore } from '~/common/stores/toast';
import { getErrorMessage } from '~/common/utils/getErrorMessage';
import {
  canChangeAdminUser,
  useAdminUsersRepository,
  validateAdminUserForm,
} from '../domain/adminUsers.repository';
import {
  createEmptyAdminUserForm,
  toAdminUserForm,
  type AdminUser,
} from '../model/adminUsers.model';

export const useAdminUsersController = () => {
  const adminUsersRepository = useAdminUsersRepository();
  const adminSession = useAdminSessionStore();
  const toast = useToastStore();

  const crud = useCrudListState({
    key: 'admin-users',
    repository: adminUsersRepository,
    createEmptyForm: createEmptyAdminUserForm,
    toForm: toAdminUserForm,
    validateForm: validateAdminUserForm,
  });

  const editingUserId = ref<string | null>(null);
  const openEditUser = (user: AdminUser) => {
    editingUserId.value = user.id;
    crud.openEditForm(user);
  };
  const isEditingSelf = computed(
    () => crud.isEditing.value && editingUserId.value === adminSession.profile?.id,
  );

  const canChangeUser = (user: AdminUser) =>
    canChangeAdminUser(user, adminSession.profile?.id ?? null);

  const resettingUserId = ref<string | null>(null);
  const sendPasswordReset = async (user: AdminUser) => {
    resettingUserId.value = user.id;
    try {
      await adminUsersRepository.sendPasswordReset(user.id);
      toast.showSuccess(`Password reset email sent to ${user.email}.`);
    } catch (resetError) {
      toast.showError(getErrorMessage(resetError));
    } finally {
      resettingUserId.value = null;
    }
  };

  return {
    ...crud,
    openEditUser,
    isEditingSelf,
    canChangeUser,
    resettingUserId,
    sendPasswordReset,
  };
};
