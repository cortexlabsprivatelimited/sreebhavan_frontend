<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import type { FormErrors } from '~/common/types/form';
import AppButton from '~/common/widgets/AppButton.vue';
import AppModal from '~/common/widgets/AppModal.vue';
import AppSelectField from '~/common/widgets/AppSelectField.vue';
import AppTextField from '~/common/widgets/AppTextField.vue';
import AppToggle from '~/common/widgets/AppToggle.vue';
import { AdminRoleOptions, type AdminUserForm } from '../../model/adminUsers.model';

defineProps<{
  isOpen: boolean;
  isEditing: boolean;
  isEditingSelf: boolean;
  formErrors: FormErrors<AdminUserForm>;
  isSaving: boolean;
  saveErrorMessage: string | null;
}>();
const form = defineModel<AdminUserForm>({ required: true });
const emit = defineEmits<{ close: []; 'save-user': [] }>();
</script>

<template>
  <AppModal
    :is-open="isOpen"
    :title="isEditing ? 'Edit admin user' : 'Invite admin user'"
    @close="emit('close')"
  >
    <form
      id="admin-user-form"
      class="flex flex-col gap-4"
      novalidate
      @submit.prevent="emit('save-user')"
    >
      <p v-if="!isEditing" :class="TextStyles.caption">
        They get an email with a link to set their password.
      </p>
      <AppTextField v-model="form.name" label="Name" :error="formErrors.name" is-required />
      <AppTextField
        v-model="form.email"
        label="Email"
        type="email"
        :is-disabled="isEditing"
        :error="formErrors.email"
        is-required
      />
      <AppSelectField
        :model-value="form.role"
        label="Role"
        :options="AdminRoleOptions"
        :is-disabled="isEditingSelf"
        @update:model-value="form.role = $event as AdminUserForm['role']"
      />
      <AppToggle v-if="!isEditingSelf" v-model="form.isActive" label="Can sign in" />
      <p v-else :class="TextStyles.caption">
        You can't change your own role or disable your own account.
      </p>
      <p v-if="saveErrorMessage" :class="TextStyles.errorText" role="alert">
        {{ saveErrorMessage }}
      </p>
    </form>
    <template #footer>
      <AppButton variant="secondary" @click="emit('close')">{{
        AppStrings.actions.cancel
      }}</AppButton>
      <AppButton type="submit" form="admin-user-form" :is-loading="isSaving">
        {{ isEditing ? AppStrings.actions.save : 'Send invite' }}
      </AppButton>
    </template>
  </AppModal>
</template>
