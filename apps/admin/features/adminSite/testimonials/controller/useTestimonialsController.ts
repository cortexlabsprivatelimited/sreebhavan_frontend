import { useBusinessOptionsState } from '~/common/controllers/useBusinessOptionsState';
import { useCrudListState } from '~/common/controllers/useCrudListState';
import {
  useTestimonialsRepository,
  validateTestimonialForm,
} from '../domain/testimonials.repository';
import { createEmptyTestimonialForm, toTestimonialForm } from '../model/testimonials.model';

export const useTestimonialsController = () => {
  const crud = useCrudListState({
    key: 'admin-testimonials',
    repository: useTestimonialsRepository(),
    createEmptyForm: createEmptyTestimonialForm,
    toForm: toTestimonialForm,
    validateForm: validateTestimonialForm,
  });
  const { businessSelectOptions, getBusinessName } = useBusinessOptionsState();

  return { ...crud, businessSelectOptions, getBusinessName };
};
