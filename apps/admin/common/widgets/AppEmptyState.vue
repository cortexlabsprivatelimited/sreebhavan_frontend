<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';

defineProps<{ message?: string }>();
</script>

<template>
  <p :class="[TextStyles.body, 'py-12 text-center']">{{ message ?? AppStrings.states.noItems }}</p>
</template>
