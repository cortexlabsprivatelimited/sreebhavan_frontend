import { ApiConstants } from '~/common/constants/apiConstants';
import { AppStrings } from '~/common/constants/appStrings';
import type { CrudRepository } from '~/common/controllers/useCrudListState';
import { useApiClient } from '~/common/services/apiClient';
import type { FormErrors } from '~/common/types/form';
import { sortBySortOrder } from '~/common/utils/listHelpers';
import { isBlank } from '~/common/utils/validators';
import {
  mapFaq,
  toFaqRequest,
  type Faq,
  type FaqApiResponse,
  type FaqForm,
} from '../model/faqs.model';

export const validateFaqForm = (form: FaqForm): FormErrors<FaqForm> => ({
  question: isBlank(form.question) ? AppStrings.validation.required : undefined,
  answer: isBlank(form.answer) ? AppStrings.validation.required : undefined,
});

export const useFaqsRepository = (): CrudRepository<Faq, FaqForm> => {
  const apiClient = useApiClient();

  return {
    getAll: async () =>
      sortBySortOrder((await apiClient.get<FaqApiResponse[]>(ApiConstants.admin.faqs)).map(mapFaq)),
    create: async (form) =>
      mapFaq(await apiClient.post<FaqApiResponse>(ApiConstants.admin.faqs, toFaqRequest(form))),
    update: async (id, form) =>
      mapFaq(
        await apiClient.patch<FaqApiResponse>(ApiConstants.admin.faqById(id), toFaqRequest(form)),
      ),
    remove: async (id) => {
      await apiClient.remove(ApiConstants.admin.faqById(id));
    },
  };
};
