<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import AppButton from '~/common/widgets/AppButton.vue';
import AppConfirmDialog from '~/common/widgets/AppConfirmDialog.vue';
import AppEmptyState from '~/common/widgets/AppEmptyState.vue';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLinkTabs from '~/common/widgets/AppLinkTabs.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppPageHeader from '~/common/widgets/AppPageHeader.vue';
import { useHallPackagesController } from '../controller/useHallPackagesController';
import { EventHallTabs } from '../model/eventHall.model';
import HallPackagesFormDialog from './widgets/HallPackagesFormDialog.vue';
import HallPackagesList from './widgets/HallPackagesList.vue';

const {
  items: hallPackages,
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
} = useHallPackagesController();
</script>

<template>
  <div>
    <AppPageHeader
      title="Event hall"
      description="Packages and prices shown on the event hall page."
    >
      <template #actions>
        <AppButton @click="openCreateForm">{{ AppStrings.actions.add }} package</AppButton>
      </template>
    </AppPageHeader>
    <AppLinkTabs :tabs="EventHallTabs" />

    <AppLoader v-if="isLoading" />
    <AppErrorState v-else-if="hasError" @retry="reloadItems" />
    <AppEmptyState v-else-if="isEmpty" message="No packages yet." />
    <HallPackagesList
      v-else
      :hall-packages="hallPackages"
      @edit-package="openEditForm"
      @delete-package="requestDelete"
    />

    <HallPackagesFormDialog
      v-model="form"
      :is-open="isFormOpen"
      :is-editing="isEditing"
      :form-errors="formErrors"
      :is-saving="isSaving"
      :save-error-message="saveErrorMessage"
      @close="closeForm"
      @save-package="saveForm"
    />
    <AppConfirmDialog
      :is-open="Boolean(itemPendingDelete)"
      :is-confirming="isDeleting"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>
