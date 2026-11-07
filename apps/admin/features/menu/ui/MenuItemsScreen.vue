<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import AppButton from '~/common/widgets/AppButton.vue';
import AppConfirmDialog from '~/common/widgets/AppConfirmDialog.vue';
import AppEmptyState from '~/common/widgets/AppEmptyState.vue';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLinkTabs from '~/common/widgets/AppLinkTabs.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppPageHeader from '~/common/widgets/AppPageHeader.vue';
import { useMenuItemsController } from '../controller/useMenuItemsController';
import { MenuTabs } from '../model/menu.model';
import MenuItemsFilters from './widgets/MenuItemsFilters.vue';
import MenuItemsFormDialog from './widgets/MenuItemsFormDialog.vue';
import MenuItemsTable from './widgets/MenuItemsTable.vue';

const {
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
  openEditForm,
  closeForm,
  saveForm,
  itemPendingDelete,
  isDeleting,
  requestDelete,
  cancelDelete,
  confirmDelete,
  categoryOptions,
  getCategoryName,
  selectedCategoryId,
  searchText,
  isSpecialsOnly,
  filteredItems,
  openCreateFormInCategory,
  isUploading,
  uploadItemImage,
  toggleItemFlag,
} = useMenuItemsController();
</script>

<template>
  <div>
    <AppPageHeader
      title="Menu"
      description="Sreebhavan Veg Hotel dishes, prices and today's specials."
    >
      <template #actions>
        <AppButton @click="openCreateFormInCategory"
          >{{ AppStrings.actions.add }} food item</AppButton
        >
      </template>
    </AppPageHeader>
    <AppLinkTabs :tabs="MenuTabs" />

    <AppLoader v-if="isLoading" />
    <AppErrorState v-else-if="hasError" @retry="reloadItems" />
    <AppEmptyState
      v-else-if="isEmpty"
      message="No food items yet. Add categories first, then dishes."
    />
    <template v-else>
      <MenuItemsFilters
        v-model:category-id="selectedCategoryId"
        v-model:search="searchText"
        v-model:specials-only="isSpecialsOnly"
        :category-options="categoryOptions"
      />
      <AppEmptyState v-if="filteredItems.length === 0" message="No dishes match these filters." />
      <MenuItemsTable
        v-else
        :menu-items="filteredItems"
        :get-category-name="getCategoryName"
        @edit-item="openEditForm"
        @delete-item="requestDelete"
        @toggle-flag="toggleItemFlag"
      />
    </template>

    <MenuItemsFormDialog
      v-model="form"
      :is-open="isFormOpen"
      :is-editing="isEditing"
      :form-errors="formErrors"
      :category-options="categoryOptions"
      :is-saving="isSaving"
      :is-uploading="isUploading"
      :save-error-message="saveErrorMessage"
      @close="closeForm"
      @save-item="saveForm"
      @select-image="uploadItemImage"
    />
    <AppConfirmDialog
      :is-open="Boolean(itemPendingDelete)"
      :is-confirming="isDeleting"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>
