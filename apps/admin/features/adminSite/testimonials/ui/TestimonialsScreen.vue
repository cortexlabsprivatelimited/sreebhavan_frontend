<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import AppButton from '~/common/widgets/AppButton.vue';
import AppConfirmDialog from '~/common/widgets/AppConfirmDialog.vue';
import AppEmptyState from '~/common/widgets/AppEmptyState.vue';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppPageHeader from '~/common/widgets/AppPageHeader.vue';
import { useTestimonialsController } from '../controller/useTestimonialsController';
import TestimonialsFormDialog from './widgets/TestimonialsFormDialog.vue';
import TestimonialsTable from './widgets/TestimonialsTable.vue';

const {
  items: testimonials,
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
} = useTestimonialsController();
</script>

<template>
  <div>
    <AppPageHeader title="Testimonials" description="Customer reviews shown on the website.">
      <template #actions>
        <AppButton @click="openCreateForm">{{ AppStrings.actions.add }} testimonial</AppButton>
      </template>
    </AppPageHeader>

    <AppLoader v-if="isLoading" />
    <AppErrorState v-else-if="hasError" @retry="reloadItems" />
    <AppEmptyState v-else-if="isEmpty" message="No testimonials yet." />
    <TestimonialsTable
      v-else
      :testimonials="testimonials"
      :get-business-name="getBusinessName"
      @edit-testimonial="openEditForm"
      @delete-testimonial="requestDelete"
    />

    <TestimonialsFormDialog
      v-model="form"
      :is-open="isFormOpen"
      :is-editing="isEditing"
      :form-errors="formErrors"
      :business-options="businessSelectOptions"
      :is-saving="isSaving"
      :save-error-message="saveErrorMessage"
      @close="closeForm"
      @save-testimonial="saveForm"
    />
    <AppConfirmDialog
      :is-open="Boolean(itemPendingDelete)"
      :is-confirming="isDeleting"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>
