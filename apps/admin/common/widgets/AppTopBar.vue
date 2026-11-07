<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import type { AdminProfile } from '~/common/types/adminSession';
import AppButton from '~/common/widgets/AppButton.vue';
import AppIcon from '~/common/widgets/AppIcon.vue';

const props = defineProps<{ profile: AdminProfile | null }>();
const emit = defineEmits<{ 'toggle-menu': []; 'sign-out': [] }>();

const profileInitials = computed(() =>
  (props.profile?.name ?? '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join(''),
);
</script>

<template>
  <header
    class="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur lg:px-8"
  >
    <button
      type="button"
      aria-label="Toggle menu"
      class="rounded-lg p-2 text-textPrimary transition hover:bg-surface"
      @click="emit('toggle-menu')"
    >
      <AppIcon name="hamburger" class="h-6 w-6" />
    </button>
    <div class="ml-auto flex items-center gap-3 sm:gap-5">
      <div v-if="profile" class="flex items-center gap-3">
        <span class="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
          <span :class="TextStyles.avatarInitials">{{ profileInitials }}</span>
        </span>
        <div class="hidden sm:block">
          <p :class="TextStyles.userName">{{ profile.name }}</p>
          <p :class="TextStyles.caption">{{ AppStrings.adminRole[profile.role] }}</p>
        </div>
      </div>
      <AppButton variant="secondary" size="sm" @click="emit('sign-out')">
        {{ AppStrings.actions.signOut }}
        <AppIcon name="arrowRight" class="h-4 w-4" />
      </AppButton>
    </div>
  </header>
</template>
