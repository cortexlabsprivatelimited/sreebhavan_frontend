<script setup lang="ts">
import type { SelectOption } from '~/common/types/api';
import AppSelectField from '~/common/widgets/AppSelectField.vue';
import AppTextField from '~/common/widgets/AppTextField.vue';
import AppToggle from '~/common/widgets/AppToggle.vue';

defineProps<{ categoryOptions: SelectOption[] }>();
const selectedCategoryId = defineModel<string>('categoryId', { required: true });
const searchText = defineModel<string>('search', { required: true });
const isSpecialsOnly = defineModel<boolean>('specialsOnly', { required: true });
</script>

<template>
  <div
    class="mb-4 grid items-end gap-4 rounded-2xl border border-border/70 bg-background shadow-card p-4 md:grid-cols-3"
  >
    <AppTextField
      :model-value="searchText"
      label="Search"
      placeholder="Dish name"
      @update:model-value="searchText = String($event ?? '')"
    />
    <AppSelectField
      v-model="selectedCategoryId"
      label="Category"
      :options="categoryOptions"
      placeholder="All categories"
    />
    <AppToggle v-model="isSpecialsOnly" label="Only today's specials" />
  </div>
</template>
