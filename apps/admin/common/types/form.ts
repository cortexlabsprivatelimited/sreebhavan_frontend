/** Validation messages keyed by form field name. An empty object means the form is valid. */
export type FormErrors<TForm> = Partial<Record<Extract<keyof TForm, string>, string>>;

export const hasFormErrors = <TForm>(errors: FormErrors<TForm>): boolean =>
  Object.values(errors).some(Boolean);
