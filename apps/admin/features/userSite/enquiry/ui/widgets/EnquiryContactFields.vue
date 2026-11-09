<script setup lang="ts">
import type { FormErrors } from '~/common/types/form';
import AppTextField from '~/common/widgets/AppTextField.vue';
import type { EnquiryForm } from '../../model/enquiry.model';

defineProps<{ formErrors: FormErrors<EnquiryForm> }>();
const form = defineModel<EnquiryForm>({ required: true });
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2">
    <AppTextField
      v-model="form.name"
      label="Your name"
      autocomplete="name"
      :error="formErrors.name"
      is-required
    />
    <AppTextField
      v-model="form.phone"
      label="Phone / WhatsApp number"
      type="tel"
      autocomplete="tel"
      placeholder="98470 12345"
      :error="formErrors.phone"
      is-required
    />
    <AppTextField
      v-model="form.email"
      label="Email (optional)"
      type="email"
      autocomplete="email"
      :error="formErrors.email"
      class="sm:col-span-2"
    />
  </div>
</template>
