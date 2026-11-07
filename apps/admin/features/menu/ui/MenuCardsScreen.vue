<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import AppButton from '~/common/widgets/AppButton.vue';
import AppConfirmDialog from '~/common/widgets/AppConfirmDialog.vue';
import AppEmptyState from '~/common/widgets/AppEmptyState.vue';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLinkTabs from '~/common/widgets/AppLinkTabs.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppPageHeader from '~/common/widgets/AppPageHeader.vue';
import { useMenuCardsController } from '../controller/useMenuCardsController';
import { MenuTabs } from '../model/menu.model';
import MenuCardsFormDialog from './widgets/MenuCardsFormDialog.vue';
import MenuCardsList from './widgets/MenuCardsList.vue';

const {
  items: menuCards,
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
  openEditForm,
  closeForm,
  saveForm,
  itemPendingDelete,
  isDeleting,
  requestDelete,
  cancelDelete,
  confirmDelete,
  isUploading,
  uploadMenuCardFile,
} = useMenuCardsController();
</script>

<template>
  <div>
    <AppPageHeader
      title="Menu"
      description="The printable menu card visitors can view and download."
    >
      <template #actions>
        <AppButton @click="openCreateForm">{{ AppStrings.actions.add }} menu card</AppButton>
      </template>
    </AppPageHeader>
    <AppLinkTabs :tabs="MenuTabs" />

    <AppLoader v-if="isLoading" />
    <AppErrorState v-else-if="hasError" @retry="reloadItems" />
    <AppEmptyState v-else-if="isEmpty" message="No menu card uploaded yet." />
    <MenuCardsList
      v-else
      :menu-cards="menuCards"
      @edit-card="openEditForm"
      @delete-card="requestDelete"
    />

    <MenuCardsFormDialog
      v-model="form"
      :is-open="isFormOpen"
      :is-editing="isEditing"
      :form-errors="formErrors"
      :is-saving="isSaving"
      :is-uploading="isUploading"
      :save-error-message="saveErrorMessage"
      @close="closeForm"
      @save-card="saveForm"
      @select-file="uploadMenuCardFile"
    />
    <AppConfirmDialog
      :is-open="Boolean(itemPendingDelete)"
      :is-confirming="isDeleting"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>
