<script setup lang="ts">
import AppEmptyState from '~/common/widgets/AppEmptyState.vue';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppPageHeader from '~/common/widgets/AppPageHeader.vue';
import { useBusinessesController } from '../controller/useBusinessesController';
import BusinessesCard from './widgets/BusinessesCard.vue';
import BusinessesFormDialog from './widgets/BusinessesFormDialog.vue';

const {
  items: businesses,
  isLoading,
  hasError,
  isEmpty,
  reloadItems,
  isFormOpen,
  form,
  formErrors,
  isSaving,
  saveErrorMessage,
  openEditForm,
  closeForm,
  saveForm,
  isUploading,
  uploadBusinessLogo,
  addTimingRow,
  removeTimingRow,
} = useBusinessesController();
</script>

<template>
  <div>
    <AppPageHeader
      title="Businesses"
      description="Sreebhavan Veg Hotel and Sreebhavanam: logo, about text, WhatsApp number and timings."
    />

    <AppLoader v-if="isLoading" />
    <AppErrorState v-else-if="hasError" @retry="reloadItems" />
    <AppEmptyState
      v-else-if="isEmpty"
      message="No businesses found. They are created when the API is set up."
    />
    <div v-else class="grid gap-6 lg:grid-cols-2">
      <BusinessesCard
        v-for="business in businesses"
        :key="business.id"
        :business="business"
        @edit-business="openEditForm"
      />
    </div>

    <BusinessesFormDialog
      v-model="form"
      :is-open="isFormOpen"
      :form-errors="formErrors"
      :is-saving="isSaving"
      :is-uploading="isUploading"
      :save-error-message="saveErrorMessage"
      @close="closeForm"
      @save-business="saveForm"
      @select-logo="uploadBusinessLogo"
      @add-timing="addTimingRow"
      @remove-timing="removeTimingRow"
    />
  </div>
</template>
