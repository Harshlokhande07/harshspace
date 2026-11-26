/**
 * Contact Form Endpoint Configuration.
 * Reads from VITE_CONTACT_ENDPOINT (e.g., Formspree, Formspark, or custom webhook).
 * If left empty, the contact form disables submission and notifies the visitor.
 */
export const CONTACT_ENDPOINT: string =
  (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined)?.trim() || '';

export const isContactConfigured: boolean = Boolean(CONTACT_ENDPOINT !== '');
