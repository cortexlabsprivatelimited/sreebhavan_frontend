<script setup lang="ts">
import type { FormErrors } from '~/common/types/form';
import AppCard from '~/common/widgets/AppCard.vue';
import AppTextArea from '~/common/widgets/AppTextArea.vue';
import AppTextField from '~/common/widgets/AppTextField.vue';
import type { SiteSettings } from '../../model/siteSettings.model';

defineProps<{ formErrors: FormErrors<SiteSettings> }>();
const form = defineModel<SiteSettings>({ required: true });
</script>

<template>
  <AppCard
    title="Contact and location"
    description="Use the exact same name, address and phone as on Google Business Profile."
  >
    <div class="grid gap-4 md:grid-cols-2">
      <AppTextField
        v-model="form.contactPhone"
        label="Phone"
        type="tel"
        :error="formErrors.contactPhone"
      />
      <AppTextField
        v-model="form.contactEmail"
        label="Email"
        type="email"
        :error="formErrors.contactEmail"
      />
      <AppTextArea v-model="form.address" class="md:col-span-2" label="Address" :rows="3" />
      <AppTextField
        v-model="form.mapEmbedUrl"
        label="Google Maps embed link"
        hint="Google Maps → Share → Embed a map → copy the src link."
        :error="formErrors.mapEmbedUrl"
      />
      <AppTextField
        v-model="form.mapLinkUrl"
        label="Google Maps link (directions)"
        :error="formErrors.mapLinkUrl"
      />
      <AppTextArea v-model="form.footerText" class="md:col-span-2" label="Footer text" :rows="2" />
    </div>
  </AppCard>
</template>
