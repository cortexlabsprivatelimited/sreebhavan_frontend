<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import type { FormErrors } from '~/common/types/form';
import AppButton from '~/common/widgets/AppButton.vue';
import AppImageField from '~/common/widgets/AppImageField.vue';
import AppModal from '~/common/widgets/AppModal.vue';
import AppTextArea from '~/common/widgets/AppTextArea.vue';
import AppTextField from '~/common/widgets/AppTextField.vue';
import AppToggle from '~/common/widgets/AppToggle.vue';
import { SeoLimits, SeoPageKeyExamples, type SeoMetaForm } from '../../model/seo.model';

defineProps<{
  isOpen: boolean;
  isEditing: boolean;
  formErrors: FormErrors<SeoMetaForm>;
  isSaving: boolean;
  isUploading: boolean;
  saveErrorMessage: string | null;
}>();
const form = defineModel<SeoMetaForm>({ required: true });
const emit = defineEmits<{ close: []; 'save-seo': []; 'select-og-image': [file: File] }>();

const pageKeyHint = `Pages: ${SeoPageKeyExamples.join(', ')}. Items: room/<slug>, menu/<category-slug>, gallery/<album-slug>.`;
</script>

<template>
  <AppModal
    :is-open="isOpen"
    :title="isEditing ? 'Edit SEO' : 'Add SEO for a page'"
    size="lg"
    @close="emit('close')"
  >
    <form id="seo-form" class="flex flex-col gap-4" novalidate @submit.prevent="emit('save-seo')">
      <AppTextField
        v-model="form.pageKey"
        label="Page key"
        :hint="pageKeyHint"
        :error="formErrors.pageKey"
        is-required
      />
      <AppTextField
        v-model="form.title"
        label="Meta title"
        :hint="`${form.title.length}/${SeoLimits.title} characters. Put the main keyword first.`"
        :error="formErrors.title"
        is-required
      />
      <AppTextArea
        v-model="form.description"
        label="Meta description"
        :rows="3"
        :hint="`${form.description.length}/${SeoLimits.description} characters.`"
        :error="formErrors.description"
      />
      <AppTextField
        v-model="form.keywords"
        label="Keywords"
        hint="Comma separated, e.g. veg hotel in town, kerala meals"
      />
      <AppImageField
        label="Share image (Open Graph)"
        hint="Shown when the link is shared on WhatsApp or Facebook. 1200 × 630 px works best."
        :file-url="form.ogImageUrl || null"
        :preview-alt="form.title"
        :is-uploading="isUploading"
        @select-file="emit('select-og-image', $event)"
        @remove-file="form.ogImageUrl = ''"
      />
      <AppToggle v-model="form.isNoindex" label="Hide this page from Google (noindex)" />
      <p v-if="saveErrorMessage" :class="TextStyles.errorText" role="alert">
        {{ saveErrorMessage }}
      </p>
    </form>
    <template #footer>
      <AppButton variant="secondary" @click="emit('close')">{{
        AppStrings.actions.cancel
      }}</AppButton>
      <AppButton type="submit" form="seo-form" :is-loading="isSaving" :is-disabled="isUploading">{{
        AppStrings.actions.save
      }}</AppButton>
    </template>
  </AppModal>
</template>
