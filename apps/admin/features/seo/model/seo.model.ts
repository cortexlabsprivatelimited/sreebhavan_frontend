export interface SeoMeta {
  id: string;
  pageKey: string;
  title: string;
  description: string;
  ogImageUrl: string;
  keywords: string;
  isNoindex: boolean;
}

export type SeoMetaForm = Omit<SeoMeta, 'id'>;

export interface SeoMetaApiResponse {
  id: string;
  page_key: string;
  title: string | null;
  description: string | null;
  og_image: string | null;
  keywords: string | null;
  noindex: boolean;
}

/** Google shows about 60 title characters and 160 description characters. */
export const SeoLimits = { title: 60, description: 160 } as const;

/** Page keys the user site asks for. Items use '<type>/<slug>', e.g. 'room/deluxe-ac-room'. */
export const SeoPageKeyExamples = [
  'home',
  'hotel',
  'menu',
  'sreebhavanam',
  'rooms',
  'event-hall',
  'hall-availability',
  'gallery',
  'about',
  'contact',
  'faq',
];

export const mapSeoMeta = (apiSeo: SeoMetaApiResponse): SeoMeta => ({
  id: apiSeo.id,
  pageKey: apiSeo.page_key,
  title: apiSeo.title ?? '',
  description: apiSeo.description ?? '',
  ogImageUrl: apiSeo.og_image ?? '',
  keywords: apiSeo.keywords ?? '',
  isNoindex: apiSeo.noindex,
});

export const toSeoMetaRequest = (form: SeoMetaForm): Omit<SeoMetaApiResponse, 'id'> => ({
  page_key: form.pageKey.trim(),
  title: form.title.trim() || null,
  description: form.description.trim() || null,
  og_image: form.ogImageUrl || null,
  keywords: form.keywords.trim() || null,
  noindex: form.isNoindex,
});

export const createEmptySeoMetaForm = (): SeoMetaForm => ({
  pageKey: '',
  title: '',
  description: '',
  ogImageUrl: '',
  keywords: '',
  isNoindex: false,
});

export const toSeoMetaForm = ({ id: _id, ...form }: SeoMeta): SeoMetaForm => form;
