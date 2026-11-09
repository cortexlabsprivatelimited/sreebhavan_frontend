import { useSreebhavanamRepository } from '../domain/sreebhavanam.repository';
import { createEmptySreebhavanamContent } from '../model/sreebhavanam.model';

export const useSreebhavanamController = () => {
  const sreebhavanamRepository = useSreebhavanamRepository();

  const {
    data: content,
    status,
    error,
    refresh: reloadContent,
  } = useAsyncData('sreebhavanam-content', () => sreebhavanamRepository.getSreebhavanamContent(), {
    default: createEmptySreebhavanamContent,
  });

  const heroOffer = computed(() => content.value.specialOffers[0] ?? null);
  const isLoading = computed(() => status.value === 'pending');
  const hasError = computed(() => Boolean(error.value));

  return { content, heroOffer, isLoading, hasError, reloadContent };
};
