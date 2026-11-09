import { ApiConstants } from '~/common/constants/apiConstants';
import { useApiClient } from '~/common/services/apiClient';
import {
  mapPublicSpecialOffers,
  mapPublicBusiness,
  mapPublicFaqs,
  mapPublicRoom,
  mapPublicSiteSettings,
  mapPublicTestimonials,
  type PageSeoApiResponse,
  type PublicSpecialOffer,
  type PublicSpecialOfferApiResponse,
  type PublicBusiness,
  type PublicBusinessApiResponse,
  type PublicFaq,
  type PublicFaqApiResponse,
  type PublicRoom,
  type PublicRoomApiResponse,
  type PublicSiteSettings,
  type PublicSiteSettingsApiResponse,
  type PublicTestimonial,
  type PublicTestimonialApiResponse,
} from '~/common/types/userSite';
import { getErrorStatus } from '~/common/utils/getErrorMessage';

/**
 * Public content used by more than one user site feature (and by the site layout).
 * Feature-specific public data (rooms, menu, hall...) stays in that feature's repository.
 */
export const usePublicContentService = () => {
  const apiClient = useApiClient();
  const businessQuery = (businessSlug?: string) =>
    businessSlug ? { business: businessSlug } : undefined;

  const getSettings = async (): Promise<PublicSiteSettings> =>
    mapPublicSiteSettings(
      await apiClient.get<PublicSiteSettingsApiResponse>(ApiConstants.public.settings),
    );

  const getBusiness = async (slug: string): Promise<PublicBusiness> =>
    mapPublicBusiness(
      await apiClient.get<PublicBusinessApiResponse>(ApiConstants.public.businessBySlug(slug)),
    );

  /** Without a business slug the API returns the home page specialOffers. */
  const getSpecialOffers = async (businessSlug?: string): Promise<PublicSpecialOffer[]> =>
    mapPublicSpecialOffers(
      await apiClient.get<PublicSpecialOfferApiResponse[]>(
        ApiConstants.public.specialOffers,
        businessQuery(businessSlug),
      ),
    );

  const getTestimonials = async (businessSlug?: string): Promise<PublicTestimonial[]> =>
    mapPublicTestimonials(
      await apiClient.get<PublicTestimonialApiResponse[]>(
        ApiConstants.public.testimonials,
        businessQuery(businessSlug),
      ),
    );

  const getFaqs = async (businessSlug?: string): Promise<PublicFaq[]> =>
    mapPublicFaqs(
      await apiClient.get<PublicFaqApiResponse[]>(
        ApiConstants.public.faqs,
        businessQuery(businessSlug),
      ),
    );

  /** Active rooms, for previews and the enquiry form. The rooms feature has its own repository. */
  const getRooms = async (): Promise<PublicRoom[]> =>
    (await apiClient.get<PublicRoomApiResponse[]>(ApiConstants.public.rooms)).map(mapPublicRoom);

  /** SEO meta for a page key; null when the admin hasn't set it (404). */
  const getPageSeo = async (pageKey: string): Promise<PageSeoApiResponse | null> => {
    try {
      return await apiClient.get<PageSeoApiResponse>(ApiConstants.public.seoByPage(pageKey));
    } catch (error) {
      if (getErrorStatus(error) === 404) return null;
      throw error;
    }
  };

  return {
    getSettings,
    getBusiness,
    getSpecialOffers,
    getTestimonials,
    getFaqs,
    getRooms,
    getPageSeo,
  };
};
