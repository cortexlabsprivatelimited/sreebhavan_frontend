export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  businessId: string | null;
  sortOrder: number;
  isActive: boolean;
}

export type TestimonialForm = Omit<Testimonial, 'id'>;

export interface TestimonialApiResponse {
  id: string;
  name: string;
  text: string;
  rating: number;
  business_id: string | null;
  sort: number;
  active: boolean;
}

export const mapTestimonial = (apiTestimonial: TestimonialApiResponse): Testimonial => ({
  id: apiTestimonial.id,
  name: apiTestimonial.name,
  text: apiTestimonial.text,
  rating: apiTestimonial.rating,
  businessId: apiTestimonial.business_id,
  sortOrder: apiTestimonial.sort,
  isActive: apiTestimonial.active,
});

export const toTestimonialRequest = (
  form: TestimonialForm,
): Omit<TestimonialApiResponse, 'id'> => ({
  name: form.name.trim(),
  text: form.text.trim(),
  rating: Number(form.rating),
  business_id: form.businessId || null,
  sort: Number(form.sortOrder) || 0,
  active: form.isActive,
});

export const createEmptyTestimonialForm = (): TestimonialForm => ({
  name: '',
  text: '',
  rating: 5,
  businessId: null,
  sortOrder: 0,
  isActive: true,
});

export const toTestimonialForm = ({ id: _id, ...form }: Testimonial): TestimonialForm => form;

export const RatingOptions = [5, 4, 3, 2, 1].map((rating) => ({
  label: `${'★'.repeat(rating)} (${rating})`,
  value: String(rating),
}));
