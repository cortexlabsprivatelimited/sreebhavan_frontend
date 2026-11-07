/** Minimal business info used by dropdowns in several features (banners, testimonials, FAQs). */
export interface BusinessOption {
  id: string;
  slug: string;
  name: string;
}

export interface BusinessOptionApiResponse {
  id: string;
  slug: string;
  name: string;
}

export const mapBusinessOption = (apiBusiness: BusinessOptionApiResponse): BusinessOption => ({
  id: apiBusiness.id,
  slug: apiBusiness.slug,
  name: apiBusiness.name,
});
