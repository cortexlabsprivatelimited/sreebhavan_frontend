<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import AppButton from '~/common/widgets/AppButton.vue';
import AppConfirmDialog from '~/common/widgets/AppConfirmDialog.vue';
import AppEmptyState from '~/common/widgets/AppEmptyState.vue';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppPageHeader from '~/common/widgets/AppPageHeader.vue';
import { useFaqsController } from '../controller/useFaqsController';
import FaqsFormDialog from './widgets/FaqsFormDialog.vue';
import FaqsList from './widgets/FaqsList.vue';

const {
  items: faqs,
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
} = useFaqsController();
</script>

<template>
  <div>
    <AppPageHeader
      title="FAQs"
      description="Questions and answers on the FAQ page (also shown in Google results)."
    >
      <template #actions>
        <AppButton @click="openCreateForm">{{ AppStrings.actions.add }} FAQ</AppButton>
      </template>
    </AppPageHeader>

    <AppLoader v-if="isLoading" />
    <AppErrorState v-else-if="hasError" @retry="reloadItems" />
    <AppEmptyState v-else-if="isEmpty" message="No FAQs yet." />
    <FaqsList
      v-else
      :faqs="faqs"
      :get-business-name="getBusinessName"
      @edit-faq="openEditForm"
      @delete-faq="requestDelete"
    />

    <FaqsFormDialog
      v-model="form"
      :is-open="isFormOpen"
      :is-editing="isEditing"
      :form-errors="formErrors"
      :business-options="businessSelectOptions"
      :is-saving="isSaving"
      :save-error-message="saveErrorMessage"
      @close="closeForm"
      @save-faq="saveForm"
    />
    <AppConfirmDialog
      :is-open="Boolean(itemPendingDelete)"
      :is-confirming="isDeleting"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>
