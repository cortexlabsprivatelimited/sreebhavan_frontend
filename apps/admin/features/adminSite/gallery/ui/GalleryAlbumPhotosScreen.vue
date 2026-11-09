<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';
import AppConfirmDialog from '~/common/widgets/AppConfirmDialog.vue';
import AppEmptyState from '~/common/widgets/AppEmptyState.vue';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppPageHeader from '~/common/widgets/AppPageHeader.vue';
import { useGalleryAlbumPhotosController } from '../controller/useGalleryAlbumPhotosController';
import GalleryBulkUploadPanel from './widgets/GalleryBulkUploadPanel.vue';
import GalleryImageEditDialog from './widgets/GalleryImageEditDialog.vue';
import GalleryImagesGrid from './widgets/GalleryImagesGrid.vue';

const props = defineProps<{ albumId: string }>();

const {
  album,
  images,
  isLoading,
  hasError,
  isEmpty,
  reloadImages,
  pendingUploads,
  isSavingUploads,
  canSaveUploads,
  hasMissingAlt,
  queueFiles,
  removePendingUpload,
  savePendingUploads,
  editingImage,
  editForm,
  editAltError,
  isSavingEdit,
  openImageEditor,
  closeImageEditor,
  saveImageEdit,
  imagePendingDelete,
  isDeleting,
  requestDeleteImage,
  cancelDeleteImage,
  confirmDeleteImage,
  setAsCover,
} = useGalleryAlbumPhotosController(props.albumId);
</script>

<template>
  <div>
    <NuxtLink to="/admin/gallery" :class="TextStyles.linkSmall">← All albums</NuxtLink>
    <AppPageHeader
      class="mt-2"
      :title="album?.title ?? 'Album'"
      :description="`${images.length} photos`"
    />

    <GalleryBulkUploadPanel
      v-model="pendingUploads"
      class="mb-6"
      :is-saving="isSavingUploads"
      :can-save="canSaveUploads"
      :has-missing-alt="hasMissingAlt"
      @select-files="queueFiles"
      @remove-upload="removePendingUpload"
      @save-uploads="savePendingUploads"
    />

    <AppLoader v-if="isLoading" />
    <AppErrorState v-else-if="hasError" @retry="reloadImages" />
    <AppEmptyState v-else-if="isEmpty" message="No photos in this album yet." />
    <GalleryImagesGrid
      v-else
      :images="images"
      :cover-url="album?.coverUrl ?? ''"
      @edit-image="openImageEditor"
      @delete-image="requestDeleteImage"
      @set-cover="setAsCover"
    />

    <GalleryImageEditDialog
      v-model="editForm"
      :image="editingImage"
      :alt-error="editAltError"
      :is-saving="isSavingEdit"
      @close="closeImageEditor"
      @save-image="saveImageEdit"
    />
    <AppConfirmDialog
      :is-open="Boolean(imagePendingDelete)"
      :is-confirming="isDeleting"
      @confirm="confirmDeleteImage"
      @cancel="cancelDeleteImage"
    />
  </div>
</template>
