import { useBusinessOptionsService } from '~/common/services/businessOptionsService';
import type { SelectOption } from '~/common/types/api';

/** Business dropdown options, shared by features whose items belong to one business. */
export const useBusinessOptionsState = () => {
  const businessOptionsService = useBusinessOptionsService();

  const { data: businesses } = useAsyncData(
    'admin-business-options',
    () => businessOptionsService.getBusinessOptions(),
    { default: () => [] },
  );

  const businessSelectOptions = computed<SelectOption[]>(() =>
    businesses.value.map((business) => ({ label: business.name, value: business.id })),
  );

  const getBusinessName = (businessId: string | null): string =>
    businesses.value.find((business) => business.id === businessId)?.name ?? '-';

  return { businesses, businessSelectOptions, getBusinessName };
};
