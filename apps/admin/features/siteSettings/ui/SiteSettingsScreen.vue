<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import AppButton from '~/common/widgets/AppButton.vue';
import AppErrorState from '~/common/widgets/AppErrorState.vue';
import AppLoader from '~/common/widgets/AppLoader.vue';
import AppPageHeader from '~/common/widgets/AppPageHeader.vue';
import { useSiteSettingsController } from '../controller/useSiteSettingsController';
import SiteSettingsBrandingCard from './widgets/SiteSettingsBrandingCard.vue';
import SiteSettingsContactCard from './widgets/SiteSettingsContactCard.vue';
import SiteSettingsLinksCard from './widgets/SiteSettingsLinksCard.vue';

const {
  form,
  formErrors,
  isLoading,
  hasError,
  isSaving,
  uploadingField,
  reloadSettings,
  uploadSettingImage,
  saveSettings,
} = useSiteSettingsController();
</script>

<template>
  <form novalidate @submit.prevent="saveSettings">
    <AppPageHeader
      title="Site settings"
      description="Logo, contact details, map, social links and Google tools for the whole website."
    >
      <template #actions>
        <AppButton type="submit" :is-loading="isSaving" :is-disabled="isLoading || hasError">{{
          AppStrings.actions.save
        }}</AppButton>
      </template>
    </AppPageHeader>

    <AppLoader v-if="isLoading" />
    <AppErrorState v-else-if="hasError" @retry="reloadSettings" />
    <div v-else class="flex flex-col gap-6">
      <SiteSettingsBrandingCard
        v-model="form"
        :uploading-field="uploadingField"
        @select-image="uploadSettingImage"
      />
      <SiteSettingsContactCard v-model="form" :form-errors="formErrors" />
      <SiteSettingsLinksCard v-model="form" :form-errors="formErrors" />
    </div>
  </form>
</template>
