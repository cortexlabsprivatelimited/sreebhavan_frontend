import { useBusinessOptionsState } from '~/common/controllers/useBusinessOptionsState';
import { useCrudListState } from '~/common/controllers/useCrudListState';
import { useFaqsRepository, validateFaqForm } from '../domain/faqs.repository';
import { createEmptyFaqForm, toFaqForm } from '../model/faqs.model';

export const useFaqsController = () => {
  const crud = useCrudListState({
    key: 'admin-faqs',
    repository: useFaqsRepository(),
    createEmptyForm: createEmptyFaqForm,
    toForm: toFaqForm,
    validateForm: validateFaqForm,
  });
  const { businessSelectOptions, getBusinessName } = useBusinessOptionsState();

  return { ...crud, businessSelectOptions, getBusinessName };
};
