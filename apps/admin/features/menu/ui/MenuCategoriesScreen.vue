<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import AppButton from '~/common/widgets/AppButton.vue';
import AppConfirmDialog from '~/common/widgets/AppConfirmDialog.vue';
import AppEmptyState from '~/common/widgets/AppEmptyState.vue';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLinkTabs from '~/common/widgets/AppLinkTabs.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppPageHeader from '~/common/widgets/AppPageHeader.vue';
import { useMenuCategoriesController } from '../controller/useMenuCategoriesController';
import { MenuTabs } from '../model/menu.model';
import MenuCategoriesFormDialog from './widgets/MenuCategoriesFormDialog.vue';
import MenuCategoriesTable from './widgets/MenuCategoriesTable.vue';

const {
  items: categories,
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
  uploadCategoryImage,
} = useMenuCategoriesController();
</script>

<template>
  <div>
    <AppPageHeader title="Menu" description="Categories group dishes on the menu page.">
      <template #actions>
        <AppButton @click="openCreateForm">{{ AppStrings.actions.add }} category</AppButton>
      </template>
    </AppPageHeader>
    <AppLinkTabs :tabs="MenuTabs" />

    <AppLoader v-if="isLoading" />
    <AppErrorState v-else-if="hasError" @retry="reloadItems" />
    <AppEmptyState v-else-if="isEmpty" message="No categories yet." />
    <MenuCategoriesTable
      v-else
      :categories="categories"
      @edit-category="openEditForm"
      @delete-category="requestDelete"
    />

    <MenuCategoriesFormDialog
      v-model="form"
      :is-open="isFormOpen"
      :is-editing="isEditing"
      :form-errors="formErrors"
      :is-saving="isSaving"
      :is-uploading="isUploading"
      :save-error-message="saveErrorMessage"
      @close="closeForm"
      @save-category="saveForm"
      @select-image="uploadCategoryImage"
    />
    <AppConfirmDialog
      :is-open="Boolean(itemPendingDelete)"
      message="Dishes in this category must be moved or deleted first. This cannot be undone."
      :is-confirming="isDeleting"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>
