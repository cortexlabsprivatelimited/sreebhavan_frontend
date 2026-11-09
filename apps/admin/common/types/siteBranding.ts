/** Brand logo and favicon chosen in Site settings, shown in the admin panel's sidebar, login and tab. */
export interface SiteBranding {
  logoUrl: string | null;
  faviconUrl: string | null;
}

/** The two branding keys of GET /admin/settings and GET /public/settings. */
export interface SiteBrandingApiResponse {
  brand_logo_url?: string | null;
  favicon_url?: string | null;
}

export const mapSiteBranding = (apiSettings: SiteBrandingApiResponse): SiteBranding => ({
  logoUrl: apiSettings.brand_logo_url || null,
  faviconUrl: apiSettings.favicon_url || null,
});
