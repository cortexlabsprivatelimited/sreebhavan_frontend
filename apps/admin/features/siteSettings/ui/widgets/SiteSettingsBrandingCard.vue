<script setup lang="ts">
import AppCard from '~/common/widgets/AppCard.vue';
import AppImageField from '~/common/widgets/AppImageField.vue';
import type { SiteSettings, SiteSettingsImageField } from '../../model/siteSettings.model';

defineProps<{ uploadingField: SiteSettingsImageField | null }>();
const form = defineModel<SiteSettings>({ required: true });
const emit = defineEmits<{ 'select-image': [field: SiteSettingsImageField, file: File] }>();
</script>

<template>
  <AppCard title="Branding" description="Each business has its own logo under Businesses.">
    <div class="grid gap-4 md:grid-cols-2">
      <AppImageField
        label="Main brand logo"
        hint="SVG or PNG with a transparent background."
        accept="image/svg+xml,image/png,image/webp"
        :file-url="form.brandLogoUrl || null"
        preview-alt="Brand logo"
        :is-uploading="uploadingField === 'brandLogoUrl'"
        @select-file="emit('select-image', 'brandLogoUrl', $event)"
        @remove-file="form.brandLogoUrl = ''"
      />
      <AppImageField
        label="Favicon"
        hint="Square, at least 64 × 64 px."
        accept="image/png,image/x-icon,image/svg+xml"
        :file-url="form.faviconUrl || null"
        preview-alt="Favicon"
        :is-uploading="uploadingField === 'faviconUrl'"
        @select-file="emit('select-image', 'faviconUrl', $event)"
        @remove-file="form.faviconUrl = ''"
      />
    </div>
  </AppCard>
</template>
