<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import { formatMonthTitle, toIsoDate } from '~/common/utils/formatDate';
import AppIcon from '~/common/widgets/AppIcon.vue';

/**
 * Month grid (weeks start on Sunday). Each day renders the `day` slot so features can
 * show their own markers. Emits `select-date` with 'YYYY-MM-DD'.
 */
const props = withDefaults(defineProps<{ month: Date; isNavigable?: boolean }>(), {
  isNavigable: true,
});
const emit = defineEmits<{ 'select-date': [isoDate: string]; 'change-month': [month: Date] }>();

const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const today = new Date();
const todayIsoDate = toIsoDate(today);

const isCurrentMonth = computed(
  () =>
    props.month.getFullYear() === today.getFullYear() &&
    props.month.getMonth() === today.getMonth(),
);

const calendarDays = computed(() => {
  const year = props.month.getFullYear();
  const monthIndex = props.month.getMonth();
  const leadingBlankCount = new Date(year, monthIndex, 1).getDay();
  const dayCount = new Date(year, monthIndex + 1, 0).getDate();

  const days: ({ isoDate: string; dayNumber: number } | null)[] = Array.from(
    { length: leadingBlankCount },
    () => null,
  );
  for (let dayNumber = 1; dayNumber <= dayCount; dayNumber++) {
    days.push({ isoDate: toIsoDate(new Date(year, monthIndex, dayNumber)), dayNumber });
  }
  return days;
});

const goToMonth = (offset: number) => {
  emit('change-month', new Date(props.month.getFullYear(), props.month.getMonth() + offset, 1));
};

const navButtonClasses =
  'flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-textPrimary transition hover:border-primary/40 hover:bg-primaryLight';
</script>

<template>
  <div>
    <div class="mb-4 flex items-center justify-between gap-2">
      <h3 :class="TextStyles.calendarMonthTitle">{{ formatMonthTitle(month) }}</h3>
      <div v-if="isNavigable" class="flex items-center gap-2">
        <button
          type="button"
          :aria-label="AppStrings.actions.previous"
          :class="navButtonClasses"
          @click="goToMonth(-1)"
        >
          <AppIcon name="chevronLeft" class="h-5 w-5" />
        </button>
        <button
          type="button"
          :class="[
            TextStyles.buttonSmall,
            'h-10 rounded-full border border-border bg-background px-5 text-textPrimary transition hover:border-primary/40 hover:bg-primaryLight',
          ]"
          @click="emit('change-month', new Date())"
        >
          {{ AppStrings.actions.today }}
        </button>
        <button
          type="button"
          :aria-label="AppStrings.actions.next"
          :class="navButtonClasses"
          @click="goToMonth(1)"
        >
          <AppIcon name="chevronRight" class="h-5 w-5" />
        </button>
      </div>
    </div>
    <div class="grid grid-cols-7 gap-1.5">
      <span
        v-for="(weekday, weekdayIndex) in weekdayLabels"
        :key="weekday"
        :class="[
          TextStyles.calendarWeekday,
          'py-2 text-center',
          isCurrentMonth && weekdayIndex === today.getDay() ? 'text-primary' : 'text-textSecondary',
        ]"
      >
        {{ weekday }}
      </span>
      <template v-for="(day, index) in calendarDays" :key="day?.isoDate ?? `blank-${index}`">
        <span v-if="!day" />
        <button
          v-else
          type="button"
          :class="[
            'flex min-h-16 flex-col items-stretch gap-1.5 rounded-xl border p-2 text-left transition hover:border-primary hover:shadow-card sm:min-h-24',
            day.isoDate === todayIsoDate
              ? 'border-2 border-primary bg-primaryLight'
              : 'border-border bg-background',
          ]"
          @click="emit('select-date', day.isoDate)"
        >
          <span :class="TextStyles.calendarDay">{{ day.dayNumber }}</span>
          <slot name="day" :iso-date="day.isoDate" />
        </button>
      </template>
    </div>
  </div>
</template>
