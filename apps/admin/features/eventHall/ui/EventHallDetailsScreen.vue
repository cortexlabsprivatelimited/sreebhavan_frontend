<script setup lang="ts">
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLinkTabs from '~/common/widgets/AppLinkTabs.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppPageHeader from '~/common/widgets/AppPageHeader.vue';
import { useEventHallDetailsController } from '../controller/useEventHallDetailsController';
import { EventHallTabs } from '../model/eventHall.model';
import EventHallDetailsForm from './widgets/EventHallDetailsForm.vue';

const { form, formErrors, isLoading, hasError, isSaving, reloadHall, saveHallDetails } =
  useEventHallDetailsController();
</script>

<template>
  <div>
    <AppPageHeader
      title="Event hall"
      description="Sreebhavanam hall capacity, facilities and rules."
    />
    <AppLinkTabs :tabs="EventHallTabs" />

    <AppLoader v-if="isLoading" />
    <AppErrorState v-else-if="hasError" @retry="reloadHall" />
    <EventHallDetailsForm
      v-else
      v-model="form"
      :form-errors="formErrors"
      :is-saving="isSaving"
      @save-hall="saveHallDetails"
    />
  </div>
</template>
