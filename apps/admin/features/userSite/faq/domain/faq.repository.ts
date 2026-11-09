import { usePublicContentService } from '~/common/services/publicContentService';
import type { Faq } from '../model/faq.model';

export const useFaqRepository = () => {
  const publicContentService = usePublicContentService();

  /** All FAQs (general ones plus both businesses'), without duplicates, in admin order. */
  const getFaqs = async (): Promise<Faq[]> => publicContentService.getFaqs();

  return { getFaqs };
};

/** Case-insensitive search over questions and answers. */
export const filterFaqs = (faqs: Faq[], searchText: string): Faq[] => {
  const query = searchText.trim().toLowerCase();
  if (!query) return faqs;
  return faqs.filter((faq) => `${faq.question} ${faq.answer}`.toLowerCase().includes(query));
};
