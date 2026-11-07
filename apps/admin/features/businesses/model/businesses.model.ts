export interface BusinessTiming {
  label: string;
  hours: string;
}

export interface Business {
  id: string;
  slug: string;
  name: string;
  logoUrl: string;
  about: string;
  whatsAppNumber: string;
  phone: string;
  timings: BusinessTiming[];
}

export type BusinessForm = Omit<Business, 'id' | 'slug'>;

/** The slug is fixed (it is part of the public URLs), so it is not sent back. */
export interface BusinessApiResponse {
  id: string;
  slug: string;
  name: string;
  logo_url: string | null;
  about: string | null;
  whatsapp: string | null;
  phone: string | null;
  timings: BusinessTiming[] | null;
}

export const mapBusiness = (api: BusinessApiResponse): Business => ({
  id: api.id,
  slug: api.slug,
  name: api.name,
  logoUrl: api.logo_url ?? '',
  about: api.about ?? '',
  whatsAppNumber: api.whatsapp ?? '',
  phone: api.phone ?? '',
  timings: api.timings ?? [],
});

export const toBusinessRequest = (form: BusinessForm) => ({
  name: form.name.trim(),
  logo_url: form.logoUrl || null,
  about: form.about.trim() || null,
  whatsapp: form.whatsAppNumber.trim() || null,
  phone: form.phone.trim() || null,
  timings: form.timings
    .map((timing) => ({ label: timing.label.trim(), hours: timing.hours.trim() }))
    .filter((timing) => timing.label && timing.hours),
});

export const toBusinessForm = ({
  id: _id,
  slug: _slug,
  timings,
  ...rest
}: Business): BusinessForm => ({
  ...rest,
  timings: timings.map((timing) => ({ ...timing })),
});

export const createEmptyBusinessForm = (): BusinessForm => ({
  name: '',
  logoUrl: '',
  about: '',
  whatsAppNumber: '',
  phone: '',
  timings: [],
});
