<script setup lang="ts">
import AppCard from '~/common/widgets/AppCard.vue';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLinkTabs from '~/common/widgets/AppLinkTabs.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppPageHeader from '~/common/widgets/AppPageHeader.vue';
import AppPhotoManager from '~/common/widgets/AppPhotoManager.vue';
import { useHallPhotosController } from '../controller/useHallPhotosController';
import { EventHallTabs } from '../model/eventHall.model';

const {
  photos,
  isLoading,
  hasError,
  reloadPhotos,
  isUploading,
  pendingPhotoUrl,
  pendingPhotoAlt,
  pendingAltError,
  isAddingPhoto,
  deletingPhotoId,
  resetPendingPhoto,
  uploadPendingPhoto,
  addHallPhoto,
  deletePhoto,
} = useHallPhotosController();
</script>

<template>
  <div>
    <AppPageHeader
      title="Event hall"
      description="Photos on the event hall page. Past event photos go in the Gallery."
    />
    <AppLinkTabs :tabs="EventHallTabs" />

    <AppLoader v-if="isLoading" />
    <AppErrorState v-else-if="hasError" @retry="reloadPhotos" />
    <AppCard v-else>
      <AppPhotoManager
        v-model:pending-alt="pendingPhotoAlt"
        :photos="photos"
        :pending-photo-url="pendingPhotoUrl"
        :pending-alt-error="pendingAltError"
        :is-uploading="isUploading"
        :is-adding-photo="isAddingPhoto"
        :deleting-photo-id="deletingPhotoId"
        @select-file="uploadPendingPhoto"
        @discard-pending="resetPendingPhoto"
        @add-photo="addHallPhoto"
        @delete-photo="deletePhoto"
      />
    </AppCard>
  </div>
</template>
