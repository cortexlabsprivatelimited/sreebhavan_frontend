<script setup lang="ts">
import AppButton from '~/common/widgets/AppButton.vue';
import AppConfirmDialog from '~/common/widgets/AppConfirmDialog.vue';
import AppEmptyState from '~/common/widgets/AppEmptyState.vue';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppPageHeader from '~/common/widgets/AppPageHeader.vue';
import { useAdminUsersController } from '../controller/useAdminUsersController';
import AdminUsersFormDialog from './widgets/AdminUsersFormDialog.vue';
import AdminUsersTable from './widgets/AdminUsersTable.vue';

const {
  items: users,
  isLoading,
  hasError,
  isEmpty,
  reloadItems,
  isFormOpen,
  isEditing,
  form,
  formErrors,
  isSaving,
  saveErrorMessage,
  openCreateForm,
  closeForm,
  saveForm,
  itemPendingDelete,
  isDeleting,
  requestDelete,
  cancelDelete,
  confirmDelete,
  openEditUser,
  isEditingSelf,
  canChangeUser,
  resettingUserId,
  sendPasswordReset,
} = useAdminUsersController();
</script>

<template>
  <div>
    <AppPageHeader
      title="Admin users"
      description="Who can sign in to this panel. Staff manage content; only owners manage users."
    >
      <template #actions>
        <AppButton @click="openCreateForm">Invite user</AppButton>
      </template>
    </AppPageHeader>

    <AppLoader v-if="isLoading" />
    <AppErrorState v-else-if="hasError" @retry="reloadItems" />
    <AppEmptyState v-else-if="isEmpty" />
    <AdminUsersTable
      v-else
      :users="users"
      :can-change-user="canChangeUser"
      :resetting-user-id="resettingUserId"
      @edit-user="openEditUser"
      @delete-user="requestDelete"
      @reset-password="sendPasswordReset"
    />

    <AdminUsersFormDialog
      v-model="form"
      :is-open="isFormOpen"
      :is-editing="isEditing"
      :is-editing-self="isEditingSelf"
      :form-errors="formErrors"
      :is-saving="isSaving"
      :save-error-message="saveErrorMessage"
      @close="closeForm"
      @save-user="saveForm"
    />
    <AppConfirmDialog
      :is-open="Boolean(itemPendingDelete)"
      title="Remove this admin user?"
      message="They will no longer be able to sign in."
      confirm-label="Remove"
      :is-confirming="isDeleting"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>
