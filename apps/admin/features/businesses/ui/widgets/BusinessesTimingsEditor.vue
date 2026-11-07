<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import AppButton from '~/common/widgets/AppButton.vue';
import AppTextField from '~/common/widgets/AppTextField.vue';
import type { BusinessTiming } from '../../model/businesses.model';

const timings = defineModel<BusinessTiming[]>({ required: true });
const emit = defineEmits<{ 'add-timing': []; 'remove-timing': [index: number] }>();
</script>

<template>
  <fieldset class="flex flex-col gap-3">
    <legend :class="[TextStyles.label, 'mb-2']">Timings</legend>
    <div
      v-for="(timing, index) in timings"
      :key="index"
      class="grid items-end gap-3 sm:grid-cols-[1fr_1fr_auto]"
    >
      <AppTextField v-model="timing.label" label="Days" placeholder="Mon – Sat" />
      <AppTextField v-model="timing.hours" label="Hours" placeholder="6:00 am – 10:00 pm" />
      <AppButton variant="ghost" size="sm" @click="emit('remove-timing', index)">{{
        AppStrings.actions.removeImage
      }}</AppButton>
    </div>
    <AppButton class="self-start" variant="secondary" size="sm" @click="emit('add-timing')"
      >Add timing</AppButton
    >
  </fieldset>
</template>
