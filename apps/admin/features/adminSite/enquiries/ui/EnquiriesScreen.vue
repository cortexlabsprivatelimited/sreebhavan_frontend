<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import AppButton from '~/common/widgets/AppButton.vue';
import AppEmptyState from '~/common/widgets/AppEmptyState.vue';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppPageHeader from '~/common/widgets/AppPageHeader.vue';
import AppPagination from '~/common/widgets/AppPagination.vue';
import { useEnquiriesController } from '../controller/useEnquiriesController';
import EnquiriesDetailDialog from './widgets/EnquiriesDetailDialog.vue';
import EnquiriesFilters from './widgets/EnquiriesFilters.vue';
import EnquiriesTable from './widgets/EnquiriesTable.vue';

const {
  filters,
  page,
  pageSize,
  enquiries,
  totalCount,
  isLoading,
  hasError,
  isEmpty,
  reloadEnquiries,
  applySearch,
  changePage,
  selectedEnquiry,
  updateForm,
  isSaving,
  openEnquiry,
  closeEnquiry,
  saveEnquiryUpdate,
  selectedEnquiryWhatsAppUrl,
  isExporting,
  exportCsv,
} = useEnquiriesController();
</script>

<template>
  <div>
    <AppPageHeader
      title="Enquiries"
      description="Room, hall and hotel enquiries from the website. Every enquiry is saved before WhatsApp opens."
    >
      <template #actions>
        <AppButton variant="secondary" :is-loading="isExporting" @click="exportCsv">{{
          AppStrings.actions.exportCsv
        }}</AppButton>
      </template>
    </AppPageHeader>

    <EnquiriesFilters v-model="filters" @apply-search="applySearch" />

    <AppLoader v-if="isLoading" />
    <AppErrorState v-else-if="hasError" @retry="reloadEnquiries" />
    <AppEmptyState v-else-if="isEmpty" message="No enquiries match these filters." />
    <template v-else>
      <EnquiriesTable :enquiries="enquiries" @open-enquiry="openEnquiry" />
      <AppPagination
        :page="page"
        :page-size="pageSize"
        :total="totalCount"
        @change-page="changePage"
      />
    </template>

    <EnquiriesDetailDialog
      v-model="updateForm"
      :enquiry="selectedEnquiry"
      :whats-app-url="selectedEnquiryWhatsAppUrl"
      :is-saving="isSaving"
      @close="closeEnquiry"
      @save-enquiry="saveEnquiryUpdate"
    />
  </div>
</template>
