<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';
import type { EnquiryType } from '~/common/types/booking';
import { EnquiryTypeOptions } from '../../model/enquiry.model';

const selectedType = defineModel<EnquiryType>({ required: true });
</script>

<template>
  <fieldset>
    <legend :class="[TextStyles.siteEyebrowMuted, 'mb-3']">I'm enquiring about</legend>
    <div class="grid gap-2 sm:grid-cols-3">
      <label
        v-for="option in EnquiryTypeOptions"
        :key="option.type"
        :class="[
          'flex cursor-pointer flex-col rounded-2xl border px-4 py-3 transition',
          selectedType === option.type
            ? 'border-secondary bg-secondaryLight'
            : 'border-siteHairlineStrong bg-background hover:border-secondary/60',
        ]"
      >
        <input
          v-model="selectedType"
          type="radio"
          name="enquiry-type"
          :value="option.type"
          class="sr-only"
        />
        <span :class="TextStyles.siteLabel">{{ option.title }}</span>
        <span :class="TextStyles.siteBodySm">{{ option.text }}</span>
      </label>
    </div>
  </fieldset>
</template>
