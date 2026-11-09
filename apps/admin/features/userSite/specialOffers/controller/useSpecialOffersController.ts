import { usePublicSpecialOffersState } from '~/common/controllers/usePublicSpecialOffersState';

/** The offers page: every active special offer, from the state the header also uses. */
export const useSpecialOffersController = () => {
  const { specialOffers, isLoading, hasError, reloadSpecialOffers } = usePublicSpecialOffersState();

  const isEmpty = computed(
    () => !isLoading.value && !hasError.value && specialOffers.value.length === 0,
  );

  return { specialOffers, isLoading, hasError, isEmpty, reloadSpecialOffers };
};
