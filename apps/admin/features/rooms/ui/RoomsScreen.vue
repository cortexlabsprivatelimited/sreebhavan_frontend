<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import AppButton from '~/common/widgets/AppButton.vue';
import AppConfirmDialog from '~/common/widgets/AppConfirmDialog.vue';
import AppEmptyState from '~/common/widgets/AppEmptyState.vue';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppPageHeader from '~/common/widgets/AppPageHeader.vue';
import { useRoomsController } from '../controller/useRoomsController';
import RoomsFormDialog from './widgets/RoomsFormDialog.vue';
import RoomsTable from './widgets/RoomsTable.vue';

const {
  items: rooms,
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
  isUploadingPhotos,
  addFormPhotos,
  removeFormPhoto,
} = useRoomsController();
</script>

<template>
  <div>
    <AppPageHeader
      title="Rooms"
      description="Sreebhavanam room types, prices, amenities and photos."
    >
      <template #actions>
        <AppButton @click="openCreateForm">{{ AppStrings.actions.add }} room type</AppButton>
      </template>
    </AppPageHeader>

    <AppLoader v-if="isLoading" />
    <AppErrorState v-else-if="hasError" @retry="reloadItems" />
    <AppEmptyState v-else-if="isEmpty" message="No room types yet." />
    <RoomsTable v-else :rooms="rooms" @edit-room="openEditForm" @delete-room="requestDelete" />

    <RoomsFormDialog
      v-model="form"
      :is-open="isFormOpen"
      :is-editing="isEditing"
      :form-errors="formErrors"
      :is-saving="isSaving"
      :save-error-message="saveErrorMessage"
      :is-uploading-photos="isUploadingPhotos"
      @close="closeForm"
      @save-room="saveForm"
      @select-photos="addFormPhotos"
      @remove-photo="removeFormPhoto"
    />
    <AppConfirmDialog
      :is-open="Boolean(itemPendingDelete)"
      :is-confirming="isDeleting"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>
