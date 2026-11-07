export interface Faq {
  id: string;
  businessId: string | null;
  question: string;
  answer: string;
  sortOrder: number;
}

export type FaqForm = Omit<Faq, 'id'>;

export interface FaqApiResponse {
  id: string;
  business_id: string | null;
  question: string;
  answer: string;
  sort: number;
}

export const mapFaq = (apiFaq: FaqApiResponse): Faq => ({
  id: apiFaq.id,
  businessId: apiFaq.business_id,
  question: apiFaq.question,
  answer: apiFaq.answer,
  sortOrder: apiFaq.sort,
});

export const toFaqRequest = (form: FaqForm): Omit<FaqApiResponse, 'id'> => ({
  business_id: form.businessId || null,
  question: form.question.trim(),
  answer: form.answer.trim(),
  sort: Number(form.sortOrder) || 0,
});

export const createEmptyFaqForm = (): FaqForm => ({
  businessId: null,
  question: '',
  answer: '',
  sortOrder: 0,
});

export const toFaqForm = ({ id: _id, ...form }: Faq): FaqForm => form;
