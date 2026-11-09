<script setup lang="ts">
import { TextStyles } from '~/common/styles/textStyles';
import AppIcon from '~/common/widgets/AppIcon.vue';

defineProps<{ adminName: string }>();
</script>

<template>
  <section
    class="relative -mx-4 -mt-6 overflow-hidden px-4 pb-8 pt-8 lg:-mx-8 lg:-mt-8 lg:px-8 lg:pt-10"
  >
    <!-- Decorative blue wave on the right -->
    <div
      class="pointer-events-none absolute -right-24 -top-24 hidden h-[320px] w-[55%] rounded-bl-[200px] bg-gradient-to-bl from-primary/25 via-primaryLight to-transparent md:block"
    />
    <AppIcon
      name="lotus"
      :stroke-width="0.8"
      class="pointer-events-none absolute right-10 top-4 hidden h-40 w-40 text-primary/20 md:block"
    />
    <div class="relative">
      <h1 :class="TextStyles.displayTitle">
        Welcome, <span :class="TextStyles.headingHighlight">{{ adminName }}</span>
      </h1>
      <p :class="[TextStyles.body, 'mt-2 text-textPrimary/80']">
        New enquiries, upcoming hall bookings and this month at a glance.
      </p>
    </div>
  </section>
</template>
