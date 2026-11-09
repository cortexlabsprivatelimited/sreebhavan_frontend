<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import AppIcon from '~/common/widgets/AppIcon.vue';
import {
  HomeTrustPoints,
  QuickAvailabilityExperiences,
  type QuickAvailabilityForm,
} from '../../model/home.model';

/** Frosted booking bar under the hero: experience, date, guests → check availability. */
const form = defineModel<QuickAvailabilityForm>({ required: true });
const emit = defineEmits<{ 'check-availability': [] }>();

const fieldClasses = [TextStyles.siteLabel, 'w-full bg-transparent py-1 outline-none'];
</script>

<template>
  <div class="flex flex-col items-center gap-5">
    <form
      class="grid w-full gap-1 rounded-[2rem] border border-siteHairlineGold bg-siteGlassStrong p-2 shadow-siteFloat backdrop-blur-xl md:grid-cols-[1.3fr_1fr_1fr_auto] md:items-center"
      @submit.prevent="emit('check-availability')"
    >
      <label
        class="flex flex-col gap-0.5 rounded-3xl px-5 py-2.5 transition focus-within:bg-surfaceMuted"
      >
        <span :class="TextStyles.siteEyebrowMuted">Experience</span>
        <select v-model="form.experience" :class="fieldClasses">
          <option
            v-for="option in QuickAvailabilityExperiences"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </label>
      <label
        class="flex flex-col gap-0.5 rounded-3xl px-5 py-2.5 transition focus-within:bg-surfaceMuted md:border-l md:border-siteHairline md:rounded-none"
      >
        <span :class="TextStyles.siteEyebrowMuted">Date</span>
        <input v-model="form.date" type="date" :class="fieldClasses" />
      </label>
      <label
        class="flex flex-col gap-0.5 rounded-3xl px-5 py-2.5 transition focus-within:bg-surfaceMuted md:border-l md:border-siteHairline md:rounded-none"
      >
        <span :class="TextStyles.siteEyebrowMuted">Guests</span>
        <input
          :value="form.guests ?? ''"
          type="number"
          min="1"
          placeholder="e.g. 4"
          :class="[...fieldClasses, 'placeholder:font-normal placeholder:text-textMuted']"
          @input="form.guests = Number(($event.target as HTMLInputElement).value) || null"
        />
      </label>
      <button
        type="submit"
        :class="[
          TextStyles.siteButton,
          'rounded-full bg-primary px-7 py-4 text-textOnPrimary transition hover:-translate-y-px hover:bg-primaryDark hover:shadow-siteGlow',
        ]"
      >
        {{ AppStrings.actions.checkAvailability }}
      </button>
    </form>
    <ul class="flex flex-wrap justify-center gap-x-6 gap-y-2">
      <li
        v-for="point in HomeTrustPoints"
        :key="point"
        :class="[TextStyles.siteBodySm, 'flex items-center gap-1.5']"
      >
        <AppIcon name="check" :stroke-width="2.5" class="h-3.5 w-3.5 text-secondary" />{{ point }}
      </li>
    </ul>
  </div>
</template>
