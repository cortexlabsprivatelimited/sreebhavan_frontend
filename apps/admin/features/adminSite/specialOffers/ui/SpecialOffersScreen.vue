<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import AppButton from '~/common/widgets/AppButton.vue';
import AppConfirmDialog from '~/common/widgets/AppConfirmDialog.vue';
import AppEmptyState from '~/common/widgets/AppEmptyState.vue';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppPageHeader from '~/common/widgets/AppPageHeader.vue';
import { useSpecialOffersController } from '../controller/useSpecialOffersController';
import SpecialOffersFormDialog from './widgets/SpecialOffersFormDialog.vue';
import SpecialOffersTable from './widgets/SpecialOffersTable.vue';

const {
  items: specialOffers,
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
  uploadSpecialOfferImage,
} = useSpecialOffersController();
</script>

<template>
  <div>
    <AppPageHeader
      title="Special offers"
      description="Offers shown in the home page slideshow and highlighted in the Special offers section."
    >
      <template #actions>
        <AppButton @click="openCreateForm">{{ AppStrings.actions.add }} offer</AppButton>
      </template>
    </AppPageHeader>

    <AppLoader v-if="isLoading" />
    <AppErrorState v-else-if="hasError" @retry="reloadItems" />
    <AppEmptyState v-else-if="isEmpty" message="No special offers yet. Add the first offer." />
    <SpecialOffersTable
      v-else
      :special-offers="specialOffers"
      :get-business-name="getBusinessName"
      @edit-special-offer="openEditForm"
      @delete-special-offer="requestDelete"
    />

    <SpecialOffersFormDialog
      v-model="form"
      :is-open="isFormOpen"
      :is-editing="isEditing"
      :form-errors="formErrors"
      :business-options="businessSelectOptions"
      :is-saving="isSaving"
      :is-uploading="isUploading"
      :save-error-message="saveErrorMessage"
      @close="closeForm"
      @save-special-offer="saveForm"
      @select-image="uploadSpecialOfferImage"
    />
    <AppConfirmDialog
      :is-open="Boolean(itemPendingDelete)"
      :is-confirming="isDeleting"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>
