<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import type { SelectOption } from '~/common/types/api';
import type { FormErrors } from '~/common/types/form';
import AppButton from '~/common/widgets/AppButton.vue';
import AppImageField from '~/common/widgets/AppImageField.vue';
import AppModal from '~/common/widgets/AppModal.vue';
import AppSelectField from '~/common/widgets/AppSelectField.vue';
import AppTextArea from '~/common/widgets/AppTextArea.vue';
import AppTextField from '~/common/widgets/AppTextField.vue';
import AppToggle from '~/common/widgets/AppToggle.vue';
import type { MenuItemForm } from '../../model/menu.model';

defineProps<{
  isOpen: boolean;
  isEditing: boolean;
  formErrors: FormErrors<MenuItemForm>;
  categoryOptions: SelectOption[];
  isSaving: boolean;
  isUploading: boolean;
  saveErrorMessage: string | null;
}>();
const form = defineModel<MenuItemForm>({ required: true });
const emit = defineEmits<{ close: []; 'save-item': []; 'select-image': [file: File] }>();
</script>

<template>
  <AppModal
    :is-open="isOpen"
    :title="isEditing ? 'Edit food item' : 'Add food item'"
    size="lg"
    @close="emit('close')"
  >
    <form
      id="menu-item-form"
      class="grid gap-4 sm:grid-cols-2"
      novalidate
      @submit.prevent="emit('save-item')"
    >
      <AppTextField
        v-model="form.name"
        label="Name (English)"
        :error="formErrors.name"
        is-required
      />
      <AppTextField v-model="form.nameMl" label="Name (Malayalam)" placeholder="മസാല ദോശ" />
      <AppSelectField
        v-model="form.categoryId"
        label="Category"
        :options="categoryOptions"
        placeholder="Choose a category"
        :error="formErrors.categoryId"
        is-required
      />
      <AppTextField
        v-model.number="form.price"
        label="Price (₹)"
        type="number"
        :error="formErrors.price"
        is-required
      />
      <AppTextField
        v-model="form.slug"
        class="sm:col-span-2"
        :label="AppStrings.fields.slug"
        :hint="isEditing ? 'Changing the slug changes the page URL.' : undefined"
        :error="formErrors.slug"
        is-required
      />
      <AppTextArea v-model="form.description" class="sm:col-span-2" label="Description" :rows="3" />
      <AppImageField
        class="sm:col-span-2"
        label="Photo"
        :file-url="form.imageUrl || null"
        :preview-alt="form.name"
        :is-uploading="isUploading"
        @select-file="emit('select-image', $event)"
        @remove-file="form.imageUrl = ''"
      />
      <AppTextField
        v-model.number="form.sortOrder"
        :label="AppStrings.fields.sortOrder"
        type="number"
      />
      <div class="flex flex-col justify-end gap-3">
        <AppToggle v-model="form.isAvailable" label="Available" />
        <AppToggle v-model="form.isSpecial" label="Today's special" />
      </div>
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
        form="menu-item-form"
        :is-loading="isSaving"
        :is-disabled="isUploading"
        >{{ AppStrings.actions.save }}</AppButton
      >
    </template>
  </AppModal>
</template>
