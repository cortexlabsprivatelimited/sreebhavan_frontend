<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';

const props = withDefaults(
  defineProps<{ isOpen: boolean; title: string; size?: 'md' | 'lg' | 'xl' }>(),
  { size: 'md' },
);
const emit = defineEmits<{ close: [] }>();

const sizeClasses = { md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' } as const;

const closeOnEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.isOpen) emit('close');
};

onMounted(() => window.addEventListener('keydown', closeOnEscape));
onBeforeUnmount(() => window.removeEventListener('keydown', closeOnEscape));
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-overlay p-4 sm:items-center"
      @click.self="emit('close')"
    >
      <section
        role="dialog"
        aria-modal="true"
        :aria-label="title"
        :class="[sizeClasses[size], 'w-full overflow-hidden rounded-2xl bg-background shadow-xl']"
      >
        <header class="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 :class="TextStyles.cardTitle">{{ title }}</h2>
          <button
            type="button"
            :aria-label="AppStrings.actions.close"
            :class="[TextStyles.cardTitle, 'rounded-lg px-2 hover:bg-surface']"
            @click="emit('close')"
          >
            ×
          </button>
        </header>
        <div class="max-h-[70vh] overflow-y-auto px-5 py-4">
          <slot />
        </div>
        <footer
          v-if="$slots.footer"
          class="flex justify-end gap-3 border-t border-border bg-surface px-5 py-3"
        >
          <slot name="footer" />
        </footer>
      </section>
    </div>
  </Teleport>
</template>
