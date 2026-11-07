<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import AppButton from '~/common/widgets/AppButton.vue';

withDefaults(defineProps<{ canDelete?: boolean }>(), { canDelete: true });
const emit = defineEmits<{ edit: []; delete: [] }>();
</script>

<template>
  <div class="flex justify-end gap-1">
    <slot />
    <AppButton variant="ghost" size="sm" @click="emit('edit')">
      {{ AppStrings.actions.edit }}
    </AppButton>
    <AppButton v-if="canDelete" variant="dangerGhost" size="sm" @click="emit('delete')">
      {{ AppStrings.actions.delete }}
    </AppButton>
  </div>
</template>
