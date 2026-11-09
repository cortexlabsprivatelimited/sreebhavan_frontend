<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import type { FormErrors } from '~/common/types/form';
import AppButton from '~/common/widgets/AppButton.vue';
import AppCard from '~/common/widgets/AppCard.vue';
import AppTextArea from '~/common/widgets/AppTextArea.vue';
import AppTextField from '~/common/widgets/AppTextField.vue';
import type { EventHallForm } from '../../model/eventHall.model';

defineProps<{ formErrors: FormErrors<EventHallForm>; isSaving: boolean }>();
const form = defineModel<EventHallForm>({ required: true });
const emit = defineEmits<{ 'save-hall': [] }>();
</script>

<template>
  <AppCard>
    <form class="grid gap-4 md:grid-cols-2" novalidate @submit.prevent="emit('save-hall')">
      <AppTextField
        v-model="form.name"
        class="md:col-span-2"
        label="Hall name"
        :error="formErrors.name"
        is-required
      />
      <AppTextField
        v-model.number="form.seatingCapacity"
        label="Seating capacity"
        type="number"
        :error="formErrors.seatingCapacity"
        is-required
      />
      <AppTextField
        v-model.number="form.floatingCapacity"
        label="Floating capacity"
        type="number"
        hint="Guests at a standing / buffet event."
        :error="formErrors.floatingCapacity"
        is-required
      />
      <AppTextField
        v-model="form.facilitiesText"
        class="md:col-span-2"
        label="Facilities"
        hint="Comma separated, e.g. AC, Stage, Dining hall, Parking, Generator"
      />
      <AppTextArea
        v-model="form.rules"
        class="md:col-span-2"
        label="Rules"
        :rows="6"
        hint="One rule per line."
      />
      <div class="md:col-span-2">
        <AppButton type="submit" :is-loading="isSaving">{{ AppStrings.actions.save }}</AppButton>
      </div>
    </form>
  </AppCard>
</template>
