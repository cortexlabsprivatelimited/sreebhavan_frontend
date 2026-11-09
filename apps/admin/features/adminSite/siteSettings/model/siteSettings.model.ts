/** Site-wide settings. Stored by the API as key/value rows in site_settings. */
export interface SiteSettings {
  brandLogoUrl: string;
  faviconUrl: string;
  contactPhone: string;
  contactEmail: string;
  address: string;
  mapEmbedUrl: string;
  mapLinkUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  footerText: string;
  googleAnalyticsId: string;
  searchConsoleVerification: string;
}

/** GET/PUT /admin/settings: an object of setting keys (snake_case) to values. */
export interface SiteSettingsApiResponse {
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

const settingKeys: Record<keyof SiteSettings, keyof SiteSettingsApiResponse> = {
  brandLogoUrl: 'brand_logo_url',
  faviconUrl: 'favicon_url',
  contactPhone: 'contact_phone',
  contactEmail: 'contact_email',
  address: 'address',
  mapEmbedUrl: 'map_embed_url',
  mapLinkUrl: 'map_link_url',
  facebookUrl: 'facebook_url',
  instagramUrl: 'instagram_url',
  youtubeUrl: 'youtube_url',
  footerText: 'footer_text',
  googleAnalyticsId: 'google_analytics_id',
  searchConsoleVerification: 'search_console_verification',
};

const settingFields = Object.keys(settingKeys) as (keyof SiteSettings)[];

export const mapSiteSettings = (api: SiteSettingsApiResponse): SiteSettings =>
  Object.fromEntries(
    settingFields.map((field) => [field, api[settingKeys[field]] ?? '']),
  ) as unknown as SiteSettings;

export const toSiteSettingsRequest = (settings: SiteSettings): SiteSettingsApiResponse =>
  Object.fromEntries(
    settingFields.map((field) => [settingKeys[field], settings[field].trim() || null]),
  ) as SiteSettingsApiResponse;

export const createEmptySiteSettings = (): SiteSettings => mapSiteSettings({});

/** Which image field an upload is for. */
export type SiteSettingsImageField = 'brandLogoUrl' | 'faviconUrl';
