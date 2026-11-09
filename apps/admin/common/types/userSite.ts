/**
 * Public (user site) data shared by the layout and several user site features:
 * site settings, businesses, specialOffers, testimonials, FAQs and SEO meta.
 * Shapes follow sreebhavan_backend/docs/public-api.md.
 */

export interface PublicSiteSettings {
  brandLogoUrl: string | null;
  faviconUrl: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
  address: string | null;
  mapEmbedUrl: string | null;
  mapLinkUrl: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  youtubeUrl: string | null;
  footerText: string | null;
  googleAnalyticsId: string | null;
  searchConsoleVerification: string | null;
}

export interface PublicSiteSettingsApiResponse {
  brand_logo_url?: string | null;
  favicon_url?: string | null;
  contact_phone?: string | null;
  contact_email?: string | null;
  address?: string | null;
  map_embed_url?: string | null;
  map_link_url?: string | null;
  facebook_url?: string | null;
  instagram_url?: string | null;
  youtube_url?: string | null;
  footer_text?: string | null;
  google_analytics_id?: string | null;
  search_console_verification?: string | null;
}

export const createEmptySiteSettings = (): PublicSiteSettings => mapPublicSiteSettings({});

export const mapPublicSiteSettings = (
  apiSettings: PublicSiteSettingsApiResponse,
): PublicSiteSettings => ({
  brandLogoUrl: apiSettings.brand_logo_url ?? null,
  faviconUrl: apiSettings.favicon_url ?? null,
  contactPhone: apiSettings.contact_phone ?? null,
  contactEmail: apiSettings.contact_email ?? null,
  address: apiSettings.address ?? null,
  mapEmbedUrl: apiSettings.map_embed_url ?? null,
  mapLinkUrl: apiSettings.map_link_url ?? null,
  facebookUrl: apiSettings.facebook_url ?? null,
  instagramUrl: apiSettings.instagram_url ?? null,
  youtubeUrl: apiSettings.youtube_url ?? null,
  footerText: apiSettings.footer_text ?? null,
  googleAnalyticsId: apiSettings.google_analytics_id ?? null,
  searchConsoleVerification: apiSettings.search_console_verification ?? null,
});

export interface BusinessTiming {
  label: string;
  hours: string;
}

export interface PublicBusiness {
  id: string;
  slug: string;
  name: string;
  logoUrl: string | null;
  about: string | null;
  whatsApp: string;
  phone: string | null;
  timings: BusinessTiming[];
}

export interface PublicBusinessApiResponse {
  id: string;
  slug: string;
  name: string;
  logo_url: string | null;
  about: string | null;
  whatsapp: string;
  phone: string | null;
  timings: BusinessTiming[] | null;
}

export const mapPublicBusiness = (apiBusiness: PublicBusinessApiResponse): PublicBusiness => ({
  id: apiBusiness.id,
  slug: apiBusiness.slug,
  name: apiBusiness.name,
  logoUrl: apiBusiness.logo_url,
  about: apiBusiness.about,
  whatsApp: apiBusiness.whatsapp,
  phone: apiBusiness.phone,
  timings: apiBusiness.timings ?? [],
});

export interface PublicSpecialOffer {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string | null;
  ctaText: string | null;
  ctaLink: string | null;
}

export interface PublicSpecialOfferApiResponse {
  id: string;
  business_id: string | null;
  image_url: string;
  title: string;
  subtitle: string | null;
  cta_text: string | null;
  cta_link: string | null;
  sort: number;
}

export const mapPublicSpecialOffers = (
  apiSpecialOffers: PublicSpecialOfferApiResponse[],
): PublicSpecialOffer[] =>
  [...apiSpecialOffers]
    .sort((first, second) => first.sort - second.sort)
    .map((apiSpecialOffer) => ({
      id: apiSpecialOffer.id,
      imageUrl: apiSpecialOffer.image_url,
      title: apiSpecialOffer.title,
      subtitle: apiSpecialOffer.subtitle,
      ctaText: apiSpecialOffer.cta_text,
      ctaLink: apiSpecialOffer.cta_link,
    }));

export interface PublicTestimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
}

export interface PublicTestimonialApiResponse {
  id: string;
  name: string;
  text: string;
  rating: number;
  business_id: string | null;
  sort: number;
}

export const mapPublicTestimonials = (
  apiTestimonials: PublicTestimonialApiResponse[],
): PublicTestimonial[] =>
  [...apiTestimonials]
    .sort((first, second) => first.sort - second.sort)
    .map(({ id, name, text, rating }) => ({ id, name, text, rating }));

export interface PublicFaq {
  id: string;
  question: string;
  answer: string;
}

export interface PublicFaqApiResponse {
  id: string;
  business_id: string | null;
  question: string;
  answer: string;
  sort: number;
}

export const mapPublicFaqs = (apiFaqs: PublicFaqApiResponse[]): PublicFaq[] =>
  [...apiFaqs]
    .sort((first, second) => first.sort - second.sort)
    .map(({ id, question, answer }) => ({ id, question, answer }));

export interface PageSeo {
  title: string;
  description: string;
  ogImage: string | null;
  keywords: string | null;
  isNoIndex: boolean;
}

export interface PageSeoApiResponse {
  page_key: string;
  title: string | null;
  description: string | null;
  og_image: string | null;
  keywords: string | null;
  noindex: boolean;
}

/** API values win; the page's own title and description fill any gap. */
export const mapPageSeo = (
  apiSeo: PageSeoApiResponse | null,
  fallback: { title: string; description: string },
): PageSeo => ({
  title: apiSeo?.title || fallback.title,
  description: apiSeo?.description || fallback.description,
  ogImage: apiSeo?.og_image ?? null,
  keywords: apiSeo?.keywords ?? null,
  isNoIndex: apiSeo?.noindex ?? false,
});

/** Room as shown on the user site. Used by rooms, home, sreebhavanam and the enquiry form. */
export interface PublicRoom {
  id: string;
  slug: string;
  name: string;
  pricePerNight: number;
  capacity: number;
  amenities: string[];
  description: string | null;
  coverImageUrl: string | null;
  coverImageAlt: string;
  images: PublicImage[];
}

export interface PublicImage {
  id: string;
  url: string;
  alt: string;
}

export interface PublicImageApiResponse {
  id: string;
  url: string;
  alt: string;
  sort: number;
}

export interface PublicRoomApiResponse {
  id: string;
  slug: string;
  name: string;
  price: number;
  capacity: number;
  amenities: string[] | null;
  description: string | null;
  images: PublicImageApiResponse[] | null;
}

export const mapPublicImages = (apiImages: PublicImageApiResponse[] | null): PublicImage[] =>
  [...(apiImages ?? [])]
    .sort((first, second) => first.sort - second.sort)
    .map(({ id, url, alt }) => ({ id, url, alt }));

export const mapPublicRoom = (apiRoom: PublicRoomApiResponse): PublicRoom => {
  const images = mapPublicImages(apiRoom.images);
  return {
    id: apiRoom.id,
    slug: apiRoom.slug,
    name: apiRoom.name,
    pricePerNight: apiRoom.price,
    capacity: apiRoom.capacity,
    amenities: apiRoom.amenities ?? [],
    description: apiRoom.description,
    coverImageUrl: images[0]?.url ?? null,
    coverImageAlt: images[0]?.alt ?? apiRoom.name,
    images,
  };
};
