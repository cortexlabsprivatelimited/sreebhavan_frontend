import { defineStore } from 'pinia';
import { AppConfig } from '~/common/constants/appConfig';

export type ToastTone = 'success' | 'error';

export interface ToastMessage {
  id: number;
  tone: ToastTone;
  text: string;
}

/** Short messages shown after saving or deleting. Rendered once by AppToastList in the layout. */
export const useToastStore = defineStore('toast', () => {
  const messages = ref<ToastMessage[]>([]);
  let nextId = 1;

  const dismissToast = (id: number) => {
    messages.value = messages.value.filter((message) => message.id !== id);
  };

  const showToast = (tone: ToastTone, text: string) => {
    const id = nextId++;
    messages.value.push({ id, tone, text });
    setTimeout(() => dismissToast(id), AppConfig.toastDurationMs);
  };

  const showSuccess = (text: string) => showToast('success', text);
  const showError = (text: string) => showToast('error', text);

  return { messages, showSuccess, showError, dismissToast };
});
