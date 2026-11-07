<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import AppButton from '~/common/widgets/AppButton.vue';
import AppConfirmDialog from '~/common/widgets/AppConfirmDialog.vue';
import AppEmptyState from '~/common/widgets/AppEmptyState.vue';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppPageHeader from '~/common/widgets/AppPageHeader.vue';
import { useBannersController } from '../controller/useBannersController';
import BannersFormDialog from './widgets/BannersFormDialog.vue';
import BannersTable from './widgets/BannersTable.vue';

const {
  items: banners,
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
  businessSelectOptions,
  getBusinessName,
  isUploading,
  uploadBannerImage,
} = useBannersController();
</script>

<template>
  <div>
    <AppPageHeader title="Banners" description="Slider images on the home page and business pages.">
      <template #actions>
        <AppButton @click="openCreateForm">{{ AppStrings.actions.add }} banner</AppButton>
      </template>
    </AppPageHeader>

    <AppLoader v-if="isLoading" />
    <AppErrorState v-else-if="hasError" @retry="reloadItems" />
    <AppEmptyState v-else-if="isEmpty" message="No banners yet. Add the first slider image." />
    <BannersTable
      v-else
      :banners="banners"
      :get-business-name="getBusinessName"
      @edit-banner="openEditForm"
      @delete-banner="requestDelete"
    />

    <BannersFormDialog
      v-model="form"
      :is-open="isFormOpen"
      :is-editing="isEditing"
      :form-errors="formErrors"
      :business-options="businessSelectOptions"
      :is-saving="isSaving"
      :is-uploading="isUploading"
      :save-error-message="saveErrorMessage"
      @close="closeForm"
      @save-banner="saveForm"
      @select-image="uploadBannerImage"
    />
    <AppConfirmDialog
      :is-open="Boolean(itemPendingDelete)"
      :is-confirming="isDeleting"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>
