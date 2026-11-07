<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import type { FormErrors } from '~/common/types/form';
import AppButton from '~/common/widgets/AppButton.vue';
import AppModal from '~/common/widgets/AppModal.vue';
import AppTextArea from '~/common/widgets/AppTextArea.vue';
import AppTextField from '~/common/widgets/AppTextField.vue';
import AppToggle from '~/common/widgets/AppToggle.vue';
import type { RoomForm, RoomFormPhoto } from '../../model/rooms.model';
import RoomsPhotosField from './RoomsPhotosField.vue';

defineProps<{
  isOpen: boolean;
  isEditing: boolean;
  formErrors: FormErrors<RoomForm>;
  isSaving: boolean;
  saveErrorMessage: string | null;
  isUploadingPhotos: boolean;
}>();
const form = defineModel<RoomForm>({ required: true });
const emit = defineEmits<{
  close: [];
  'save-room': [];
  'select-photos': [files: File[]];
  'remove-photo': [photo: RoomFormPhoto];
}>();
</script>

<template>
  <AppModal
    :is-open="isOpen"
    :title="isEditing ? 'Edit room type' : 'Add room type'"
    size="lg"
    @close="emit('close')"
  >
    <form
      id="room-form"
      class="grid gap-4 sm:grid-cols-2"
      novalidate
      @submit.prevent="emit('save-room')"
    >
      <AppTextField
        v-model="form.name"
        label="Room type"
        placeholder="Deluxe AC Room"
        :error="formErrors.name"
        is-required
      />
      <AppTextField
        v-model="form.slug"
        :label="AppStrings.fields.slug"
        :hint="
          isEditing ? 'Changing the slug changes the page URL.' : `/sreebhavanam/rooms/${form.slug}`
        "
        :error="formErrors.slug"
        is-required
      />
      <AppTextField
        v-model.number="form.pricePerNight"
        label="Price per night (₹)"
        type="number"
        :error="formErrors.pricePerNight"
        is-required
      />
      <AppTextField
        v-model.number="form.capacity"
        label="Guests"
        type="number"
        :error="formErrors.capacity"
        is-required
      />
      <AppTextField
        v-model="form.amenitiesText"
        class="sm:col-span-2"
        label="Amenities"
        hint="Comma separated, e.g. AC, Wi-Fi, TV, Hot water"
      />
      <AppTextArea v-model="form.description" class="sm:col-span-2" label="Description" :rows="4" />
      <RoomsPhotosField
        v-model="form.photos"
        class="sm:col-span-2"
        :is-uploading="isUploadingPhotos"
        :error="formErrors.photos"
        @select-files="emit('select-photos', $event)"
        @remove-photo="emit('remove-photo', $event)"
      />
      <AppToggle v-model="form.isActive" label="Show on website" />
      <p v-if="saveErrorMessage" :class="[TextStyles.errorText, 'sm:col-span-2']" role="alert">
        {{ saveErrorMessage }}
      </p>
    </form>
    <template #footer>
      <AppButton variant="secondary" @click="emit('close')">{{
        AppStrings.actions.cancel
      }}</AppButton>
      <AppButton
        type="submit"
        form="room-form"
        :is-loading="isSaving"
        :is-disabled="isUploadingPhotos"
        >{{ AppStrings.actions.save }}</AppButton
      >
    </template>
  </AppModal>
</template>
