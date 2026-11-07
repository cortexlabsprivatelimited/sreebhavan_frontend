<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import AppButton from '~/common/widgets/AppButton.vue';
import AppConfirmDialog from '~/common/widgets/AppConfirmDialog.vue';
import AppEmptyState from '~/common/widgets/AppEmptyState.vue';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppPageHeader from '~/common/widgets/AppPageHeader.vue';
import { useSeoController } from '../controller/useSeoController';
import SeoFormDialog from './widgets/SeoFormDialog.vue';
import SeoTable from './widgets/SeoTable.vue';

const {
  items: seoEntries,
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
  uploadOgImage,
} = useSeoController();
</script>

<template>
  <div>
    <AppPageHeader
      title="SEO"
      description="Titles and descriptions Google shows for each page. Analytics and Search Console IDs are in Site settings."
    >
      <template #actions>
        <AppButton @click="openCreateForm">{{ AppStrings.actions.add }} page SEO</AppButton>
      </template>
    </AppPageHeader>

    <AppLoader v-if="isLoading" />
    <AppErrorState v-else-if="hasError" @retry="reloadItems" />
    <AppEmptyState
      v-else-if="isEmpty"
      message="No SEO entries yet. Pages use their default titles."
    />
    <SeoTable
      v-else
      :seo-entries="seoEntries"
      @edit-seo="openEditForm"
      @delete-seo="requestDelete"
    />

    <SeoFormDialog
      v-model="form"
      :is-open="isFormOpen"
      :is-editing="isEditing"
      :form-errors="formErrors"
      :is-saving="isSaving"
      :is-uploading="isUploading"
      :save-error-message="saveErrorMessage"
      @close="closeForm"
      @save-seo="saveForm"
      @select-og-image="uploadOgImage"
    />
    <AppConfirmDialog
      :is-open="Boolean(itemPendingDelete)"
      :is-confirming="isDeleting"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>
