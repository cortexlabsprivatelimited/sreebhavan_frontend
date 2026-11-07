export interface Banner {
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

export type BannerForm = Omit<Banner, 'id'>;

export interface BannerApiResponse {
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

export type BannerRequest = Omit<BannerApiResponse, 'id'>;

export const mapBanner = (apiBanner: BannerApiResponse): Banner => ({
  id: apiBanner.id,
  businessId: apiBanner.business_id,
  imageUrl: apiBanner.image_url,
  title: apiBanner.title ?? '',
  subtitle: apiBanner.subtitle ?? '',
  ctaText: apiBanner.cta_text ?? '',
  ctaLink: apiBanner.cta_link ?? '',
  sortOrder: apiBanner.sort,
  isActive: apiBanner.active,
});

export const toBannerRequest = (form: BannerForm): BannerRequest => ({
  business_id: form.businessId || null,
  image_url: form.imageUrl,
  title: form.title.trim() || null,
  subtitle: form.subtitle.trim() || null,
  cta_text: form.ctaText.trim() || null,
  cta_link: form.ctaLink.trim() || null,
  sort: Number(form.sortOrder) || 0,
  active: form.isActive,
});

export const createEmptyBannerForm = (): BannerForm => ({
  businessId: null,
  imageUrl: '',
  title: '',
  subtitle: '',
  ctaText: '',
  ctaLink: '',
  sortOrder: 0,
  isActive: true,
});

export const toBannerForm = ({ id: _id, ...form }: Banner): BannerForm => form;
