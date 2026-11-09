export interface SpecialOffer {
  id: string;
  businessId: string | null;
  imageUrl: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  sortOrder: number;
  isActive: boolean;
}

export type SpecialOfferForm = Omit<SpecialOffer, 'id'>;

export interface SpecialOfferApiResponse {
  id: string;
  business_id: string | null;
  image_url: string;
  title: string | null;
  subtitle: string | null;
  cta_text: string | null;
  cta_link: string | null;
  sort: number;
  active: boolean;
}

export type SpecialOfferRequest = Omit<SpecialOfferApiResponse, 'id'>;

export const mapSpecialOffer = (apiSpecialOffer: SpecialOfferApiResponse): SpecialOffer => ({
  id: apiSpecialOffer.id,
  businessId: apiSpecialOffer.business_id,
  imageUrl: apiSpecialOffer.image_url,
  title: apiSpecialOffer.title ?? '',
  subtitle: apiSpecialOffer.subtitle ?? '',
  ctaText: apiSpecialOffer.cta_text ?? '',
  ctaLink: apiSpecialOffer.cta_link ?? '',
  sortOrder: apiSpecialOffer.sort,
  isActive: apiSpecialOffer.active,
});

export const toSpecialOfferRequest = (form: SpecialOfferForm): SpecialOfferRequest => ({
  business_id: form.businessId || null,
  image_url: form.imageUrl,
  title: form.title.trim() || null,
  subtitle: form.subtitle.trim() || null,
  cta_text: form.ctaText.trim() || null,
  cta_link: form.ctaLink.trim() || null,
  sort: Number(form.sortOrder) || 0,
  active: form.isActive,
});

export const createEmptySpecialOfferForm = (): SpecialOfferForm => ({
  businessId: null,
  imageUrl: '',
  title: '',
  subtitle: '',
  ctaText: '',
  ctaLink: '',
  sortOrder: 0,
  isActive: true,
});

export const toSpecialOfferForm = ({ id: _id, ...form }: SpecialOffer): SpecialOfferForm => form;
