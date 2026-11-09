import { ApiConstants } from '~/common/constants/apiConstants';
import { AppStrings } from '~/common/constants/appStrings';
import type { CrudRepository } from '~/common/controllers/useCrudListState';
import { useApiClient } from '~/common/services/apiClient';
import type { FormErrors } from '~/common/types/form';
import { sortBySortOrder } from '~/common/utils/listHelpers';
import { isBlank } from '~/common/utils/validators';
import {
  mapTestimonial,
  toTestimonialRequest,
  type Testimonial,
  type TestimonialApiResponse,
  type TestimonialForm,
} from '../model/testimonials.model';

export const validateTestimonialForm = (form: TestimonialForm): FormErrors<TestimonialForm> => ({
  name: isBlank(form.name) ? AppStrings.validation.required : undefined,
  text: isBlank(form.text) ? AppStrings.validation.required : undefined,
  rating: form.rating >= 1 && form.rating <= 5 ? undefined : 'Pick a rating from 1 to 5.',
});

export const useTestimonialsRepository = (): CrudRepository<Testimonial, TestimonialForm> => {
  const apiClient = useApiClient();

  return {
    getAll: async () =>
      sortBySortOrder(
        (await apiClient.get<TestimonialApiResponse[]>(ApiConstants.admin.testimonials)).map(
          mapTestimonial,
        ),
      ),
    create: async (form) =>
      mapTestimonial(
        await apiClient.post<TestimonialApiResponse>(
          ApiConstants.admin.testimonials,
          toTestimonialRequest(form),
        ),
      ),
    update: async (id, form) =>
      mapTestimonial(
        await apiClient.patch<TestimonialApiResponse>(
          ApiConstants.admin.testimonialById(id),
          toTestimonialRequest(form),
        ),
      ),
    remove: async (id) => {
      await apiClient.remove(ApiConstants.admin.testimonialById(id));
    },
  };
};
