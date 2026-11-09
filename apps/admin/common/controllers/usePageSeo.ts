import { usePublicContentService } from '~/common/services/publicContentService';
import { mapPageSeo } from '~/common/types/userSite';

/**
 * SEO meta for a user site page, for `useSeoMeta`:
 *   useSeoMeta(usePageSeo('rooms', { title: 'Rooms', description: '...' }));
 * Values come from GET /public/seo/{pageKey} (set in the admin SEO screen); the fallback fills gaps
 * and is used when the API has nothing or fails. Loaded with useAsyncData, so it is in the SSR HTML.
 */
export const usePageSeo = (
  pageKey: string | (() => string),
  fallback: { title: string; description: string } | (() => { title: string; description: string }),
) => {
  const publicContentService = usePublicContentService();
  const config = useRuntimeConfig();
  const route = useRoute();

  const readPageKey = () => (typeof pageKey === 'function' ? pageKey() : pageKey);
  const readFallback = () => (typeof fallback === 'function' ? fallback() : fallback);

  const { data: apiSeo } = useAsyncData(
    () => `page-seo-${readPageKey()}`,
    () => publicContentService.getPageSeo(readPageKey()).catch(() => null),
    { default: () => null },
  );

  const seo = computed(() => mapPageSeo(apiSeo.value, readFallback()));
  const canonicalUrl = computed(() =>
    config.public.siteUrl ? `${config.public.siteUrl}${route.path}` : undefined,
  );

  useHead({
    link: () => (canonicalUrl.value ? [{ rel: 'canonical', href: canonicalUrl.value }] : []),
  });

  return {
    title: () => seo.value.title,
    description: () => seo.value.description,
    keywords: () => seo.value.keywords ?? undefined,
    ogTitle: () => seo.value.title,
    ogDescription: () => seo.value.description,
    ogImage: () => seo.value.ogImage ?? undefined,
    ogUrl: () => canonicalUrl.value,
    ogType: 'website' as const,
    twitterCard: 'summary_large_image' as const,
    robots: () => (seo.value.isNoIndex ? 'noindex, nofollow' : 'index, follow'),
  };
};
