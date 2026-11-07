<script setup lang="ts">
import type { FormErrors } from '~/common/types/form';
import AppCard from '~/common/widgets/AppCard.vue';
import AppTextField from '~/common/widgets/AppTextField.vue';
import type { SiteSettings } from '../../model/siteSettings.model';

defineProps<{ formErrors: FormErrors<SiteSettings> }>();
const form = defineModel<SiteSettings>({ required: true });
</script>

<template>
  <div class="grid gap-6 lg:grid-cols-2">
    <AppCard title="Social links">
      <div class="flex flex-col gap-4">
        <AppTextField
          v-model="form.facebookUrl"
          label="Facebook"
          type="url"
          :error="formErrors.facebookUrl"
        />
        <AppTextField
          v-model="form.instagramUrl"
          label="Instagram"
          type="url"
          :error="formErrors.instagramUrl"
        />
        <AppTextField
          v-model="form.youtubeUrl"
          label="YouTube"
          type="url"
          :error="formErrors.youtubeUrl"
        />
      </div>
    </AppCard>
    <AppCard
      title="Google tools"
      description="Set up at launch. The developer can help find these IDs."
    >
      <div class="flex flex-col gap-4">
        <AppTextField
          v-model="form.googleAnalyticsId"
          label="Google Analytics 4 ID"
          placeholder="G-XXXXXXXXXX"
          :error="formErrors.googleAnalyticsId"
        />
        <AppTextField
          v-model="form.searchConsoleVerification"
          label="Search Console verification code"
          hint="The content value of the google-site-verification meta tag."
        />
      </div>
    </AppCard>
  </div>
</template>
