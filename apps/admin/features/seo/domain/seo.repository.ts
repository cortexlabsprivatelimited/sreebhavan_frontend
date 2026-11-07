import { ApiConstants } from '~/common/constants/apiConstants';
import { AppStrings } from '~/common/constants/appStrings';
import type { CrudRepository } from '~/common/controllers/useCrudListState';
import { useApiClient } from '~/common/services/apiClient';
import type { FormErrors } from '~/common/types/form';
import { isBlank } from '~/common/utils/validators';
import {
  mapSeoMeta,
  SeoLimits,
  toSeoMetaRequest,
  type SeoMeta,
  type SeoMetaApiResponse,
  type SeoMetaForm,
} from '../model/seo.model';

const isValidPageKey = (pageKey: string) => /^[a-z0-9-]+(\/[a-z0-9-]+)?$/.test(pageKey);

export const validateSeoMetaForm = (form: SeoMetaForm): FormErrors<SeoMetaForm> => ({
  pageKey: isBlank(form.pageKey)
    ? AppStrings.validation.required
    : isValidPageKey(form.pageKey.trim())
      ? undefined
      : 'Use lowercase words with hyphens, e.g. rooms or room/deluxe-ac-room.',
  title: isBlank(form.title)
    ? AppStrings.validation.required
    : form.title.length > SeoLimits.title
      ? `Keep the title under ${SeoLimits.title} characters.`
      : undefined,
  description:
    form.description.length > SeoLimits.description
      ? `Keep the description under ${SeoLimits.description} characters.`
      : undefined,
});

export const useSeoRepository = (): CrudRepository<SeoMeta, SeoMetaForm> => {
  const apiClient = useApiClient();

  return {
    getAll: async () =>
      (await apiClient.get<SeoMetaApiResponse[]>(ApiConstants.admin.seo))
        .map(mapSeoMeta)
        .sort((first, second) => first.pageKey.localeCompare(second.pageKey)),
    create: async (form) =>
      mapSeoMeta(
        await apiClient.post<SeoMetaApiResponse>(ApiConstants.admin.seo, toSeoMetaRequest(form)),
      ),
    update: async (id, form) =>
      mapSeoMeta(
        await apiClient.patch<SeoMetaApiResponse>(
          ApiConstants.admin.seoById(id),
          toSeoMetaRequest(form),
        ),
      ),
    remove: async (id) => {
      await apiClient.remove(ApiConstants.admin.seoById(id));
    },
  };
};
