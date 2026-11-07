<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import AppButton from '~/common/widgets/AppButton.vue';
import AppConfirmDialog from '~/common/widgets/AppConfirmDialog.vue';
import AppEmptyState from '~/common/widgets/AppEmptyState.vue';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppPageHeader from '~/common/widgets/AppPageHeader.vue';
import { useGalleryAlbumsController } from '../controller/useGalleryAlbumsController';
import GalleryAlbumsFormDialog from './widgets/GalleryAlbumsFormDialog.vue';
import GalleryAlbumsGrid from './widgets/GalleryAlbumsGrid.vue';

const {
  items: albums,
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
  uploadCoverImage,
} = useGalleryAlbumsController();
</script>

<template>
  <div>
    <AppPageHeader
      title="Gallery"
      description="Albums of rooms, the hall, past events, food and the building."
    >
      <template #actions>
        <AppButton @click="openCreateForm">{{ AppStrings.actions.add }} album</AppButton>
      </template>
    </AppPageHeader>

    <AppLoader v-if="isLoading" />
    <AppErrorState v-else-if="hasError" @retry="reloadItems" />
    <AppEmptyState v-else-if="isEmpty" message="No albums yet." />
    <GalleryAlbumsGrid
      v-else
      :albums="albums"
      @edit-album="openEditForm"
      @delete-album="requestDelete"
    />

    <GalleryAlbumsFormDialog
      v-model="form"
      :is-open="isFormOpen"
      :is-editing="isEditing"
      :form-errors="formErrors"
      :is-saving="isSaving"
      :is-uploading="isUploading"
      :save-error-message="saveErrorMessage"
      @close="closeForm"
      @save-album="saveForm"
      @select-cover="uploadCoverImage"
    />
    <AppConfirmDialog
      :is-open="Boolean(itemPendingDelete)"
      message="The album and all its photos are deleted. This cannot be undone."
      :is-confirming="isDeleting"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>
